import React, { Component } from "react"
import style from "./index.module.css"
import { Radio, Checkbox, Row, Col,Input, Button } from "antd"

let countdownlimit

export default class Papertest extends Component {
    state = {
        papername: "",
        usepapertest: [],
        answer: [],
        limittime: "",
        countdown: "00:00",
        testing: true,
        hasclick: false
    }
    componentDidMount() {
        // console.log("papertest props: ",this.props)
        this.axios.get("/users/normal/getpapertest?paperno="+this.props.paperno)
            .then(res => {
                let v = res.data.papervalue.slice(1, -1).split("},")
                let data = []
                for (let i in v) {
                    if (i * 1 + 1 === v.length) {
                        data.push(JSON.parse(v[i]))
                    } else {
                        data.push(JSON.parse(v[i] + "}"))
                    }
                }
                this.setState({ usepapertest: data, papername: res.data.papername,limittime: res.data.papertime })
            })
            countdownlimit = setInterval(()=>{
            let countdown = this.state.countdown.split(":")
            countdown[1] = countdown[1]*1 + 1
            if(countdown[1] < 10){
                countdown[1] = "0"+countdown[1]
            }else{
                countdown[1] = "" +countdown[1]
            }
            if(countdown[1] === "60"){
                countdown[0] = countdown[0]*1 + 1
                countdown[1] = "00"
            }
            countdown[0] = countdown[0]*1
            if(countdown[0] < 10){
                countdown[0] = "0"+countdown[0]
            }else if(countdown[0] === this.state.limittime){
                this.submitpaper()
            }else{
                countdown[0] = "" +countdown[0]
            }
            this.setState({countdown: countdown.join(":")})
        },1000)
    }
    onSingleChange = (e, i) => {
        let { answer } = this.state
        answer[i] = e.target.value
        this.setState({ answer })
    }
    onMultiChange = (value, i) => {
        let { answer } = this.state
        answer[i] = value
        this.setState({ answer })
    }
    onJudgeChange = (e, i) => {
        let { answer } = this.state
        answer[i] = e.target.value
        this.setState({ answer })
    }
    onTextareaChange = (e, i) => {
        let { answer } = this.state
        answer[i] = e.target.value
        this.setState({ answer })
    }
    submitpaper = () =>{
        console.log("submitpaper: ",this.state.answer)
        this.setState({testing: false,hasclick: true})
        clearInterval(countdownlimit)
        this.axios.post("/users/normal/submitpapertest",
        {
            answer: this.state.answer,
            paperno: this.props.paperno,
            papername: this.state.papername,
            timecosume: this.state.countdown,
            user_account: this.props.username
        })
        .then((res)=>{

        })
    }
    resetpaper = () =>{
        console.log("resetpaper")
        this.setState({answer: [""]})
    }
    gobackweb = () =>{
        // console.log("gobackweb",this.props)
        this.props.gobackmod()
    }
    render() {
        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
        };
        const {TextArea} = Input
        return (
            <div className={style["papertest"]}>
                <div className={style["papertest-container"]}>
                    <div className={style["papertest-top"]}>
                        <h1>{this.state.papername}</h1>
                        <div>限时：{this.state.limittime === "" ? "无":this.state.limittime+"分钟"}   倒计时：{this.state.limittime === "" ? "无":this.state.countdown+"分钟"}</div>
                    </div>
                    <div className={style["papertest-main"]}>
                        {
                            this.state.usepapertest.map((ele, i) => {
                                return (
                                    <div className={style["paperTestQustion"]} key={"paperTest" + i}>
                                        <div className={style["paperTestBlock"]}>
                                            <div>问题{i * 1 + 1}：{ele.title}（{ele.type === "singletype" ? "单选题" : ""}
                                                {ele.type === "multitype" ? "多选题" : ""}
                                                {ele.type === "judgetype" ? "判断题" : ""}
                                                {ele.type === "gaptype" ? "填空题" : ""}
                                                {ele.type === "shorttype" ? "简答题" : ""}）</div>
                                        </div>
                                        {
                                            ele.type === "singletype" ?
                                                (<div className={style["paperTestBlock"]}>
                                                    <div>选项：</div>
                                                    <div>
                                                        <Radio.Group onChange={(e) => this.onSingleChange(e, i)} value={this.state.answer[i]}>
                                                            {ele.option.map((el, i) => { return (<Radio style={radioStyle} value={String.fromCharCode(65 + i * 1)} key={i}>{String.fromCharCode(65 + i * 1) + "：" + el}</Radio>) })}
                                                        </Radio.Group>
                                                    </div>
                                                </div>)
                                                : ""
                                        }
                                        {
                                            ele.type === "multitype" ?
                                                (
                                                    <div className={style["paperTestBlock"]}>
                                                        <div>选项：</div>
                                                        <div>
                                                            <Checkbox.Group style={{ width: '100%' }} onChange={(value) => this.onMultiChange(value, i)}>
                                                                {ele.option.map((el, i) => {
                                                                    return (<Row key={"multi"+i}>
                                                                        <Col style={{ display: "block" }}>
                                                                            <Checkbox value={String.fromCharCode(65 + i * 1)}>{String.fromCharCode(65 + i * 1) + "：" + el}</Checkbox>
                                                                        </Col></Row>
                                                                    )
                                                                })
                                                                }
                                                            </Checkbox.Group>
                                                        </div>
                                                    </div>

                                                ) : ""
                                        }
                                        {
                                            ele.type === "judgetype" ? 
                                            (
                                                <div className={style["paperTestBlock"]}>
                                                    <div>选项：</div>
                                                    <div>
                                                        <Radio.Group onChange={(e) => this.onJudgeChange(e, i)} value={this.state.answer[i]}>
                                                            <Radio style={radioStyle} value="对">√</Radio>
                                                            <Radio style={radioStyle} value="错">×</Radio>
                                                        </Radio.Group>
                                                    </div>
                                                </div>
                                            ):""
                                        }
                                        {
                                            (ele.type === "gaptype" || ele.type === "shorttype") ?
                                            (
                                                <div className={style["paperTestBlock"]}>
                                                    <div>回答：</div>
                                                    <div>
                                                        <TextArea rows={4} cols={33} showCount  maxLength={100} onChange={(e) => this.onTextareaChange(e,i)}></TextArea>
                                                    </div>
                                                </div>
                                            ): ""
                                        }
                                        <div className={style["paperTestBlock"]} style={{ display: this.state.testing === true ? "none" : "block" }}>
                                            <div>答案：</div>
                                            {
                                                ele.type !== "gaptype"
                                                    ? (<div>{ele.answer}</div>)
                                                    : (<div>
                                                        {ele.option.map((el, i) => { return (<p key={i}>{String.fromCharCode(65 + i * 1) + "：" + el}</p>) })}
                                                    </div>)
                                            }
                                        </div>
                                        <div className={style["paperTestBlock"]} style={{ display: this.state.testing === true ? "none" : "block" }}>
                                            <div>解析：</div>
                                            <div>{ele.analyze}</div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className={style["papertest-bot"]}>
                        <Button onClick={() => this.submitpaper()} disabled={this.state.hasclick}>提交</Button>
                        <Button onClick={() => this.resetpaper()}>重置</Button>
                        <Button onClick={() => this.gobackweb()}>返回</Button>
                    </div>
                </div>
            </div>
        )
    }
}