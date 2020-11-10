import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { PrivateRoute } from './route';
// MAIN
import Home from '../pages/Main/Home';
import Points from '../pages/Main/Points';
import PointsView from '../pages/Main/PointsView';
import PointsCreate from '../pages/Main/PointsCreate';
import PointsCancel from '../pages/Main/PointsCancel';

// ADMIN
import Signin from '../pages/Admin/Signin';
import AdminDashboard from '../pages/Admin/Dashboard';
import AdminPoints from '../pages/Admin/Points';
import AdminPointsUpdate from '../pages/Admin/PointsUpdate';
import AdminRequests from '../pages/Admin/Requests';
import AdminRequestsView from '../pages/Admin/RequestsView';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/points" exact component={Points} />
      <Route path="/view-point/:id" component={PointsView} />
      <Route path="/create-point" component={PointsCreate} />
      <Route path="/cancel-point/:id" component={PointsCancel} />
      <Route path="/admin" exact component={Signin} />
      <PrivateRoute path="/admin/dashboard" component={AdminDashboard} />
      <PrivateRoute path="/admin/points" exact component={AdminPoints} />
      <PrivateRoute path="/admin/requests" exact component={AdminRequests} />
      <PrivateRoute
        path="/admin/requests/view/:id"
        exact
        component={AdminRequestsView}
      />
      <PrivateRoute
        path="/admin/points/update/:id"
        component={AdminPointsUpdate}
      />
    </Switch>
  );
}
