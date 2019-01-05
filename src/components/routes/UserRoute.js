import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

type Props = {
  isAuthenticated: boolean,
  component: React.Node,
}

const UserRoute = ({
  isAuthenticated,
  component: Component,
  ...rest
  }:Props) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated ? <Component {...props} /> : <Redirect to="/" />
    }
  />
);

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.email
  };
}

export default connect(mapStateToProps)(UserRoute);