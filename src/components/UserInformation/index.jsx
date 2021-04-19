import React, {Component} from "react"
import Ci from "./ChangeInformation"
import Cp from "./ChangePassword"

export default class UserInformation extends Component{
    render(){
        return (
            <div>
                {
                    this.props.type === "个人信息" &&
                    <Ci username={this.props.username} type={this.props.operationPage}></Ci>
                }
                {
                    this.props.type === "更改密码" &&
                    <Cp username={this.props.username} type={this.props.operationPage}></Cp>
                }
            </div>
        )
    }
}