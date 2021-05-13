import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
import style from './index.module.css'
import { DoubleRightOutlined } from '@ant-design/icons';
import PublisherMod from '../PublisherMod'
import CreatePaperList from '../CreatePaperList'
import OnlinePaperList from "../OnlinePaperList"
import UserInformation from "../UserInformation"
import CreateQuestionList from "../CreateQuestionList"
import AdminOperation from "../AdminOperation"
import LetterControl from '../LetterControl';


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
        // console.log("usermain props: ", this.props)
    }
    componentDidUpdate(){
        // console.log("usermain update: ", this.props)
    }
    createToPublish = (paperno)=>{
        this.props.ctp(paperno)
    }
    createToPublishQ = (questionno)=>{
        this.props.ctpq(questionno)
    }
    render() {
        return (
            <div className="">
                <div className={style["main_head"]}>
                    <DoubleRightOutlined /> <span>主页{this.props.listName[0] ? " / " + this.props.listName[0] : ""}{this.props.listName[1] ? " / " + this.props.listName[1] : ""}</span>
                    {
                        this.props.identify === "admin" &&
                        <div>管理员模块</div>
                    }
                    {
                        this.props.operationPage === "创建试卷"  &&
                        <PublisherMod username={this.props.username} useraccount={ this.props.useraccount } paperno={this.props.paperno}></PublisherMod>
                    }
                    {
                        this.props.operationPage === "试卷列表"  &&
                        <CreatePaperList username={this.props.username} createToPublish={(paperno) => this.createToPublish(paperno)}></CreatePaperList>
                    }
                    {
                        this.props.operationPage === "在线试卷"  &&
                        <OnlinePaperList username={this.props.username}></OnlinePaperList>
                    }
                    {
                        (this.props.operationPage === "信息详情" || this.props.operationPage === "更改密码")  &&
                        <UserInformation login={this.props.login} identify={this.props.identify} useraccount={ this.props.useraccount } username={this.props.username} type={this.props.operationPage}></UserInformation>
                    }
                    {
                        (this.props.operationPage === "发布文章" ||  this.props.operationPage === "文章列表")  &&
                        <LetterControl username={this.props.username} useraccount={ this.props.useraccount }></LetterControl>
                    }
                    {
                        (this.props.operationPage === "创建题目" || this.props.operationPage === "题目列表")  &&
                        <CreateQuestionList username={this.props.username} createToPublishQ={(questionno) => this.createToPublishQ(questionno)} useraccount={this.props.useraccount} type={this.props.operationPage}></CreateQuestionList>
                    }
                    {
                        this.props.identify === "admin" &&
                        <AdminOperation username={ this.props.username } useraccount={ this.props.useraccount } operationPage={this.props.operationPage}></AdminOperation>
                    }
                </div>
            </div>
        )
    }
}
