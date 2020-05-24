import React from "react";
import { Route } from "react-router-dom";

const RouteWithSubRoutes = (route) => (
  <Route
    path={route.path}
    render={({ ...props }) => (
      // pass the sub-routes down to keep nesting
      // eslint-disable-next-line
      <route.component {...props} routes={route.routes} params={props.match.params} />
    )}
  />
);

export default RouteWithSubRoutes;
