import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MyNavbar from './components/Navbar';
import LcmStatus from './pages/Status';
import Fota from './pages/FOTA';
import Firmware from './pages/Firmware/Firmware';
import CreateFirmware from './pages/Firmware/CreateFirmware';
import UpdateFirmware from './pages/Firmware/UpdateFirmware';
import Model from './pages/Model/Model';
import CreateModel from './pages/Model/CreateModel';
import UpdateModel from './pages/Model/UpdateModel';
import Device from './pages/Device';

class App extends Component {
  render() {
    return (
      <div id="wrapper">
        <MyNavbar />
        <main role="main">
            <Route exact path='/Update' component={Fota} />
            <Route exact path='/Firmware' component={Firmware} />
            <Route exact path='/CreateFirmware' component={CreateFirmware} />
            <Route exact path='/UpdateFirmware/:id/:version' component={UpdateFirmware} />
            <Route exact path='/Model' component={Model} />
            <Route exact path='/CreateModel' component={CreateModel} />
            <Route exact path='/UpdateModel/:id/:firmware' component={UpdateModel} />
            <Route exact path='/Device' component={Device} />
            {/* default route */}
            <Route exact path='/' component={LcmStatus} />
          </main>
      </div>
    );
  }

}

export default App;
