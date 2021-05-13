import React, { Component } from 'react'
import { connect } from "react-redux"
import { Route, Switch } from 'react-router-dom'
import Normal from "../Normal"
import Publisher from "../Publisher"
import Admin from "../Admin"

import './index.css'

class UserJump extends Component {
    constructor(props) {
        super(props)
        let identify = this.props.loginState.identify.replace(/[ ]/g, "")
        // console.log('userjump: ', identify)
        identify === "normal" ? this.props.history.push("/user/normal")
            : identify === "publisher" ? this.props.history.push("/user/publisher")
                : identify === "admin" ? this.props.history.push("/user/admin")
                    : this.props.history.push("/login")
    }
    render() {
        return (
            <>  
                <Switch>
                    <Route path="/user/normal" component={ Normal }/>
                    <Route path="/user/publisher" component={ Publisher } />
                    <Route path="/user/admin" component={ Admin }/>
                </Switch>
            </>
        )
    }
}

export default connect(
    state => ({ loginState: state.login }),
)(UserJump)