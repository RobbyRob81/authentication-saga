// @flow
import React from 'react';
import {Provider} from 'react-redux'
import App from '../App'

type RootProps = {
  store: Object
}

const Root = ({store}:RootProps) => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default Root;
