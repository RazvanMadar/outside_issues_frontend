import {useLocation, Navigate, Outlet} from "react-router-dom";
import React from 'react';

const RequireAuthentication = ({allowedRoles, isBlocked, role}) => {
    const location = useLocation();

    return (
        allowedRoles[0] === 'ALL' ? <Outlet/>
            :
            isBlocked ? <Navigate to={"/blocked"} state={{from: location}} replace/>
                :
                allowedRoles?.includes(role)
                    ? <Outlet/>
                    :
                    role ? <Navigate to={"/forbidden"} state={{from: location}} replace/>
                        :
                        <Navigate to={"/unauthorized"} state={{from: location}} replace/>
    );
}

export default RequireAuthentication;