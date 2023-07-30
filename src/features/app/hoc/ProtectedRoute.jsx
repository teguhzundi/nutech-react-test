import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { memo } from 'react';

const ProtectedRoute = ({ component }) => {
  const isLoggedIn = useSelector(({ auth }) => auth.authIsLoggedIn);
  if (!isLoggedIn) {
    return <Navigate to="/auth/login" replace />;
  }

  return component;
};

ProtectedRoute.propTypes = {
  component: PropTypes.node.isRequired
};

export default memo(ProtectedRoute);
