import React from 'react';
import HomeHeader from './layoutComponents/HomeHeader';
import MainSidebar from './layoutComponents/MainSidebar';
import { Outlet } from 'react-router';
import Footer from './layoutComponents/Footer';

const Main = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <HomeHeader />
            <MainSidebar />
            <main className="flex-1 p-6">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Main;