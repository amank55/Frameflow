import React from 'react';
import { redirect } from 'next/navigation';
import { onAuthenticateUser } from '@/src/actions/user';
import { verifyAccessToWorkspace } from '@/src/actions/workspace';


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

  const querry = new QuerryClient()
  return (
    <div>
      Layout
    </div>
  );
};

export default Layout;