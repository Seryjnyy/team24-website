import React, { useEffect } from 'react'
import {Navigate} from "react-router-dom";
import {useAuth} from "./auth";

function Logout() {
  const auth = useAuth();

  useEffect(() => {auth.logout()},[]);
  return ( 
      <Navigate to="/dashboard"/>
  )
}

export default Logout