import React, { Component } from "react"
import style from "./index.module.css"
import { Form, Input, Button, Dropdown, Menu, Radio, Checkbox, Row, Col } from 'antd';
import { UserOutlined, DownOutlined } from '@ant-design/icons';

const singletype = {
    type: "singletype",
    title: "",
    optionlength: 4,
    option: ["","","",""],
    answer: [""],
    analyze: ""
}

const multitype = {
    type: "multitype",
    title: "",
    optionlength: 4,
    option: ["","","",""],
    answer: [""],
    analyze: ""
}

const judgetype = {
    type: "judgetype",
    title: "",
    answer: "",
    analyze: ""
}

const gaptype = {
    type: "gaptype",
    title: "",
    optionlength: 1,
    option: [""],
    analyze: ""
}

const shorttype = {
    type: "shorttype",
    title: "",
    answer: "",
    analyze: ""
}

const {TextArea} = Input


export default class Createquestion extends Component {

    questionSubjectRef = React.createRef()
    singletypeRef = React.createRef()
    multitypeRef = React.createRef()
    judgetypeRef = React.createRef()
    gaptypeRef = React.createRef()
    shorttypeRef = React.createRef()

    state = {
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
        // console.log("menu value:", e)
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

    componentDidMount(){
        // console.log("Createquestion mount: ", this.props)
        this.axios.get("/users/question/getquestion?questionno="+this.props.questionno)
        .then(res=>{
            // console.log(res.data)
            // let type = res.data[0].papertype === "singletype" ? "单选题" :
            // res.data[0].papertype === "muilttype" ? "多选题" :
            // res.data[0].papertype === "judgetype" ? "判断题" :
            // res.data[0].papertype === "gaptype" ? "填空题" :
            // res.data[0].papertype === "shorttype" ? "简答题" : ""
            // this[res.data[0].papertype+"Ref"].current.setFieldsValue(JSON.parse(res.data[0].value))
            // this.setState({defaultquestion: type,[res.data[0].type]: JSON.parse(res.data[0].value)})
        })
    }
    
    componentDidUpdate (preProps, preState) {
        // console.log("createquestion update: ", this.props)
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

    handleOk = () => {
        if(this.state.nowqusetiontype === ""){
            console.log(this.questionSubjectRef.current.input.value)
            alert("请先选择题目")
            return
        }
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
        console.log("okokok submit: ", this.state.nowqusetiontype, this.state[this.state.nowqusetiontype],this.questionSubjectRef.current.input.value,this.props.account)
        this.axios.post("/users/question/uploadQuestion",{
            title: this.state[this.state.nowqusetiontype].title,
            type: this.state.nowqusetiontype,
            value: JSON.stringify(this.state[this.state.nowqusetiontype]),
            subject: this.questionSubjectRef.current.input.value,
            user_acconut: this.props.username
        }).then((res)=>{
            console.log(res.data[0])
        })
        this.setState({warning: warningsingle})
    };
    render() {
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
            <div className={style["createquestion"]}>
                <div style={{padding:"10px"}}>
                    <div>
                        <Dropdown overlay={menu}>
                            <Button className="ant-dropdown-link">
                                {this.state.defaultquestion} <DownOutlined />
                            </Button>
                        </Dropdown>
                        <br/>
                        <Input addonBefore="类型" style={{width: "150px"}} ref={ this.questionSubjectRef }/>
                    </div>
                    <div>
                        <div className="single" style={{ display: this.state.defaultquestion === "单选题" ? "block" : "none" }}>
                            <Form
                            ref={this.singletypeRef}
                            >
                                <Form.Item
                                    name="singeTitle"
                                    label="题目"
                                    rules={[{ required: true, message: 'Please input your password!' }]}
                                >
                                    <TextArea placeholder="题目" onChange={(e) => this.handleTitleChange(e)} />
                                </Form.Item>
                                <Form.Item
                                    label="选项"
                                    rules={[{ required: true, message: 'Please input your password!' }]}
                                    style={{ fontFamily: "monospace" }}
                                >
                                    <Form.Item
                                        name="singeOption"
                                    >
                                        {
                                            [...Array(this.state.singletype.optionlength)].map((el, i) => {
                                                return (
                                                    <Input addonBefore={String.fromCharCode(65 + i * 1)} id={"singleoption" + i} key={"singleoption" + i} onChange={(e) => this.handleOptionChange(e)} />
                                                )
                                            })
                                        }
                                    </Form.Item>
                                    <Button onClick={() => { this.setState({ optiondefault: 1 }) }}>点击增加</Button>
                                    <Button onClick={() => { this.setState({ optiondefault: 2 }) }}>点击减少</Button>
                                </Form.Item>
                                <Form.Item
                                    name="singeAnswer"
                                    label="答案"
                                    rules={[{ required: true }]}
                                >
                                    <Radio.Group onChange={(e) => this.handleValueClick(e)}>
                                        {
                                            [...Array(this.state.singletype.optionlength)].map((el, i) => {
                                                return (
                                                    <Radio value={String.fromCharCode(65 + i * 1)} key={"singleanswer" + i}>{String.fromCharCode(65 + i * 1)}</Radio>
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
                        <div className="multi" style={{ display: this.state.defaultquestion === "多选题" ? "block" : "none" }}>
                            <Form
                            ref={this.multitypeRef}
                            >
                                <Form.Item
                                    name="multiTitle"
                                    label="题目"
                                    rules={[{ required: true, message: 'Please input your password!' }]}
                                >
                                    <TextArea placeholder="题目" onChange={(e) => this.handleTitleChange(e)} />
                                </Form.Item>
                                <Form.Item
                                    label="选项"
                                    // name="multiOption"
                                    rules={[{ required: true, message: 'Please input your password!' }]}
                                    style={{ fontFamily: "monospace" }}
                                >
                                    {
                                        [...Array(this.state.multitype.optionlength)].map((el, i) => {
                                            return (
                                                <Input addonBefore={String.fromCharCode(65 + i * 1)} id={"multioption" + i} key={"multioption" + i} onChange={(e) => this.handleOptionChange(e)} />
                                            )
                                        })
                                    }
                                    <Button onClick={() => { this.setState({ optiondefault: 1 }) }}>点击增加</Button>
                                    <Button onClick={() => { this.setState({ optiondefault: 2 }) }}>点击减少</Button>
                                </Form.Item>
                                <Form.Item
                                    name="multiAnswer"
                                    label="答案"
                                    rules={[{ required: true }]}
                                >
                                    <Checkbox.Group style={{ width: '100%' }} onChange={(e) => this.handleValueClick(e)}>
                                        <Row>
                                            {
                                                [...Array(this.state.multitype.optionlength)].map((el, i) => {
                                                    return (
                                                        <Col span={4} key={"multianswer" + i}>
                                                            <Checkbox value={String.fromCharCode(65 + i * 1)}>{String.fromCharCode(65 + i * 1)}</Checkbox>
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
                        <div className="judge" style={{ display: this.state.defaultquestion === "判断题" ? "block" : "none" }}>
                            <Form
                            ref={this.judgetypeRef}
                            >
                                <Form.Item
                                    name="judgeTitle"
                                    label="题目"
                                    rules={[{ required: true, message: 'Please input your password!' }]}
                                >
                                    <Input placeholder="题目" onChange={(e) => this.handleTitleChange(e)} />
                                </Form.Item>
                                <Form.Item
                                    name="judgeAnswer"
                                    label="答案"
                                    rules={[{ required: true }]}
                                >
                                    <Radio.Group onChange={(e) => this.handleValueClick(e)}>
                                        <Radio value={"√"} key={"judgeAnswerTrue"}>√</Radio>
                                        <Radio value={"×"} key={"judgeAnswerFalse"}>×</Radio>
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
                        <div className="gap" style={{ display: this.state.defaultquestion === "填空题" ? "block" : "none" }}>
                            <Form
                            ref={this.gaptypeRef}
                            >
                                <Form.Item
                                    name="gapTitle"
                                    label="题目"
                                    rules={[{ required: true, message: 'Please input your password!' }]}
                                >
                                    <TextArea placeholder="题目" onChange={(e) => this.handleTitleChange(e)} />
                                </Form.Item>
                                <Form.Item
                                    label="答案"
                                    // name="gapOption"
                                    rules={[{ required: true, message: 'Please input your password!' }]}
                                    style={{ fontFamily: "monospace" }}
                                >
                                    {
                                        [...Array(this.state.gaptype.optionlength)].map((el, i) => {
                                            return (
                                                <Input addonBefore={String.fromCharCode(65 + i * 1)} id={"gapoption" + i} key={"gapoption" + i} onChange={(e) => this.handleOptionChange(e)} />
                                            )
                                        })
                                    }
                                    <Button onClick={() => { this.setState({ optiondefault: 1 }) }}>点击增加</Button>
                                    <Button onClick={() => { this.setState({ optiondefault: 2 }) }}>点击减少</Button>
                                </Form.Item>
                                <Form.Item
                                    name="gapAnalyze"
                                    label="解析"
                                >
                                    <TextArea onChange={(e) => this.handleAnalyzeChange(e)}></TextArea>
                                </Form.Item>
                            </Form>
                        </div>
                        <div className="short" style={{ display: this.state.defaultquestion === "简答题" ? "block" : "none" }}>
                            <Form
                                ref={this.shorttypeRef}
                            >
                                <Form.Item
                                    name="shortTitle"
                                    label="题目"
                                    rules={[{ required: true }]}
                                >
                                    <TextArea placeholder="题目" onChange={(e) => this.handleTitleChange(e)} />
                                </Form.Item>
                                <Form.Item
                                    label="答案"
                                    name="shortOption"
                                    rules={[{ required: true, message: 'Please input your password!' }]}
                                    style={{ fontFamily: "monospace" }}
                                >
                                    <TextArea onChange={(e) => this.handleValueClick(e)}></TextArea>
                                </Form.Item>
                                <Form.Item
                                    name="shortAnalyze"
                                    label="解析"
                                >
                                    <TextArea onChange={(e) => this.handleAnalyzeChange(e)}></TextArea>
                                </Form.Item>
                            </Form>
                        </div>
                        <div><Button onClick={() => this.handleOk()}>提交</Button></div>
                        <div style={{ display: this.state.warning === "" ? "none" : "block", color: "red" }}>{this.state.warning}</div>
                    </div>
                </div>
            </div>
        )
    }
}