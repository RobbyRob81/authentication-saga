import * as React from "react";
import { connect } from "react-redux";
import LoginForm from "../components/loginForm/LoginForm";
import { login } from "../actions/auth";

type Props = {|
  history: { push: () => undefined},
  login: () => undefined
|}

class LoginContainer extends React.PureComponent<Props> {
  submit = data =>
    this.props.login(data).then(() => this.props.history.push("/dashboard"));

  render() {
    return (
      <div>
          <LoginForm submit={this.submit} />
      </div>
    );
  }
}

export default connect(null, { login })(LoginContainer);
