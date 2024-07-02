import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Pages/Shared/Navbar';
import Fotter from '../Pages/Shared/Fotter';

const Main = () => {
    return (
        <div>
            <Outlet></Outlet>
            <Fotter></Fotter>
                    </div>
    );
};

export default Main;