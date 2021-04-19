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
                "title": "网站",
                "list": [{name:"网站详情",content: "admin1"}]
            },
            {
                "title": "信息",
                "list": [{name:"个人信息",content: "admin2"}]
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
            }
        ]
    }
    render() {
        return (
            <div style={{height: '100%'}}>
                <User username={ this.props.loginState.user } identify={this.props.loginState.identify} menu={ this.state.menu }></User>
            </div>
        )
    }
}

export default connect(
    state => ({ loginState: state.login }),
)(Admin)