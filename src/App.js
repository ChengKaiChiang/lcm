import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
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
import Optical from './pages/Optical';

import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import { AuthContext } from './pages/auth/context';
import { getUser } from './pages/auth/getUser';
import { getAuthToken, setAuthToken } from './pages/auth/utils';
import { PrivateRoute } from './pages/auth/privateRoute';
function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = getAuthToken();
    // 以 getAuthToken 從 localStorage 讀取 token
    if (token) {
      // 有 token 才 call API
      getUser().then((res) => {
        if (res.error === '授權失敗') {
          setAuthToken(null);
        } else {
          setUser(res.data.name);
        }
      });
    }
  }, []);

  return (
    <div id="wrapper">
      <AuthContext.Provider value={{ user, setUser }}>
        <MyNavbar />
        <main role="main">
          <Switch>
            <Route path="/SignIn">
              <SignIn />
            </Route>
            <Route exact path='/' component={LcmStatus} />
            <Route exact path='/Device' component={Device} />
            <Route exact path='/SignUp' component={SignUp} />
            <Route exact path='/Optical' component={Optical} />

            {/* <PrivateRoute path="/Register">
              <Register />
            </PrivateRoute> */}

            <PrivateRoute path="/Update">
              <Fota />
            </PrivateRoute>

            <PrivateRoute path="/Firmware">
              <Firmware />
            </PrivateRoute>

            <PrivateRoute path="/CreateFirmware">
              <CreateFirmware />
            </PrivateRoute>

            <PrivateRoute path="/UpdateFirmware/:id/:version">
              <UpdateFirmware />
            </PrivateRoute>

            <PrivateRoute path="/Model">
              <Model />
            </PrivateRoute>

            <PrivateRoute path="/CreateModel">
              <CreateModel />
            </PrivateRoute>

            <PrivateRoute path="/UpdateModel/:id/:firmware">
              <UpdateModel />
            </PrivateRoute>
          </Switch>
        </main>
      </AuthContext.Provider>
    </div>
  );
}
export default App;
