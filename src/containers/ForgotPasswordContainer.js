import * as React from "react";
import { connect } from "react-redux";
import ForgotPasswordForm from "../components/forgotPasswordForm/ForgotPasswordForm";
import { resetPasswordRequest } from "../actions/auth";

type Props = {|
  resetPasswordRequest: () => undefined
|}

type State = {
  success: boolean
}

class ForgotPasswordContainer extends React.PureComponent<Props, State> {
  state = {
    success: false
  };

  submit = data =>
    this.props
      .resetPasswordRequest(data)
      .then(() => this.setState({ success: true }));

  render() {
    return (
      <div>
        <h2 >Recover Password</h2>
          {this.state.success ? (
            <div className="alert alert-info">Email has been sent.</div>
          ) : (
            <ForgotPasswordForm submit={this.submit} />
          )}
      </div>
    );
  }
}

export default connect(null, { resetPasswordRequest })(ForgotPasswordContainer);