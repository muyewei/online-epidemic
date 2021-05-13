import React, { Component } from 'react'
import { connect } from "react-redux"
import User from "../../components/User"
import './index.css'
import { createLoginAction } from "../../redux/actions/login_action"


class Publisher extends Component {
    componentDidMount(){
        console.log("publisher props",this.props)
    }
    state = {
        menu: [
            {
                "title": "个人展示",
                "list": [{name:"信息详情",content: "show1"},{name:"更改密码",content: "show2"}]
            },
            {
                "title": "卷库",
                "list": [{name:"试卷列表",content: "show3"},{name:"创建试卷",content: "show4"},{name:"在线试卷",content: "show5"}]
            },
            {
                "title": "题库",
                "list": [{name:"题目列表",content: "show6"},{name:"创建题目",content: "show7"}]
            },
            {
                "title": "文章",
                "list": [{name:"发布文章",content: "show8"}]
            }
        ]
    }
    render() {
        return (
            <div style={{height: '100%'}}>
                <User username={ this.props.loginState.username } login={this.props.login} useraccount={ this.props.loginState.useraccount } identify={ this.props.loginState.identify } menu={ this.state.menu }></User>
            </div>
        )
    }
}

export default connect(
    state => ({ loginState: state.login }),
    dispatch => ({
        login: data => dispatch(createLoginAction(data))
    })
)(Publisher)