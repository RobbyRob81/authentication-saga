import React from "react";
import { connect } from "react-redux";
import ConfirmEmailMessage from "../components/messages/ConfirmEmailMessage";

type Props = {|
  isConfirmed: boolean
|}

class DashboardContainer extends React.PureComponent<Props> {
  render() {
    const { isConfirmed } = this.props;
    return (
      <div>
        {!isConfirmed && <ConfirmEmailMessage />}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isConfirmed: !!state.user.confirmed
  };
}

export default connect(mapStateToProps)(DashboardContainer);
