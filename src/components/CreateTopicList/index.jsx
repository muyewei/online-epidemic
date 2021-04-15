import React, {Component} from "react"
import style from "./index.module.css"
import Ct from "./CreateTopic"
import Tl from "./Topiclist"

export default class CreateTopicList extends Component{
    render(){
        return(
            <div className={style["createTopicList"]}>
                123
                {
                    this.props.type === "创建题目" &&
                    <Ct username={this.props.username} type={this.props.operationPage}></Ct>
                }
                {
                    this.props.type === "题目列表" &&
                    <Tl username={this.props.username} type={this.props.operationPage}></Tl>
                }
            </div>
        )
    }
}