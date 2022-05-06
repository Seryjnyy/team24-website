import React from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './auth';

function RequireAuth({children, redirectTo}) {
  const auth = useAuth();
  const location = useLocation();
    return auth.isLoggedIn() ? children : <Navigate to={redirectTo} state={{path: location.pathname}}/>;
}


export default RequireAuth