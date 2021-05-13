import React, {Component} from "react"
import Ci from "./ChangeInformation"
import Cp from "./ChangePassword"

export default class UserInformation extends Component{
    componentDidMount(){
        console.log("userinformation props: ",this.props)
    }
    render(){
        return (
            <div>
                {
                    this.props.type === "信息详情" &&
                    <Ci username={this.props.username} login={this.props.login} identify={this.props.identify} useraccount={ this.props.useraccount }  type={this.props.operationPage}></Ci>
                }
                {
                    this.props.type === "更改密码" &&
                    <Cp username={this.props.username} useraccount={ this.props.useraccount } type={this.props.operationPage}></Cp>
                }
            </div>
        )
    }
}