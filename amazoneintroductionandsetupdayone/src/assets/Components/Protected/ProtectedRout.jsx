import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataContext } from '../DataProvider/DataProvider';

const ProtectedRoute = ({ children, msg, redirect }) => {
  const navigate = useNavigate();
  const { state } = useContext(DataContext);
  const user = state.user;

  useEffect(() => {
    if (!user) {
      navigate("/auth", { state: { msg, redirect } });
    }
  }, [user, navigate, msg, redirect]);

  return children;
};

export default ProtectedRoute;
