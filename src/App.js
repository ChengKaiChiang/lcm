import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MyNavbar from './components/Navbar';
import LcmStatus from './pages/Status';
import Fota from './pages/FOTA';


class App extends Component {
  render() {
    return (
      <div id="wrapper">
        <MyNavbar />
        <main role="main">
            <Route exact path='/Lcm_Status' component={LcmStatus} />
            {/* default route */}
            <Route exact path='/' component={Fota} />
          </main>
      </div>
    );
  }

}

export default App;
