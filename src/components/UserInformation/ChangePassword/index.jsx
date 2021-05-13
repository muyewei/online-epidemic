import React, {Component} from "react"
import {message} from "antd"
import style from "./index.module.css"
import MD5 from "crypto-js/md5"
import SHA1 from "crypto-js/sha1"
import AES from "crypto-js/aes"

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
        let secretKey = "genggai"
        if(this.newPassword.current.value === "" || this.repeatPassword.current.value === "" || this.initPassword.current.value === ""){
            this.setState({repeat: "block", warnword: "输入内容不能为空"})
        } else if(this.newPassword.current.value !== this.repeatPassword.current.value){
            this.setState({repeat: "block", warnword: "两次输入密码不一致"})
        } else{
            let oldpassword = SHA1(MD5(this.initPassword.current.value)).toString()
            oldpassword = AES.encrypt(oldpassword, secretKey).toString()
            let npassword = SHA1(MD5(this.newPassword.current.value)).toString()
            npassword = AES.encrypt(npassword, secretKey).toString()
            this.axios.post("/users/account/changepassword",{oldpassword,newpassword:npassword,useraccount:this.props.useraccount})
            .then((result) => {
                if(result.data.msg === "success"){
                    message.success("更改成功")
                }else{
                    message.info("未知错误")
                }
            })
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