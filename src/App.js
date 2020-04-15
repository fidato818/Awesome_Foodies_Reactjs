import React, { Component } from "react";
import { store, persistor } from "./store";
import { Provider } from "react-redux";
import "./styles.css";
import Routes from "./config/router";
import WebFont from "webfontloader";
import { PersistGate } from 'redux-persist/integration/react'
WebFont.load({
  google: {
    families: ["Permanent Marker", "sans-serif"]
  }
});

export default class App extends Component {


  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
        <React.Fragment>
          <Routes />
        </React.Fragment>
        </PersistGate>
      </Provider>
    );
  }
}

