import React from 'react';

type Props = {
  activeWorkspace: string;
};

const Sidebar = (props: Props) => {
  return (
    <div>{props.activeWorkspace}</div>
  );
};

export default Sidebar;