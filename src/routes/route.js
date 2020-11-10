import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import AdminLayout from '../Components/AdminLayout';

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const storage = JSON.parse(localStorage.getItem('macumbae'));

  if (storage) {
    const { hash } = storage;
    const superHash = '123456789';
    if (hash === superHash) {
      return (
        <Route
          {...rest}
          render={(props) => (
            <AdminLayout>
              <Component {...props} />
            </AdminLayout>
          )}
        />
      );
    }
    return <Route {...rest} render={<Redirect to="/admin/dashboard" />} />;
  }
  return <Route {...rest} render={<Redirect to="/admin" />} />;
};

PrivateRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
  path: PropTypes.string.isRequired,
};
