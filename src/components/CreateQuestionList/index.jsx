import React, {Component} from "react"
import style from "./index.module.css"
import Cq from "./CreateQuestion"
import Ql from "./Questionlist"

export default class CreateQuestionList extends Component{
    state = {
        questionno: 0
    }
    createToPublishQ = (questionno) =>{
        this.props.createToPublishQ(questionno)
        this.setState({questionno})
    }
    render(){
        return(
            <div className={style["createQuestionList"]}>
                {
                    this.props.type === "创建题目" &&
                    <Cq username={this.props.username} account={this.props.account} type={this.props.operationPage} questionno={this.state.questionno}></Cq>
                }
                {
                    this.props.type === "题目列表" &&
                    <Ql username={this.props.username} createToPublishQ={(no)=>this.createToPublishQ(no)} account={this.props.account} type={this.props.operationPage} createToPublish={()=>this.createToPublish()}></Ql>
                }
            </div>
        )
    }
}