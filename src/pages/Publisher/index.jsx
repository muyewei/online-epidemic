import React, { Component } from 'react'
import { connect } from "react-redux"
import User from "../../components/User"
import './index.css'

class Publisher extends Component {
    state = {
        menu: [
            {
                "title": "用户展示",
                "list": [{name:"show1",content: "show1"},{name:"show2",content: "show2"}]
            },
            {
                "title": "卷库",
                "list": [{name:"试卷列表",content: "show3"},{name:"创建试卷",content: "show4"},{name:"试卷草稿",content: "show5"}]
            },
            {
                "title": "题库",
                "list": [{name:"题目列表",content: "show6"},{name:"创建题目",content: "show7"}]
            }
        ]
    }
    render() {
        return (
            <div style={{height: '100%'}}>
                <User username={ this.props.loginState.user } menu={ this.state.menu }></User>
            </div>
        )
    }
}

export default connect(
    state => ({ loginState: state.login }),
)(Publisher)