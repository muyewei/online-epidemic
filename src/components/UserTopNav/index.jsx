import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import style from './index.module.css'
import {
    WindowsOutlined,
    TeamOutlined
  } from '@ant-design/icons';
/**
 * 
 * 顶部菜单栏
 */
export default class TopNav extends Component {
    logOff = () => {
        let cookie = document.cookie
        console.log(cookie)
        if (cookie.indexOf("token") !== -1) {
            document.cookie = "token= ' ';expires=" + new Date().getTime() + ";path=/"
        }
    }
    render() {
        return (
            <div className={style["top-nav"]}>
                <div className={style["tn-logo"]}>
                    <Link to="/user/userjump">
                        <WindowsOutlined/>
                        <span>问卷系统</span>
                    </Link>
                </div>
                <div className={style["tn-exit"]}>
                    <Link to="/login" onClick={this.logOff}>返回主页</Link>
                </div>
                <div className={style["tn-user-icon"]}>
                    <TeamOutlined />
                </div>
            </div>
        )
    }
}
