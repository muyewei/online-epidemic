import React, { Component } from "react"
import { connect } from "react-redux"
import { Button } from "antd";
import "./share.css"
var ws
class share extends Component {
    writeValues = React.createRef()
    shareMainRef = React.createRef()
    state = {
        person: 0,
        notice: ["欢迎使用"],
        main: [
            {
                username: "hello",
                write: "hello123hello123hellello123hello123hello123hello123hello123hello123hello12llo123hellello123hello1llo123hellello123hello13"
            },
        ],
        entry: "hello",
        input: ""
    }
    componentDidMount() {
        ws = new WebSocket("ws://localhost:1704")
        ws.onopen = () => {
            ws.send(`user:${ this.props.user }`)
        }

        ws.onmessage = (msg) => {
            if (msg.data.indexOf("user:") === 0) {
                this.setState({entry: msg.data.split("user:")[1]})
            }
            let mdata = msg.data
            if (mdata.indexOf("username") >= 0 && mdata.indexOf("write") >= 0) {
                let mainvalue = this.state.main
                mainvalue.push(JSON.parse(msg.data))
                this.setState({ main: mainvalue })
                setTimeout(() => {
                    this.shareMainRef.current.scrollTop=this.shareMainRef.current.scrollHeight
                }, 0);
            }
            console.log(mdata)
        }

        
    }
    sendInput = () => {
        console.log('send')
        let value = {
            username: this.props.loginState.user,
            write: this.writeValues.current.value
        }
        if (this.writeValues.current.value === "") {
            return
        } else {
            this.writeValues.current.value = ""
            ws.send(JSON.stringify(value))
        }
    }
    render() {
        return (
            <div className="share">
                <div className="shareContainer">
                    <div className="share-person">疫情聊天室 ( { this.state.person } )</div>
                    <div className="share-notice">通知：{ this.state.notice[0] }</div>
                    <div className="share-main" ref={this.shareMainRef} >
                        {
                            this.state.main.map((v, i) => {
                                return (
                                    <div className={`share-main-list ${ v.username === this.props.loginState.user ? "list-to-right" : ""}`} key={i}>
                                            <span className="share-main-list-name">
                                                {v.username}：
                                            </span>
                                            <span style={{width: "100%"}}></span>
                                            <span className="share-main-list-value">
                                                {v.write}
                                            </span>
      
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="share-entry">{this.state.entry}  进入房间</div>
                    {
                        this.props.user !== "visitor" ?
                            (<div className="share-input">
                                <textarea className="share-input-area" ref={this.writeValues} autoFocus></textarea>
                                <Button type="primary" className="share-input-button" onClick={() => this.sendInput()}>发送</Button>
                            </div>)
                            : (
                                <div className="share-input">
                                    请先登录
                                </div>
                            )
                    }
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({ loginState: state.login }),
)(share)
