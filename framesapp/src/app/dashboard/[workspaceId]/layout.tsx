import React from 'react';
import { redirect } from 'next/navigation';
import { onAuthenticateUser } from '@/src/actions/user';
import { verifyAccessToWorkspace } from '@/src/actions/workspace';
import {dehydrate,HydrationBoundary,QueryClient} from '@tanstack/react-query'
import { getWorkspaceFolders} from '@/src/actions/workspace';
import { getAllUserVideos } from '@/src/actions/workspace';
import { getWorkSpaces } from '@/src/actions/workspace';
import { getNotifications } from '@/src/actions/user';


type Props = {
  params: { workspaceId: string };
  children: React.ReactNode;
};

const Layout = async ({ params: { workspaceId}, children }: Props) => {
  const auth = await onAuthenticateUser();
  if (!auth.user?.workspace) redirect('/auth/sign-in');
  if (!auth.user?.workspace.length) redirect('/auth/sign-in');

  const hasAccess = await verifyAccessToWorkspace(workspaceId);
 
  if(hasAccess.status!==200){
    redirect(`/dashboard/${auth.user?.workspace[0].id}`)
  }
  if (!hasAccess.data?.workspace) return null

  const querry = new QueryClient()
  await querry.prefetchQuery({
    queryKey : ["workspace-folders"],
    queryFn: ()=>getWorkspaceFolders(workspaceId),
  })

  await querry.prefetchQuery({
    queryKey : ["user-videos"],
    queryFn: ()=>getAllUserVideos(workspaceId),
  })

  await querry.prefetchQuery({
    queryKey : ["user-workspace"],
    queryFn: ()=>getWorkSpaces(),
  })

  await querry.prefetchQuery({
    queryKey : ["user-notifications"],
    queryFn: ()=>getNotifications(),
  })
  return <HydrationBoundary state={dehydrate}></HydrationBoundary>
};

export default Layout;