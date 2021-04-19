import React, { Component } from 'react'
import { Link } from "react-router-dom"
import "./topnav.css"
import { connect } from "react-redux"
import { createCancelAction } from "../../redux/actions/login_action"


class topnav extends Component {
    componentDidMount(){
        console.log("topnav: ", this.props.loginState)
    }
    cancelAccount = () => {
        this.axios.get("/users/account/cancel",{params:this.props.loginState})
        this.props.cancel({user: "visitor", identify: "visitor"})
    }
    render() {
        return (
            <div className="topnav">
                <div className="topnav-logo">
                    <span>疫情</span>
                </div>
                <div className="topnav-list">
                    <ul>
                        <li>
                            <Link to="/index">主页</Link>
                        </li>
                        <li>
                            <Link to="/map">疫情地图</Link>
                        </li>
                        <li>
                            <Link to="/time">疫情时间</Link>
                        </li>
                        <li>
                            <Link to="/share">交流</Link>
                        </li>
                        <li>
                            {
                                this.props.loginState.user !== "visitor" ? (
                                    <ul>
                                        <li><Link to="/user">{ this.props.loginState.user }</Link></li>
                                        <li><Link to="/index" style={{textOverflow:"ellipsis",whiteSpace: "nowrap"}} title="点击注销" onClick={() => this.cancelAccount()}>点击注销</Link></li>
                                    </ul>
                                    
                                ): (
                                    <Link to="/login">登录 / 注册</Link>
                                )
                            }
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({ loginState: state.login }),
    dispatch => ({
        cancel: data => dispatch(createCancelAction(data))
    })
)(topnav)