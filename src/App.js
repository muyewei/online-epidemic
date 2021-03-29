import React from "react"
import axios from "axios"
//登录页面
import Login from "./pages/Login"
//用户页面
import UserJump from "./pages/UserJump"
import Register from "./pages/Register"

import Topnav from "./pages/topnav/topnav"
import Homepage from "./pages/homepage/homepage"
import Epidemicmap from "./pages/epidemicmap/epidemicmap"
import Epidemictime from "./pages/epidemictime/epidemictime"
import Share from "./pages/share/share"

import {withRouter} from 'react-router-dom'

import "./App.css";
import { Route, Redirect, Switch } from "react-router-dom";

React.Component.prototype.axios = axios
class App extends React.Component {
  state = {
    userroute: ""
  }
  // constructor() {
  //   super()
  //   let token = document.cookie.split(";").filter((item) => item.indexOf("token=") >= 0)[ 0 ] || ""
  //   console.log("get cookie: ", token.split("=")[1])
  // }
  componentDidMount() {
    // console.log(this.props)
    if (this.props.location.pathname.indexOf("/user") < 0) {
      this.setState({userroute: false})
    } else {
      this.setState({userroute: true})
    }
  }
  render() {
    return (
      <div style={{ width: "100%", height: "100%" }}>
          <Switch>
            <Route path="/user"></Route>
            <Route path="/">
              <header>
                  <Topnav></Topnav>
              </header>
            </Route>
          </Switch>
        <main>
          <Switch>
            <Route path="/login" component={ Login } />
            <Route path="/register" component={ Register } />
            <Route path="/user" component={ UserJump } />
            <Route path="/index" component={ Homepage }/>
            <Route path="/map" component={ Epidemicmap }/>
            <Route path="/time" component={ Epidemictime }/>
            <Route path="/Share" component={Share} />
            <Redirect to="/index" />
          </Switch>
        </main>
    </div>
  );
  }

}

export default withRouter(App);
