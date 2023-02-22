import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAutheticated } from "./index";

const UserRoutes = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAutheticated() && isAutheticated().user.role === 0 ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/reader/home",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default UserRoutes;
