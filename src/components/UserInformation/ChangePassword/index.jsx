import React, {Component} from "react"
import style from "./index.module.css"

export default class ChangePassword extends Component{
    initPassword = React.createRef()
    newPassword = React.createRef()
    repeatPassword = React.createRef()
    state = {
        repeat: "none",
        warnword: ""
    }
    changeSubmit = () => {
        console.log(this.initPassword.current.value)
        console.log(this.newPassword.current.value === "")
        console.log(this.repeatPassword.current.value)
        if(this.newPassword.current.value === "" || this.repeatPassword.current.value === "" || this.initPassword.current.value === ""){
            this.setState({repeat: "block", warnword: "输入内容不能为空"})
        } else if(this.newPassword.current.value !== this.repeatPassword.current.value){
            this.setState({repeat: "block", warnword: "两次输入密码不一致"})
        }
    }
    render(){
        return (
            <div className={style["changepassword"]}>
                <div>
                    <span>原密码：</span><br/>
                    <input type="password" ref={this.initPassword}/>
                </div>
                <div>
                    <span>新密码：</span><br/>
                    <input type="password" ref={this.newPassword}/>
                </div>
                <div>
                    <span>重复输入密码：</span><br/>
                    <input type="password" ref={this.repeatPassword}/>
                </div>
                <div>
                    <span style={{color: "red", display: this.state.repeat}}>{ this.state.warnword }</span>
                </div>
                <div>
                    <button onClick={() => this.changeSubmit()}>确定</button>
                </div>
            </div>
        )
    }
}