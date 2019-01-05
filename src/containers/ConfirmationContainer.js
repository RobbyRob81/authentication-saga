import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { confirm } from "../actions/auth";

type Props = {|
  confirm: () => undefined,
  match: {
    params: {
      token: string
    }
  }
|}

class ConfirmationContainer extends React.PureComponent<Props> {
   state = {
    loading: true,
    success: false
  };

  componentDidMount() {
    this.props
      .confirm(this.props.match.params.token)
      .then(() => this.setState({ loading: false, success: true }))
      .catch(() => this.setState({ loading: false, success: false }));
  }

  render() {
    const { loading, success } = this.state;

    return (
      <div>
        {loading &&  <div>Validating your account...</div>}

        {!loading &&
          success && (
            <div>
              Thank you! Your account has been verified. Now you can go to your
              <Link to="/dashboard"> dashboard</Link>
            </div>
          )}

        {!loading &&
          !success && (
            <div>
              Ooops. Invalid token it seems.
            </div>
          )}
      </div>
    );
  }
}

export default connect(null, { confirm })(ConfirmationContainer);
