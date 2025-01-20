'use client';
import dynamic from 'next/dynamic';
import LandingPageNavBar from './_componenets/navbar';

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
        <div className="flex flex-col px-10 py-10 xl:px-0 container">
           {children}
           <LandingPageNavBar></LandingPageNavBar>
        </div>
    );
};

export default Layout;