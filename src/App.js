import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MyNavbar from './components/Navbar';
import LcmStatus from './pages/Status';
import Fota from './pages/FOTA';
import Firmware from './pages/Firmware';
import CreateFirmware from './pages/CreateFirmware';

class App extends Component {
  render() {
    return (
      <div id="wrapper">
        <MyNavbar />
        <main role="main">
            <Route exact path='/Lcm_Status' component={LcmStatus} />
            <Route exact path='/Firmware' component={Firmware} />
            <Route exact path='/CreateFirmware' component={CreateFirmware} />
            {/* default route */}
            <Route exact path='/' component={Fota} />
          </main>
      </div>
    );
  }

}

export default App;
