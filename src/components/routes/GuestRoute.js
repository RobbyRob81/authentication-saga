import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

type Props = {
  isAuthenticated: boolean,
  component: any,
}

const UserRoute = ({
    isAuthenticated,
    component: Component,
    ...rest
  }: Props) => (
  <Route
    {...rest}
    render={props =>
      !isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect to="/dashboard" />
      )}
  />
);

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.token
  };
}

export default connect(mapStateToProps)(UserRoute);