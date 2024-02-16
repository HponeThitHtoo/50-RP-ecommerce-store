import React from 'react';
import { Navigate } from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';

import { useUserContext } from '../context/userContext';

function ProtectedRoute({ children }) {
  const { user } = useUserContext();

  if (!user) return <Navigate to="/register" />;

  return children;
}

ProtectedRoute.propTypes = {
  children: PropTypes.element.isRequired,
};

export default ProtectedRoute;
