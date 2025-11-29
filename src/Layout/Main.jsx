import React from 'react';
import HomeHeader from './layoutComponents/HomeHeader';
import MainSidebar from './layoutComponents/MainSidebar';
import { Outlet } from 'react-router';

const Main = () => {
    return (
        <div>
            <HomeHeader></HomeHeader>
            <div className='flex'>
                <MainSidebar></MainSidebar>
                <div className='flex-1 p-6'>
                    <Outlet></Outlet>
                </div>

            </div>
        </div>
    );
};

export default Main;