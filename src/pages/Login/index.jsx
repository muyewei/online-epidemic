import { createLoginAction } from "../../redux/actions/login_action"

import { connect } from "react-redux"

//加密 --对账号密码进行加密再传输
import MD5 from "crypto-js/md5"
import SHA1 from "crypto-js/sha1"
import AES from "crypto-js/aes"
import React, { Component } from 'react'
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './index.css'
import { Link } from "react-router-dom"

class Login extends Component {
    state = {
        username: "control123",
        password: "control123"
    }
    componentDidMount() {
        if (this.props.loginState.user !== "visitor") {
            this.props.history.push(`/index`)
        }
    }
    onFinish = (values) => {
        this.login(values)
    };
    //登录 --获取Input框的账号密码（username，password），密码加密 账号不加密后上传服务器端验证
    login = (loginInput) => {
        let secretKey = "moran"
        let username = loginInput.username
        let password = SHA1(MD5(loginInput.password)).toString()
        password = AES.encrypt(password, secretKey).toString()
        this.axios.post("/users/account/login", {username,password})
            .then((res) => {
                //设置cookie 延迟保存10s
                let exp = new Date();    
                exp.setTime(exp.getTime() + 60 * 60 * 1000);
                document.cookie = "token=" + res.data.token + ";expires=" + exp.toGMTString() + ";path=/"
                this.props.login({user: res.data.user, identify: res.data.identify})
                this.props.history.push(`/index`)
        })
    }
    render() {
        return (
            <div className="LoginUI">
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{
                        remember: true,
                        username: this.state.username,
                        password: this.state.password
                    }}
                    onFinish={this.onFinish}
                >
                <h1>在线登录</h1>
                <div>账号：</div>
                <p></p>
                <Form.Item
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: '账号名不能为空',
                        },
                    ]}
                >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username"/>
                </Form.Item>
                <div>密码：</div>
                <p></p>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: '密码不能为空',
                        },
                    ]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>
                <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>记住信息</Checkbox>
                    </Form.Item>

                    <a className="login-form-forgot" href="/">
                        忘记密码
                </a>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button" style={{width:'100%',height:'40px'}}>
                        登录
                </Button>
                        <Link to="/register">注册</Link>
                </Form.Item>
            </Form>
            </div>
            
        );
    }
}

export default connect(
    state => ({ loginState: state.login }),
    dispatch => ({
        login: data => dispatch(createLoginAction(data))
    })
)(Login)