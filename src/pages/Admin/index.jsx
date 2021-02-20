import React, { Component } from 'react'
import { connect } from "react-redux"
import TopNav from "../../components/UserTopNav"
import './index.css'

class Admin extends Component {
    render() {
        return (
            <div>
                <TopNav></TopNav>
                admin
            </div>
        )
    }
}

export default connect(
    state => ({ user: state }),
)(Admin)