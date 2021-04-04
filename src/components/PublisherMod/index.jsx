import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
// import style from './index.module.css'
import { Form, Input, Button, Select, Modal, Menu, Dropdown, Radio } from 'antd';
import { UserOutlined, DownOutlined } from '@ant-design/icons';

const formItemLayout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 8,
    },
  };

const addButtonLayout = {
    wrapperCol: {
      offset: 4,
      span: 16,
    },
};

const singletype = {
    title: "",
    option: ["","","",""],
    answer: [""],
    analyze: ""
}

const {TextArea} = Input

class CreateTest extends Component{
    state = {
        loading: false,
        visible: false,
        defaultquestion: "选择题目",
        optiondefault: 4,
        optiondefaultValue: [],
        singletype: singletype,
        warning: ""
    };
    
    componentDidUpdate (preProps, preState) {
        // console.log("did update", preState, this.state)
        if(preState.optiondefault > this.state.optiondefault){
            let st = singletype
            st.option.pop()
            this.setState({singletype: st})
        }else if(preState.optiondefault < this.state.optiondefault){
            let st = singletype
            st.option.push("")
            this.setState({singletype: st})
        }
    }

    showModal = () => {
        this.setState({
        visible: true,
        });
    };

    handleOk = () => {
        // this.setState({ loading: true });
        // setTimeout(() => {
        // this.setState({ loading: false, visible: false });
        // }, 3000);
        let warningsingle = ""
        let st = this.state.singletype
        // console.log(st)
        if(st.title === ""){
            warningsingle += "标题 · "
        }

        for (let index = 0; index < st.option.length; index++) {
            const element = st.option[index];
            if(element === ""){
                warningsingle += "选项 · "
            }
            break
        }

        for (let index = 0; index < st.answer.length; index++) {
            const element = st.answer[index];
            if(element === ""){
                warningsingle += "答案 · "
            }
            break
        }

        if(warningsingle !== ""){
            warningsingle += "不能为空"
        }

        this.setState({warning: warningsingle})
    };

    handleCancel = () => {
        this.setState({ visible: false });
    };

    handleMenuClick = (item) =>{
        console.log("menu click:", item.domEvent.target.innerText)
        this.setState({defaultquestion: item.domEvent.target.innerText})
    }
    //当问题标题更改时触发次函数
    handleTitleChange = (e) => {
        // console.log("title value:", e.target.value)
        let st = this.state.singletype
        st.title = e.target.value
        this.setState({singletype: st})
    }
    //当选项的答案更改时触发此函数
    handleValueClick = (e) =>{
        // console.log("menu value:", e.target.value)
        let st = this.state.singletype
        st.answer = e.target.value
        this.setState({singletype: st})
    }
    //当选项的值改变的时候触发此函数
    handleOptionChange = (e) => {
        const num = e.target.id.split("singleoption")[1]
        // console.log("Option value:", num)
        let st = this.state.singletype
        st.option[Number(num)] = e.target.value
        this.setState({singletype: st})
    }
    //当选项的解析改变的时候触发此函数
    handleAnalyzeChange = (e) => {
        // console.log("Option value:", e)
        let st = this.state.singletype
        st.analyze = e.target.value
        this.setState({singletype: st})
    }
    render() {
        const { visible, loading } = this.state;
        const menu = (
            <Menu onClick={(item)=>this.handleMenuClick(item)}>
                <Menu.Item key="singleq" icon={<UserOutlined />}>
                单选题
                </Menu.Item>
                <Menu.Item key="multiq" icon={<UserOutlined />}>
                多选题
                </Menu.Item>
                <Menu.Item key="judgeq" icon={<UserOutlined />}>
                判断题
                </Menu.Item>
                <Menu.Item key="gapq" icon={<UserOutlined />}>
                填空题
                </Menu.Item>
                <Menu.Item key="shortq" icon={<UserOutlined />}>
                简答题
                </Menu.Item>
            </Menu>
        );
      return (
            <div style={{width: "90%",margin: "50px auto"}}>
                <Form 
                >
                    <Form.Item
                    {...formItemLayout}
                        name="papername"
                        label="考卷名称"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                    {...formItemLayout}
                        name="paperstyle"
                        label="考卷类型"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                    {...formItemLayout}
                        name="paperbrief"
                        label="考卷简介"
                    >
                        <TextArea />
                    </Form.Item>
                    <Form.Item
                    {...formItemLayout}
                        name="papertime"
                        label="考卷时长"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                    {...formItemLayout}
                        name="paperpassword"
                        label="考卷密码"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        {...addButtonLayout}
                        name="paperaddquestion"
                    >
                        <Button  onClick={this.showModal}>添加题目</Button>
                        <Modal
                            visible={visible}
                            title="Title"
                            onOk={this.handleOk}
                            onCancel={this.handleCancel}
                            width={800}
                            footer={[
                                <Button key="back" onClick={this.handleCancel} >
                                Return
                                </Button>,
                                <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
                                Submit
                                </Button>,
                                <Button
                                key="link"
                                href="https://google.com"
                                type="primary"
                                loading={loading}
                                onClick={this.handleOk}
                                style={{
                                    marginLeft: "10px"
                                }}
                                >
                                Search on Google
                                </Button>,
                            ]}
                            >
                            <div>
                                <Button>自建题目</Button>
                                <Button>题库搜索</Button>
                            </div>
                            <div>
                                <div>
                                    <Dropdown overlay={menu}>
                                        <Button className="ant-dropdown-link">
                                        { this.state.defaultquestion } <DownOutlined />
                                        </Button>
                                    </Dropdown>
                                </div>
                                <div>
                                    <div className="single" style={{display: this.state.defaultquestion === "单选题" ? "block" : "none"}}>
                                        <Form>
                                            <Form.Item
                                                name="singeTitle"
                                                label="题目"
                                                rules={[{ required: true, message: 'Please input your password!' }]}
                                            >
                                                <Input placeholder="题目" onChange={(e) => this.handleTitleChange(e)}/>
                                            </Form.Item>
                                            <Form.Item
                                                name="singeOption"
                                                label="选项"
                                                rules={[{ required: true, message: 'Please input your password!' }]}
                                                style={{fontFamily:"monospace"}}
                                            >
                                                {
                                                    [...Array(this.state.optiondefault)].map((el,i) => {
                                                        return(
                                                            <Input addonBefore={String.fromCharCode(65 + i*1)} id={"singleoption" + i} key={"singleoption" + i} onChange={(e) => this.handleOptionChange(e)}/>
                                                        )
                                                    })
                                                }
                                                <Button onClick={() => {let od = this.state.optiondefault; if(od > 8){od=8} ; this.setState({optiondefault: ++od})}}>点击增加</Button>
                                                <Button onClick={() => {let od = this.state.optiondefault; if(od < 1){od=1}; this.setState({optiondefault: --od})}}>点击减少</Button>
                                            </Form.Item>
                                            <Form.Item
                                                name="singeAnswer"
                                                label="答案"
                                                rules={[{required: true}]}
                                            >
                                                <Radio.Group onChange={(e) => this.handleValueClick(e)}>
                                                {
                                                    [...Array(this.state.optiondefault)].map((el,i) => {
                                                        return(
                                                            <Radio value={String.fromCharCode(65 + i*1)}  key={"singleanswer" + i}>{String.fromCharCode(65 + i*1)}</Radio>
                                                        )
                                                    })
                                                }
                                                </Radio.Group>
                                            </Form.Item>
                                            <Form.Item
                                                name="singeAnalyze"
                                                label="解析"
                                            >
                                                <TextArea onChange={(e) => this.handleAnalyzeChange(e)}></TextArea>
                                            </Form.Item>
                                        </Form>
                                    </div>
                                    <div className="multi"></div>
                                    <div className="judge"></div>
                                    <div className="gap"></div>
                                    <div className="short"></div>
                                    <div style={{display: this.state.warning === "" ? "none" : "block", color: "red"}}>{this.state.warning}</div>
                                </div>
                            </div>
                        </Modal>
                    </Form.Item>
                    <Form.Item
                    {...formItemLayout}
                        name="paperpreview"
                        label="考卷预览"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        {...addButtonLayout}
                        name="paperaddquestion"
                    >
                        <Button  htmlType="submit" type="primary">保存</Button>
                        <Button
                            style={{
                                margin: '0 10px',
                            }}
                        >
                            提交
                        </Button>
                        <Button htmlType="reset"  type="dashed">
                            重置
                        </Button>
                    </Form.Item>
                </Form>
            </div>
      );
    }
}

export default class PublisherMod extends Component {
    render() {
        return (
            <div className="">
                    <CreateTest></CreateTest>
            </div>
        )
    }
}