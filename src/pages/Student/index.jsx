import React, { Component } from 'react'
import { connect } from "react-redux"
import TopNav from "../../components/UserTopNav"
import './index.css'

class Student extends Component {
    render() {
        return (
            <div>
                <TopNav></TopNav>
                student
                {this.props.user}
            </div>
        )

    }
}

export default connect(
    state => ({ user: state }),
)(Student)