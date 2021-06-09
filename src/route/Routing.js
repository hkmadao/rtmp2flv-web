import React, { memo } from "react";
import { Route, Switch } from "react-router-dom";
import CameraList from '../camera/cameraList';
import SignInSide from '../login/SignInSide';
import NoMatch from '../404/NoMatch';

function Routing(props) {
    return (
      <Switch>
        <Route exact path="/" component={CameraList} />
        <Route path="/login" component={SignInSide} />
        <Route component={NoMatch} />
      </Switch>
    );
  }
  
  export default memo(Routing);
