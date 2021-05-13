import React, { Component } from "react"
import { connect } from "react-redux"
import { Affix, Carousel, message, Image, Pagination, Divider, Modal, Input } from "antd"
import { LikeOutlined } from '@ant-design/icons';
import MarkdownIt from "markdown-it"
import MdEditor from "react-markdown-editor-lite"
import "react-markdown-editor-lite/lib/index.css";
import "./share.css"


const mdParser = new MarkdownIt();
class share extends Component {
    feedbackref = React.createRef()
    state = {
        extension: [],
        notice: [],
        noticeshow: 0,
        noticelength: 0,
        letterno: 0,
        letterdetails: {},
        headportrait: "",
        newletter: [
            {
                useraccouunt:"123",
                brief: "123",
                title: "123",
                type: "123123,1235456,asdqwe",
                likes: 12,
                comments: 20,
                cover: ""
            }
        ],
        hotletterlist: [],
        fileslist: [
            {
                name: "文件1",
                fileno: "fileno"
            },
            {
                name: "文件2",
                fileno: "fileno"
            }
        ],
        relatedlinks: [
            {
                linkname: "百度",
                linkpath: "https://www.baidu.com"
            },
            {
                linkname: "哔哩哔哩动画",
                linkpath: "https://www.bilibili.com"
            }
        ],
        liked: false,
        feedback: false
    }
    componentDidMount() {
        this.axios.get("/users/admin/getextension")
            .then((result) => {
                if (result.data.msg === "error") {
                    message.info("获取信息失败")
                } else if (result.data.msg === "success") {
                    message.info("获取信息成功")
                    this.setState({ extension: result.data.data })
                }
            })
        this.axios.get("/users/admin/getnotice")
            .then((result) => {
                if (result.data.msg === "error") {
                    message.info("获取信息失败")
                } else if (result.data.msg === "success") {
                    message.info("获取信息成功")
                    this.setState({ notice: result.data.data, noticelength: result.data.data.length, noticeshow: 0 })
                    setTimeout(()=>{
                        setInterval(()=>{
                            if(this.state.noticeshow + 1 === this.state.noticelength){
                                this.setState({noticeshow: 0})
                            }else{
                                this.setState({noticeshow: this.state.noticeshow + 1})
                            }
                        },5000)
                    },15000)
                }
            })
        this.axios.get("/users/paper/getletterlist?page=1")
            .then((result) => {
                this.setState({newletter: result.data.letterlist})
            })
        this.axios.get("/users/paper/gethotletter")
        .then((result)=>{
            this.setState({hotletterlist:result.data.data})
        })
        this.axios.get("/users/admin/getrelatedlinks")
        .then(res=>{
            this.setState({relatedlinks: res.data})
        })
        this.axios.get("/users/admin/getfiles")
        .then(res=>{
            this.setState({fileslist: res.data})
        })
    }

    getletterlist = (page) => {
        this.axios.get("/users/paper/getletterlist?page="+page)
        .then((result) => {
            this.setState({newletter: result.data.letterlist})
        })
    }
    readletter = (no) => {
        this.setState({letterno: no})
        if(no!==0){
            this.axios.get("/users/paper/getletterdetails?letterno="+no)
            .then(res=>{
                console.log(res.data)
                this.setState({letterdetails: res.data.letterdetails,headportrait: res.data.headportrait.headportrait})
            })
        }else{
            this.setState({liked:false})
        }
    }
    addlike = (likes)=>{
        if(!this.state.liked){
            this.setState({liked: true})
            this.axios.get("/users/paper/addletterlike?letterno="+this.state.letterno+"&likes="+likes)
            .then(res=>{
                console.log("success")
            })
        }else{
        }
    }
    addfeedback = () => {
        this.setState({feedback: true})
    }
    uploadfeedback = () =>{
        if(!this.feedbackref.current.input.value){
            return
        }
        this.axios.get("/users/account/uploadfeedback?feedback="+this.feedbackref.current.input.value)
        .then(res=>{
            if(res.data.state === "fail"){
                message.error("提交失败")
            }else if(res.data.state === "success"){
                message.success("提交成功")
                this.setState({feedback: false})
            }
        })
    }
    render() {
        const extensionStyle = {
            height: "100%",
            width: "100%",
            position: "relative"
        }
        const extensionWordStyle = {
            width: "100%",
            position: "absolute",
            top: "0px"
        }
        return (
            <div className="share-main">
                <div className="share-main-left" style={{display: this.state.letterno === 0 ? "block":"none"}}>
                    <div className="share-main-left-extension">
                        <Carousel>
                            {
                                this.state.extension.map((ele, i) => {
                                    return (
                                        <div
                                            key={"ext"+i}
                                            style={extensionStyle}
                                            className="extension"
                                        >
                                            {
                                                ele.picturelink ?
                                                    (
                                                        <a href={ele.picturelink} target="_blank" rel="noreferrer" style={{display: "block",margin: "0",lineHeight: "0"}}>
                                                            <Image
                                                                height={300}
                                                                src={ele.picturepath}
                                                                preview={false}
                                                            />
                                                        </a>
                                                    ) :
                                                    (
                                                        <Image
                                                            height={300}
                                                            src={ele.picturepath}
                                                            preview={false}
                                                        />
                                                    )
                                            }
                                            {
                                                ele.word ?
                                                (
                                                    <div
                                                     style={extensionWordStyle}
                                                     className="extensionword"
                                                    >
                                                        {ele.word}
                                                    </div>
                                                ):
                                                ""
                                            }
                                        </div>
                                    )
                                })
                            }
                        </Carousel>
                    </div>
                    <div className="share-main-left-notice">
                        <div>通知：</div>
                        <div>
                            <ul>
                                {
                                    this.state.notice.map((ele,i)=>{
                                        return(
                                            <li key={"n"+i} style={{display: this.state.noticeshow === i ? "block" : "none",textOverflow: "ellipsis"}}>
                                                <span className="noticespan">{ele.word}</span>
                                                
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                        <div>
                            {this.state.noticeshow + 1} / {this.state.noticelength}
                        </div>
                    </div>
                    <div className="share-main-left-letter">
                        <div>
                            <ul className="share-main-left-letter-nav">
                                <li className="mainletterli">最新文章</li>
                            </ul>
                        </div>
                        <div>
                            <ul className="share-main-left-letter-main">
                                {
                                    this.state.newletter.map((e,i) => {
                                        return (
                                            <li className="nl-li" key={"nl"+i}>
                                                <div className="nl-li-title" onClick={()=>this.readletter(e.letterno)}>
                                                    {e.title}
                                                </div>
                                                <div className="nl-li-brief">
                                                    {
                                                        !e.cover ? "" :
                                                        (
                                                            <div className="nl-li-brief-pic">
                                                                <img alt="图片" src={e.cover} width={200} height={150}/>
                                                            </div>
                                                        )
                                                    }
                                                    <div className="nl-li-brief-word" style={{padding: "20px"}}>{e.brief}</div>
                                                </div>
                                                <div className="nl-li-type">
                                                    {e.type.slice(1,-1).split(",").map((etype,i)=>{
                                                        return (
                                                            <span key={"nlt"+i}>
                                                                {"#"+etype.slice(1,-1)}
                                                            </span>
                                                        )
                                                    })}
                                                </div>
                                                <div className="nl-li-details">
                                                    <span>点赞({e.likes})</span>
                                                </div>
                                            </li>
                                        )

                                    })
                                }
                            </ul>
                        </div>
                        <div>
                            <Pagination defaultCurrent={1} total={50} />
                        </div>
                    </div>
                </div>
                <div className="share-main-left" style={{display: this.state.letterno === 0 ? "none":"block"}}>
                    <div onClick={()=>this.readletter(0)} style={{padding: "10px",backgroundColor:"white",cursor:"pointer"}}>返回</div>
                    <div className="share-main-left-letterno">
                        <div className="share-main-left-letterno-user">
                            <div>
                                <Image
                                width={100}
                                height={100}
                                    src={this.state.headportrait}
                                />
                            </div>
                            <div>
                                {this.state.letterdetails.useraccount}
                            </div>
                        </div>
                        <div className="share-main-left-letterno-main">
                            <div>
                                <p>{this.state.letterdetails.title}</p>
                                <p>{this.state.letterdetails.letterdate}</p>
                            </div>
                            <Divider style={{ borderWidth: 2}} />
                            <div>
                                <MdEditor
                                    value={this.state.letterdetails.letter}
                                    style={{minHeight: "400px"}}
                                    readOnly
                                    renderHTML={(text) => mdParser.render(text)}
                                    view={{ menu: false, md: false, html: true }}
                                />
                            </div>
                            <div style={{padding: "20px",fontSize:"20px",color:"rgb(90,160,233)"}}>
                                <p>标签&gt;&gt;{this.state.letterdetails.type ? (<>{this.state.letterdetails.type.slice(1,-1)}</>) : ""}</p>
                            </div>
                        </div>
                        <div className="share-main-left-letterno-like">
                            <div onClick={()=>this.addlike(this.state.letterdetails.likes+1)} style={{backgroundColor: this.state.liked ? "yellow":"white"}}>
                                <LikeOutlined /><br/>
                                {this.state.letterdetails.likes}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="share-main-right"> 
                    <div className="share-main-right-hotletter">
                        <div className="share-main-right-title">
                            最热文章
                        </div>
                        <div>
                            <ul className="share-main-right-short">
                                {
                                    this.state.hotletterlist.map((nls,i)=>{
                                        return(
                                        <li key={"nls"+i}>
                                            <span onClick={() => this.readletter(nls.letterno)}>{nls.title}</span>
                                        </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                    <div className="share-main-right-newcomment"></div>
                    <div className="share-main-right-newfile">
                        <div className="share-main-right-title">
                            相关文件
                        </div>
                        <div>
                            <ul className="share-main-right-short">
                                {
                                    this.state.fileslist.map((nfs,i)=>{
                                        return (
                                        <li key={"nfs"+i}>
                                            <a href={nfs.fileslink} target="_blank" rel="noreferrer">{nfs.filesname}</a>
                                        </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                        <div className="share-main-right-more">&nbsp;点击下载</div>
                    </div>
                    <div className="share-main-right-link">
                        <div className="share-main-right-title">
                            相关链接
                        </div>
                        <div>
                            <ul className="share-main-right-short">
                                {
                                    this.state.relatedlinks.map((rl,i)=>{
                                        return(
                                            <li key={"rl"+i}>
                                                <a href={rl.linkpath} target="_blank" rel="noreferrer">{rl.linkname}</a>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                        <div className="share-main-right-more">&nbsp;点击浏览</div>
                    </div>
                    <div className="share-main-right-feedback">
                        <Affix offsetTop={10} onClick={()=>this.addfeedback()}>
                            <p>反馈</p>
                        </Affix>
                        <Modal
                            visible={this.state.feedback}
                            onCancel={()=>this.setState({feedback: false})}
                            onOk={()=>this.uploadfeedback()}
                            okText="提交"
                            cancelText="返回"
                            title="提交反馈"
                        >
                            <Input ref={this.feedbackref}/>
                        </Modal>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({ loginState: state.login }),
)(share)
