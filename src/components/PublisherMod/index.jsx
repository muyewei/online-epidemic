import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
// import style from './index.module.css'
import { Form, Input, Button, Select, Modal, Menu, Dropdown, Radio, Checkbox, Row, Col } from 'antd';
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
    optionlength: 4,
    option: ["","","",""],
    answer: [""],
    analyze: ""
}

const multitype = {
    title: "",
    optionlength: 4,
    option: ["","","",""],
    answer: [""],
    analyze: ""
}

const judgetype = {
    title: "",
    answer: "",
    analyze: ""
}

const gaptype = {
    title: "",
    optionlength: 1,
    option: [""],
    analyze: ""
}

const shorttype = {
    title: "",
    answer: "",
    analyze: ""
}

const {TextArea} = Input

class CreateTest extends Component{
    state = {
        loading: false,
        visible: false,
        defaultquestion: "选择题目",
        optiondefault: 0,
        optiondefaultValue: [],
        singletype: singletype,
        resetsingle: singletype,
        multitype: multitype,
        resetmulti: multitype,
        judgetype: judgetype,
        resetjudge: judgetype,
        gaptype: gaptype,
        resetgap: gaptype,
        shorttype: shorttype,
        resetshort: shorttype,
        nowqusetiontype: "",
        warning: ""
    };
    
    componentDidUpdate (preProps, preState) {
        // console.log("did update", preState, this.state)
        if(this.state.optiondefault === 1){
            let st = this.state[this.state.nowqusetiontype]
            if(st.optionlength < 9){
                st.option.push("")
                st.optionlength++
                this.setState({[this.state.nowqusetiontype]: st, optiondefault: 0})
            }
        }else if(this.state.optiondefault === 2){
            let st = this.state[this.state.nowqusetiontype]
            if(st.optionlength > 1){
                st.option.pop()
                st.optionlength--
                this.setState({[this.state.nowqusetiontype]: st, optiondefault: 0})
            }
        }
        if(preState.defaultquestion !== this.state.defaultquestion){
            if(this.state.defaultquestion === "单选题"){
                this.setState({nowqusetiontype: "singletype"})
            }else if(this.state.defaultquestion === "多选题"){
                this.setState({nowqusetiontype: "multitype"})
            }else if(this.state.defaultquestion === "判断题"){
                this.setState({nowqusetiontype: "judgetype"})
            }else if(this.state.defaultquestion === "填空题"){
                this.setState({nowqusetiontype: "gaptype"})
            }else if(this.state.defaultquestion === "简答题"){
                this.setState({nowqusetiontype: "shorttype"})
            }
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
        let st = this.state[this.state.nowqusetiontype]
        if(st.title === ""){
            warningsingle += "题目 · "
        }
        if(this.state.nowqusetiontype === "singletype" || this.state.nowqusetiontype === "multitype" || this.state.nowqusetiontype === "gaptype"){
            for (let index = 0; index < st.option.length; index++) {
                const element = st.option[index];
                if(element === ""){
                    warningsingle += "选项 · "
                }
                break
            }
            if(this.state.nowqusetiontype !== "gaptype"){
                for (let index = 0; index < st.answer.length; index++) {
                    const element = st.answer[index];
                    if(element === ""){
                        warningsingle += "答案 · "
                    }
                    break
                }
            }
        }
        if(this.state.nowqusetiontype === "judgetype" || this.state.nowqusetiontype === "shorttype"){
            if(st.answer === ""){
                warningsingle += "答案 · "
            }
        }
        
        if(warningsingle !== ""){
            warningsingle += "不能为空"
        }
        console.log("okokok submit: ", this.state.nowqusetiontype, this.state[this.state.nowqusetiontype])
        this.setState({warning: warningsingle})
    };

    handleCancel = () => {
        this.setState({ visible: false });
    };

    handleMenuClick = (item) =>{
        console.log("menu click next qustion type", item.domEvent.target.innerText)
        console.log("menu click pre qustion type", this.state.nowqusetiontype)
        console.log("menu click pre qustio value", this.state[this.state.nowqusetiontype])
        this.setState({defaultquestion: item.domEvent.target.innerText})
    }
    //当问题标题更改时触发次函数
    handleTitleChange = (e) => {
        // console.log("title value:", e.target.value)
        let st = this.state[this.state.nowqusetiontype]
        st.title = e.target.value
        this.setState({[this.state.nowqusetiontype]: st})
    }
    //当选项的答案更改时触发此函数
    handleValueClick = (e) =>{
        console.log("menu value:", e)
        let st = this.state[this.state.nowqusetiontype]
        if(this.state.nowqusetiontype === "singletype" || this.state.nowqusetiontype === "judgetype" || this.state.nowqusetiontype === "shorttype"){
            st.answer = e.target.value
        }else if(this.state.nowqusetiontype === "multitype"){
            st.answer = e
        }
       
        this.setState({[this.state.nowqusetiontype]: st})
    }
    //当选项的各项的值改变的时候触发此函数
    handleOptionChange = (e) => {
        // console.log("Option value:", e)
        let st = this.state[this.state.nowqusetiontype]
        if(this.state.nowqusetiontype === "singletype"){
            let num = e.target.id.split("singleoption")[1]
            st.option[Number(num)] = e.target.value
        }else if(this.state.nowqusetiontype === "multitype"){
            let num = e.target.id.split("multioption")[1]
            st.option[Number(num)] = e.target.value
        }else if(this.state.nowqusetiontype === "gaptype"){
            let num = e.target.id.split("gapoption")[1]
            st.option[Number(num)] = e.target.value
        }
        this.setState({[this.state.nowqusetiontype]: st})
    }
    //当选项的解析改变的时候触发此函数
    handleAnalyzeChange = (e) => {
        // console.log("Option value:", e)
        let st = this.state[this.state.nowqusetiontype]
        st.analyze = e.target.value
        this.setState({[this.state.nowqusetiontype]: st})
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
                                                <TextArea placeholder="题目" onChange={(e) => this.handleTitleChange(e)}/>
                                            </Form.Item>
                                            <Form.Item
                                                label="选项"
                                                rules={[{ required: true, message: 'Please input your password!' }]}
                                                style={{fontFamily:"monospace"}}
                                                >
                                                <Form.Item
                                                    name="singeOption"
                                                >
                                                    {
                                                        [...Array(this.state.singletype.optionlength)].map((el,i) => {
                                                            return(
                                                                <Input addonBefore={String.fromCharCode(65 + i*1)} id={"singleoption" + i} key={"singleoption" + i} onChange={(e) => this.handleOptionChange(e)}/>
                                                            )
                                                        })
                                                    }
                                                </Form.Item>
                                                <Button onClick={() => {this.setState({optiondefault: 1})}}>点击增加</Button>
                                                <Button onClick={() => {this.setState({optiondefault: 2})}}>点击减少</Button>
                                            </Form.Item>
                                            <Form.Item
                                                name="singeAnswer"
                                                label="答案"
                                                rules={[{required: true}]}
                                            >
                                                <Radio.Group onChange={(e) => this.handleValueClick(e)}>
                                                {
                                                    [...Array(this.state.singletype.optionlength)].map((el,i) => {
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
                                    <div className="multi"  style={{display: this.state.defaultquestion === "多选题" ? "block" : "none"}}>
                                        <Form>
                                            <Form.Item
                                                name="multiTitle"
                                                label="题目"
                                                rules={[{ required: true, message: 'Please input your password!' }]}
                                            >
                                                <TextArea placeholder="题目" onChange={(e) => this.handleTitleChange(e)}/>
                                            </Form.Item>
                                            <Form.Item
                                                label="选项"
                                                name="multiOption"
                                                rules={[{ required: true, message: 'Please input your password!' }]}
                                                style={{fontFamily:"monospace"}}
                                            >
                                                    {
                                                        [...Array(this.state.multitype.optionlength)].map((el,i) => {
                                                            return(
                                                                <Input addonBefore={String.fromCharCode(65 + i*1)} id={"multioption" + i} key={"multioption" + i} onChange={(e) => this.handleOptionChange(e)}/>
                                                            )
                                                        })
                                                    }
                                                <Button onClick={() => {this.setState({optiondefault: 1})}}>点击增加</Button>
                                                <Button onClick={() => {this.setState({optiondefault: 2})}}>点击减少</Button>
                                            </Form.Item>
                                            <Form.Item
                                                name="multiAnswer"
                                                label="答案"
                                                rules={[{required: true}]}
                                            >
                                                <Checkbox.Group style={{ width: '100%' }} onChange={(e) => this.handleValueClick(e)}>
                                                    <Row>
                                                    {
                                                        [...Array(this.state.multitype.optionlength)].map((el,i) => {
                                                            return(
                                                                <Col span={4}  key={"multianswer" + i}>
                                                                    <Checkbox value={String.fromCharCode(65 + i*1)}>{String.fromCharCode(65 + i*1)}</Checkbox>
                                                                </Col>
                                                            )
                                                        })
                                                    }
                                                    </Row>
                                                </Checkbox.Group>
                                            </Form.Item>
                                            <Form.Item
                                                name="multiAnalyze"
                                                label="解析"
                                            >
                                                <TextArea onChange={(e) => this.handleAnalyzeChange(e)}></TextArea>
                                            </Form.Item>
                                        </Form>
                                    </div>
                                    <div className="judge"  style={{display: this.state.defaultquestion === "判断题" ? "block" : "none"}}>
                                        <Form>
                                            <Form.Item
                                                name="judgeTitle"
                                                label="题目"
                                                rules={[{ required: true, message: 'Please input your password!' }]}
                                            >
                                                <Input placeholder="题目" onChange={(e) => this.handleTitleChange(e)}/>
                                            </Form.Item>
                                            <Form.Item
                                                name="judgeAnswer"
                                                label="答案"
                                                rules={[{required: true}]}
                                            >
                                                <Radio.Group onChange={(e) => this.handleValueClick(e)}>
                                                    <Radio value={"judgeTrue"}  key={"judgeAnswerTrue"}>√</Radio>
                                                    <Radio value={"judgeFalse"}  key={"judgeAnswerFalse"}>×</Radio>
                                                </Radio.Group>
                                            </Form.Item>
                                            <Form.Item
                                                name="judgeAnalyze"
                                                label="解析"
                                            >
                                                <TextArea onChange={(e) => this.handleAnalyzeChange(e)}></TextArea>
                                            </Form.Item>
                                        </Form>
                                    </div>
                                    <div className="gap"  style={{display: this.state.defaultquestion === "填空题" ? "block" : "none"}}>
                                        <Form>
                                            <Form.Item
                                                name="gapTitle"
                                                label="题目"
                                                rules={[{ required: true, message: 'Please input your password!' }]}
                                            >
                                                <TextArea placeholder="题目" onChange={(e) => this.handleTitleChange(e)}/>
                                            </Form.Item>
                                            <Form.Item
                                                label="选项"
                                                name="gapOption"
                                                rules={[{ required: true, message: 'Please input your password!' }]}
                                                style={{fontFamily:"monospace"}}
                                            >
                                                    {
                                                        [...Array(this.state.gaptype.optionlength)].map((el,i) => {
                                                            return(
                                                                <Input addonBefore={String.fromCharCode(65 + i*1)} id={"gapoption" + i} key={"gapoption" + i} onChange={(e) => this.handleOptionChange(e)}/>
                                                            )
                                                        })
                                                    }
                                                <Button onClick={() => {this.setState({optiondefault: 1})}}>点击增加</Button>
                                                <Button onClick={() => {this.setState({optiondefault: 2})}}>点击减少</Button>
                                            </Form.Item>
                                            <Form.Item
                                                name="gapAnalyze"
                                                label="解析"
                                            >
                                                <TextArea onChange={(e) => this.handleAnalyzeChange(e)}></TextArea>
                                            </Form.Item>
                                        </Form>
                                    </div>
                                    <div className="short"  style={{display: this.state.defaultquestion === "简答题" ? "block" : "none"}}>
                                    <Form>
                                            <Form.Item
                                                name="gapTitle"
                                                label="题目"
                                                rules={[{ required: true}]}
                                            >
                                                <TextArea placeholder="题目" onChange={(e) => this.handleTitleChange(e)}/>
                                            </Form.Item>
                                            <Form.Item
                                                label="答案"
                                                name="shortOption"
                                                rules={[{ required: true, message: 'Please input your password!' }]}
                                                style={{fontFamily:"monospace"}}
                                            >
                                                <TextArea onChange={(e) => this.handleValueClick(e)}></TextArea>
                                            </Form.Item>
                                            <Form.Item
                                                name="gapAnalyze"
                                                label="解析"
                                            >
                                                <TextArea onChange={(e) => this.handleAnalyzeChange(e)}></TextArea>
                                            </Form.Item>
                                        </Form>
                                    </div>
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
                    <CreateTest key="createTest"></CreateTest>
            </div>
        )
    }
}