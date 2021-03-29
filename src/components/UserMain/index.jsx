import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
import style from './index.module.css'
import { DoubleRightOutlined } from '@ant-design/icons';
/**
 * 
 * 右侧管理栏
 */
export default class Main extends Component {
    render() {
        return (
            <div className="">
                <div className={style["main_head"]}>
                    <DoubleRightOutlined /> <span>主页{this.props.listName[0] ? " / " + this.props.listName[0] : ""}{this.props.listName[1] ? " / " + this.props.listName[1] : ""}</span>
                </div>
            </div>
        )
    }
}
