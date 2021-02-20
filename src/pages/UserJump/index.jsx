import React, { Component } from 'react'
import { connect } from "react-redux"
import { Route, Switch, Redirect } from 'react-router-dom'
import Student from "../Student"
import Teacher from "../Teacher"
import Admin from "../Admin"

import './index.css'

class UserJump extends Component {
    constructor(props) {
        super(props)
        console.log('userjump: ', this.props.user === "teacher")
        this.props.user === "student" ? this.props.history.push("/user/student")
            : this.props.user === "teacher" ? this.props.history.push("/user/teacher")
                : this.props.user === "admin" ? this.props.history.push("/user/admin")
                    : this.props.history.push("/nullUser")
    }
    render() {
        return (
            <>  
                <Switch>
                    <Route path="/user/student" component={ Student }/>
                    <Route path="/user/teacher" component={ Teacher } />
                    <Route path="/user/admin" component={ Admin }/>
                    <Redirect to="/login" />
                </Switch>
            </>
        )
    }
}

export default connect(
    state => ({ user: state.login }),
)(UserJump)