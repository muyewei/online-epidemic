import React, { Component } from "react"
import { Upload, message, Button, Image } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import style from "./index.module.css"

export default class ChangeInformation extends Component {
    initPassword = React.createRef()
    newPassword = React.createRef()
    repeatPassword = React.createRef()
    usernameRef = React.createRef()
    componentDidMount(){
        this.axios.get("/users/account/getheadportrait?useraccount="+this.props.useraccount)
        .then(res=>{
            this.setState({headportraitpath: res.data.data.headportrait})
        })
    }
    state = {
        repeat: "none",
        warnword: "",
        username: "",
        hasheadportrait: true,
        headportraitpath: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
    }
    changeUsername = () => {
        if(this.state.username !== ""){
            this.axios.get("/users/account/changeusername?username="+this.state.username+"&useraccount="+this.props.useraccount)
            .then((result) => {
                if(result.data.msg === "success"){
                    message.success("更改成功")
                    this.props.login({username: result.data.username, identify: this.props.identify, useraccount: this.props.useraccount})
                }else{
                    message.info("未知错误")
                }
            })
        } 
    }
    render() {
        const props = {
            name: 'file',
            action: '/users/account/headportrait',
            headers: {
                authorization: 'authorization-text',
            },
            data:{
                identify: this.props.identify,
                useraccount: this.props.useraccount
            },
            onChange: (info) => {
                if (info.file.status !== 'uploading') {
                    console.log(info.file, info.fileList);
                }
                if (info.file.status === 'done') {
                    message.success(`${info.file.name} file uploaded successfully`);
                    this.setState({headportraitpath: info.file.response.thumburl})
                } else if (info.file.status === 'error') {
                    message.error(`${info.file.name} file upload failed.`);
                }
            },
        };
        return (
            <div className={style["changeinformation"]}>
                <div className={style["cileft"]}>
                    <div>个人信息</div>
                    <hr />
                    <div className={style["head"]}>
                        {
                            this.state.hasheadportrait ?
                                (
                                    <Image
                                        width={200}
                                        src={this.state.headportraitpath}
                                    />
                                ) :
                                (
                                    <img src={process.env.PUBLIC_URL + "/image/head/local.png"} alt="头像.jpg" />
                                )
                        }
                    </div>
                        <Upload {...props}
                            showUploadList={false}
                            maxCount={1}
                        >
                            <Button icon={<UploadOutlined />}>更换头像</Button>
                        </Upload>
                    <hr />
                    <div>简介</div>
                    <div>
                        无
                    </div>
                </div>
                <div className={style["ciright"]}>
                    <div>
                        <p>账号</p>
                        <p>{this.props.useraccount}</p>
                    </div>
                    <div>
                        <div>
                            <p>用户名</p>
                            <input type="text" placeholder={this.props.username} onChange={e => this.setState({ username: e.target.value })} />
                        </div>
                        <div>
                            <button onClick={() => this.changeUsername()}>更新</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}