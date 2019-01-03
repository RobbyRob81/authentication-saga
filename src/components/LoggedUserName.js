import * as React from 'react';
import {connect} from 'redux';
import {getLoggedUser} from './selectors';

/*
Store Object:
{
  "auth": 1,
  "users": {
    1: {
      "username": "mattiamanzati",
      "token": "resthttprequestsaccesstoken"},
    2: {"username": "another user"}
  }
}
*/

class LoggedUserName extends React.PureComponent{
  render(){
    const {user} = this.props;
    return(
      user ? 
      <p>{user.username}</p> : 
      <p>Anonymous Cow</p>
    )
  }
}

function mapStateToProps(state){
  return {user: getLoggedUser(state)}
}

export default LoggedUserName;