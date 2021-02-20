import React, { Component } from 'react'
import { connect } from "react-redux"
import User from "../../components/User"
import './index.css'

class Teacher extends Component {
    render() {
        return (
            <div style={{height: '100%'}}>
                <User></User>
            </div>
        )
    }
}

export default connect(
    state => ({ user: state.login }),
)(Teacher)