import * as React from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import Loader from "react-loader";
import { IntlProvider } from "react-intl";
import HomeContainer from "./containers/HomeContainer";
import LoginContainer from "./containers/LoginContainer";
import DashboardContainer from "./containers/DashboardContainer";
import SignupContainer from "./containers/SignupContainer";
import ConfirmationContainer from "./containers/ConfirmationContainer";
import ForgotPasswordContainer from "./containers/ForgotPasswordContainer";
import ResetPasswordContainer from "./containers/ResetPasswordContainer";
import UserRoute from "./components/routes/UserRoute";
import GuestRoute from "./components/routes/GuestRoute";
// import TopNavigation from "./components/navigation/TopNavigation";
// import CharactersContainer from "./components/containers/CharactersContainer";
// import NewCharacterContainer from "./components/containers/NewCharacterContainer";
import { fetchCurrentUserRequest } from "./actions/users";
import messages from "./constants/messages";


type Props = {
  location: { pathname: string},
  isAuthenticated: boolean,
  fetchCurrentUserRequest: () => undefined,
  loaded: boolean,
  lang: string
};

class App extends React.PureComponent<Props> {
  componentDidMount() {
    if (this.props.isAuthenticated) this.props.fetchCurrentUserRequest();
  }

  render() {
    const { location, isAuthenticated, loaded, lang } = this.props;
    return (
      <IntlProvider locale={lang} messages={messages[lang]}>
        <div>
          <Loader loaded={loaded}>
            {/* {isAuthenticated && <TopNavigation />} */}
            {isAuthenticated && <p> You are authenticated</p>}
            <Route location={location} path="/" exact component={HomeContainer} />
            <Route
              location={location}
              path="/confirmation/:token"
              exact
              component={ConfirmationContainer}
            />
            <GuestRoute
              location={location}
              path="/login"
              exact
              component={LoginContainer}
            />
            <GuestRoute
              location={location}
              path="/signup"
              exact
              component={SignupContainer}
            />
            <GuestRoute
              location={location}
              path="/forgot_password"
              exact
              component={ForgotPasswordContainer}
            />
            <GuestRoute
              location={location}
              path="/reset_password/:token"
              exact
              component={ResetPasswordContainer}
            />
            <UserRoute
              location={location}
              path="/dashboard"
              exact
              component={DashboardContainer}
            />
            {/* <UserRoute
              location={location}
              path="/characters"
              exact
              component={CharactersContainer}
            />
            <UserRoute
              location={location}
              path="/characters/new"
              exact
              component={NewCharacterContainer}
            /> */}
          </Loader>
        </div>
      </IntlProvider>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.email,
    loaded: state.user.loaded,
    lang: state.locale.lang
  };
}

export default connect(mapStateToProps, { fetchCurrentUserRequest })(App);