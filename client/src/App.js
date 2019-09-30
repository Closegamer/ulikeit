import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import socketIOClient from 'socket.io-client';
import Navigator from './containers/Navigator';
import Footer from './containers/Footer';
import LoginForm from './containers/Login';
import BalanceForm from './containers/Balance';
import Routes from './Routes';
import setInterceptors from './utils/setInterceptors';
import { loadUser } from './ducks/auth';
import { ToastContainer } from 'mdbreact';

import './App.css';
// Redux
import { Provider } from 'react-redux';
import store from './store';
import config from './config.json';

setInterceptors();

export class App extends Component {
  constructor() {
    super();
    this.state = {
      endpointHTTP: config.socketEndpointHTTP,
      endpointHTTPS: config.socketEndpointHTTPS
    };
  }

  setAlert = msg => {
    const endpoint =
      window.location.protocol === 'https:'
        ? this.state.endpointHTTPS
        : this.state.endpointHTTP;
    const socket = socketIOClient(endpoint);
    socket.emit('alert', msg);
  };

  componentDidMount() {
    store.dispatch(loadUser());

    const endpoint =
      window.location.protocol === 'https:'
        ? this.state.endpointHTTPS
        : this.state.endpointHTTP;
    const socket = socketIOClient(endpoint);

    // setInterval(this.send(), 1000);

    // socket.on('alert', msg => {
    //   alert(msg);
    // });
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className='app'>
            <Navigator />
            <Routes />
            <LoginForm />
            <BalanceForm />
            <ToastContainer
              hideProgressBar={true}
              newestOnTop={true}
              autoClose={3000}
            />
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
