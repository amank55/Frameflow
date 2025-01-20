'use client';
import dynamic from 'next/dynamic';


import React, { useEffect, useState } from 'react';

type Props = {
    children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <div className='flex flex-col'>
            {isClient ? children : null}
        </div>
    );
};

export default Layout;