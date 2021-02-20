import React, { Component } from "react"
import { connect } from "react-redux"
import {
    Form,
    Input,
    Button,
} from "antd";
//加密 --对账号密码进行加密再传输
import MD5 from "crypto-js/md5"
import SHA1 from "crypto-js/sha1"
import AES from "crypto-js/aes"
import { UserOutlined, LockOutlined, MessageOutlined, KeyOutlined } from "@ant-design/icons";
import "./index.css"

class Register extends Component {
    state = {
        checkaccount: "",
        checkusername: ""
    }
    onFinish = (registerInput) => {
        let secretKey = "weibiao"
        let useraccount = registerInput.useraccount
        let username = registerInput.username
        let password = SHA1(MD5(registerInput.password)).toString()
        password = AES.encrypt(password, secretKey).toString()

        this.axios.post("/users/account/register", {
            useraccount,
            username,
            password
        }).then(res => {
            if (res.data.msg === "success") {
                console.log("success")
                //设置cookie 延迟保存10s
                // let exp = new Date();    
                // exp.setTime(exp.getTime() + 60 * 60 * 1000);
                // document.cookie = "token=" + res.data.token + ";expires=" + exp.toGMTString() + ";path=/"
                // this.props.login(res.data.user)
                this.props.history.push(`/login`)
            } else {
                let checkres = {
                    account: "",
                    username: ""
                }
                if (res.data.checkuser.account) {
                    checkres.account = "warning"
                }
                if (res.data.checkuser.username) {
                    checkres.username = "warning"
                }
                this.setState({
                    checkaccount: checkres.account,
                    checkusername: checkres.username
                })
                console.log("fail")
            }
        })
    }
    render() {
        return (
            <div className="registerUI">
                <Form
                    className="register-form"
                    onFinish={this.onFinish}
                >
                    <h1>注册账号</h1>
                    <div>用户名：</div>
                    <p></p>
                    <Form.Item
                        name="useraccount"
                        className="registeraccount"
                        validateStatus={this.state.checkaccount}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: "用户名不能为空",
                            },
                            {
                                min: 1,
                                message: "用户名过短",
                            },
                            {
                                max: 20,
                                message: "用户名过长"

                            }
                        ]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                    </Form.Item>
                    <div>账号：</div>
                    <p></p>
                    <Form.Item
                        name="username"
                        className="registerusername"
                        validateStatus={this.state.checkusername}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: "账号不能为空",
                            },
                            {
                                min: 6,
                                message: "账号过短",
                            },
                            {
                                max: 12,
                                message: "账号过长"

                            },
                            {
                                message:"仅支持数字或字母",
                                pattern: /^[0-9a-zA-Z]+$/
                            }
                        ]}
                    >
                        <Input prefix={<MessageOutlined className="site-form-item-icon" />} placeholder="请输入6-12位数字或字母" />
                    </Form.Item>
                    <div>密码：</div>
                    <p></p>
                    <Form.Item
                        name="password"
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: "密码不能为空",
                            },
                            {
                                min: 8,
                                message: "密码过短",
                            },
                            {
                                max: 14,
                                message: "密码过长"

                            },
                            {
                                message:"仅支持数字或字母",
                                pattern: /^[0-9a-zA-Z]+$/
                            }
                        ]}
                    >
                        <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="请输入8-14位数字或字母" />
                    </Form.Item>
                    <div>确认密码：</div>
                    <p></p>
                    <Form.Item
                        name="confirm"
                        dependencies={[ "password" ]}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: "请确认密码",
                            },
                            ({ getFieldValue }) => ({
                              validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                  return Promise.resolve();
                                }
                                return Promise.reject('两次密码不一样');
                              },
                            }),
                        ]}
                    >
                        <Input.Password prefix={<KeyOutlined className="site-form-item-icon" />} placeholder="请重复输入密码" />
                    </Form.Item>
                    <p style={{color: "red"}}>{this.state.checkaccount === "warning" ? "用户名已重复" : ""}</p>
                    <p style={{color: "red"}}>{this.state.checkusername  === "warning" ? "账号已重复" : ""}</p>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button" style={{ width: "100%", height: "40px" }}>
                            注册
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

export default connect(
    state => ({ user: state }),
)(Register)