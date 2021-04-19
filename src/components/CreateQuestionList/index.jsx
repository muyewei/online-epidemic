import React, {Component} from "react"
import style from "./index.module.css"
import Cq from "./CreateQuestion"
import Ql from "./Questionlist"

export default class CreateQuestionList extends Component{
    render(){
        return(
            <div className={style["createQuestionList"]}>
                123
                {
                    this.props.type === "创建题目" &&
                    <Cq username={this.props.username} account={this.props.account} type={this.props.operationPage}></Cq>
                }
                {
                    this.props.type === "题目列表" &&
                    <Ql username={this.props.username} account={this.props.account} type={this.props.operationPage}></Ql>
                }
            </div>
        )
    }
}