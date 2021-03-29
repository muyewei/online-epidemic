import React, { Component } from 'react'
import { connect } from "react-redux"
import TopNav from "../../components/UserTopNav"
import './index.css'

class Normal extends Component {
    render() {
        return (
            <div>
                <TopNav></TopNav>
                student
            </div>
        )

    }
}

export default connect(
    state => ({ loginState: state.login }),
)(Normal)