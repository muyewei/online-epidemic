import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
import style from './index.module.css'
import { DoubleRightOutlined } from '@ant-design/icons';
import PublisherMod from '../PublisherMod'
import CreatePaperList from '../CreatePaperList'
import UserInformation from "../UserInformation"
import CreateTopicList from "../CreateTopicList"


/**
 * 
 * 右侧管理栏
 */
export default class Main extends Component {
    state = {
       paperno: "",
       ctp: false
    }
    componentDidMount(){
        console.log("usermain props: ", this.props.operationPage)
    }
    componentDidUpdate(){
        console.log("usermain update: ", this.props)
    }
    createToPublish = (paperno)=>{
        this.props.ctp(paperno)
    }
    render() {
        return (
            <div className="">
                <div className={style["main_head"]}>
                    <DoubleRightOutlined /> <span>主页{this.props.listName[0] ? " / " + this.props.listName[0] : ""}{this.props.listName[1] ? " / " + this.props.listName[1] : ""}</span>
                    {
                        this.props.operationPage === "创建试卷"  &&
                        <PublisherMod username={this.props.username} paperno={this.props.paperno}></PublisherMod>
                    }
                    {
                        this.props.operationPage === "试卷列表"  &&
                        <CreatePaperList username={this.props.username} createToPublish={(paperno) => this.createToPublish(paperno)}></CreatePaperList>
                    }
                    {
                        (this.props.operationPage === "个人信息" || this.props.operationPage === "更改密码")  &&
                        <UserInformation username={this.props.username} type={this.props.operationPage}></UserInformation>
                    }
                    {
                        (this.props.operationPage === "创建题目" || this.props.operationPage === "题目列表")  &&
                        <CreateTopicList username={this.props.username} type={this.props.operationPage}></CreateTopicList>
                    }
                </div>
            </div>
        )
    }
}
