import React, { Component } from 'react'
import { Link } from 'react-router-dom'
// import style from './index.module.css'
/**
 * 
 * 右侧管理栏
 */
export default class Main extends Component {
    render() {
        return (
            <div className="">
                <Link to="/login">{ this.props.user }</Link>
            </div>
        )
    }
}
