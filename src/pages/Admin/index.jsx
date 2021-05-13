import React, { Component } from 'react'
import { connect } from "react-redux"
import User from "../../components/User"
// import TopNav from "../../components/UserTopNav"
import './index.css'

class Admin extends Component {
    componentDidUpdate(){
        // console.log("admin props: ", this.props)
    }
    state = {
        menu: [
            {
                "title": "个人信息",
                "list": [{name:"信息详情",content: "admin2"}]
            },
            {
                "title": "试卷列表",
                "list": [{name:"试卷信息",content: "admin3"}]
            },
            {
                "title": "题目列表",
                "list": [{name:"题目信息",content: "admin4"}]
            },
            {
                "title": "网站日志",
                "list": [{name:"用户日志", content:"admin5"},{name:"试卷日志",content:"admin6"},{name:"题目日志",content:"admin7"}]
            },
            {
                "title": "用户列表",
                "list": [{name:"普通用户", content:"admin8"},{name:"发布用户",content:"admin9"},{name:"管理员",content:"admin10"}]
            },
            {
                "title": "信息交互",
                "list": [{name:"发布通告", content:"admin11"},{name:"文件与链接",content:"admin12"},{name: "反馈",content:"admin13"}]
            }
        ]
    }
    render() {
        return (
            <div style={{height: '100%'}}>
                <User username={ this.props.loginState.username } useraccount={ this.props.loginState.useraccount } identify={this.props.loginState.identify} menu={ this.state.menu }></User>
            </div>
        )
    }
}

export default connect(
    state => ({ loginState: state.login }),
)(Admin)