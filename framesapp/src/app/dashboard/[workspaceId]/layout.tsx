import React from 'react';
import { redirect } from 'next/navigation';
import { onAuthenticateUser } from '@/src/actions/user';
import { verifyAccessToWorkspace } from '@/src/actions/workspace';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { getWorkspaceFolders, getAllUserVideos, getWorkSpaces } from '@/src/actions/workspace';
import { getNotifications } from '@/src/actions/user';
import Sidebar from '@/src/components/global/sidebar';

type Props = {
  params: { workspaceId: string };
  children: React.ReactNode;
};

const Layout = async ({ params: { workspaceId }, children }: Props) => {
  const auth = await onAuthenticateUser();
  if (!auth.user?.workspace) redirect('/auth/sign-in');
  if (!auth.user?.workspace.length) redirect('/auth/sign-in');

  const hasAccess = await verifyAccessToWorkspace(workspaceId);

  if (hasAccess.status !== 200) {
    redirect(`/dashboard/${auth.user?.workspace[0].id}`);
  }
  if (!hasAccess.data?.workspace) return null;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['workspace-folders'],
    queryFn: () => getWorkspaceFolders(workspaceId),
  });

  await queryClient.prefetchQuery({
    queryKey: ['user-videos'],
    queryFn: () => getAllUserVideos(workspaceId),
  });

  await queryClient.prefetchQuery({
    queryKey: ['user-workspace'],
    queryFn: () => getWorkSpaces(),
  });

  await queryClient.prefetchQuery({
    queryKey: ['user-notifications'],
    queryFn: () => getNotifications(),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <div className="flex h-screen w-screen">
        <Sidebar activeWorkspaceId={workspaceId} />
        {children}
      </div>
    </HydrationBoundary>
  );
};

export default Layout;