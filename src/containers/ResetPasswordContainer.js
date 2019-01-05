import * as React from "react";
import { connect } from "react-redux";
import { type History, Link } from "react-router-dom";
import ResetPasswordForm from "../components/resetPasswordForm/ResetPasswordForm";
import { validateToken, resetPassword } from "../actions/auth";

type Props = {
  validateToken: () => undefined,
  resetPassword: () => undefined,
  history: History,
  match: {
    params: {
      token: string
    }
  }
}

type State = {
  loading: boolean,
  success: boolean
}

type FormProps = {
  token: string,
  password: string,
}

class ResetPasswordContainer extends React.Component<Props, State> {
  state = {
    loading: true,
    success: false
  };

  componentDidMount() {
    this.props
      .validateToken(this.props.match.params.token)
      .then(() => this.setState({ loading: false, success: true }))
      .catch(() => this.setState({ loading: false, success: false }));
  }

  submit = (data: FormProps) =>
    this.props
      .resetPassword(data)
      .then(() => this.props.history.push("/login"));

  render() {
    const { loading, success } = this.state;
    const {match: {params: {token}}} = this.props;

    return (
      <div>
        {loading && <div>Loading</div>}
        {!loading &&
          success && (
            <ResetPasswordForm submit={this.submit} token={token} />
          )}
        {!loading &&
          !success && (
            <div>
              Invalid Token. Try to
              <Link to="/forgot_password">recover password</Link>
              again.
            </div>
          )}
      </div>
    );
  }
}

export default connect(
  null,
  { validateToken, resetPassword }
)(ResetPasswordContainer);
