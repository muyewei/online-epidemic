import React,{Component} from "react"
import style from "./index.module.css"
import { Button, Input, Table, Modal, message } from "antd"
import { LockOutlined, WindowsOutlined, TeamOutlined } from "@ant-design/icons";


export default class NormalMod extends Component{
    searchInputRef = React.createRef()
    passwordInputRef = React.createRef()
    state={
        latestpaper: [],
        timelimit: [],
        needpassword: [],
        paperlist: [],
        usepaperlist: [],
        password: "",
        paperno: "",
        type: "list",
        isModalVisible: false
    }
    componentDidMount(){
        this.axios.get("/users/normal/getlatestpaper")
        .then(res=>{
            this.setState({latestpaper: res.data})
        })
        this.axios.get("/users/normal/getlatesttimelimit")
        .then(res=>{
            this.setState({timelimit: res.data})
        })
        this.axios.get("/users/normal/getlatestpassword")
        .then(res=>{
            this.setState({needpassword: res.data})
        })
        this.axios.get("/users/normal/getpaperlist")
        .then(res=>{
            let data = res.data
            for(let j in data){
                data[j]["key"] = j
            }
            this.setState({paperlist: data,usepaperlist: data})
        })
    }
    showpaperlist = (k)=>{
        if(k === "no"){
            this.setState({type: "notlist"})
        }else if(k === "yes"){
            this.setState({type: "list"})
        }
        
    }
    searchInput = ()=>{
        let data = this.state.paperlist
        let afterData = []
        let regexp = this.searchInputRef.current.input.value
        afterData = data.filter(function(i){
            return i.papername.search(RegExp(regexp,"ig")) >= 0
        })
        this.setState({usepaperlist: afterData})
    }
    resetInput = () =>{
        this.setState({usepaperlist: this.state.paperlist})
    }
    paperlistOnclick = (record) =>{
        if(record.paperpassword){
            this.setIsModalVisible(true,{type:"set",password:record.paperpassword,paperno:record.paperno})
        }else{
            this.props.gototest(record.paperno)
        }
    }
    setIsModalVisible = (bool,i)=>{
        if(i && i.type && i.type === "set"){
            this.setState({isModalVisible: bool,password:i.password,paperno:i.paperno})
        }else if(i && i.type && i.type === "check"){
            if(this.passwordInputRef.current.input.value === this.state.password){
                this.setState({isModalVisible: bool})
                this.paperlistOnclick({paperno: this.state.paperno})
                message.success("密码正确");
            }else{
                this.setState({isModalVisible: bool})
                message.error("密码错误");
            }
        }
        else{
            this.setState({isModalVisible: bool})
        }
    }
    toindex = ()=>{
        this.props.history.push("/")
    }
    render(){
        const columns=[
            {
                title: "编号",
                dataIndex: "paperno"
            },
            {
                title:"名称",
                dataIndex: "papername"
            },
            {
                title: "简介",
                dataIndex: "paperbrief"
            },
            {
                title: "密码",
                dataIndex: "paperpassword",
                render: text =>{
                    if(text === ""){
                        return "×"
                    }else{
                        return "√"
                    }
                }
            },
            {
                title: "限时",
                dataIndex: "papertime"
            },
            {
                title: "发布者",
                dataIndex: "user_account"
            }
        ]
        return(
            <div>
                <div className={style["normal-nav"]}>
                    <div className={style["normal-nav-main"]} style={{width:"80%",margin:"auto"}}>
                        <div className={style["normal-nav-logo"]}>
                            <div onClick={() => this.showpaperlist("no")}>
                                <WindowsOutlined/>
                                <span>问卷系统</span>
                            </div>
                        </div>
                        <div className={style["normal-nav-user-icon"]}>
                            <TeamOutlined />
                        </div>
                        <div className={style["normal-nav-exit"]}>
                            <p onClick={() => this.showpaperlist("yes")}>试卷列表</p>
                        </div>
                        <div className={style["normal-nav-exit"]}>
                            <p onClick={() => this.toindex()}>主页</p>
                        </div>
                    </div>
                </div>
                <div className={style["normal-top"]}></div>
                <div className={style["normal-container"]} style={{display: this.state.type === "notlist" ? "block" : "none"}}>
                    <div>
                        <div className={style["normal-new"]}>
                            <div style={{display: "flex",justifyContent: "space-between"}}>
                                <div className={style["normal-container-title"]} style={{width:"200px"}}>最新问卷</div>
                                <div style={{fontSize:"16px",width: "100px",color:"red",lineHeight:"5"}}><p onClick={() => this.showpaperlist("yes")}>--&gt;详情</p></div>
                            </div>
                            <div>
                                {
                                    this.state.latestpaper.map((i,index)=>{
                                        return(
                                            <div key={"latest"+index} style={{borderBottom:"1px solid rgb(206,206,206)",width: "90%",margin: "10px auto",height: "40px",boxShadow:"3px 3px 3px 1px rgb(206,206,206)"}}>
                                                {i.papername}
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className={style["normal-timelimit"]}>
                            <div style={{display: "flex",justifyContent: "space-between"}}>
                                <div className={style["normal-container-title"]} style={{width:"200px"}}>限时问卷</div>
                            </div>
                            <div style={{display: "flex",justifyContent: "space-around"}}>
                                {
                                    this.state.timelimit.map((i,index)=>{
                                        return(
                                            <div key={"limit"+index} className={style["normal-timelimit-cell"]} onClick={()=>this.paperlistOnclick({paperno: i.paperno,user_account: i.user_account})}>
                                                <div className={style["normal-timelimit-cell-1"]}></div>
                                                <div className={style["normal-timelimit-cell-2"]}>
                                                    <div>名称：{i.papername}</div>
                                                    <div>限时：{i.papertime}（分钟）</div>
                                                </div>
                                                <div className={style["normal-timelimit-cell-3"]}>
                                                    简介：{i.paperbrief}
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className={style["normal-password"]}>
                            <div style={{display: "flex",justifyContent: "space-between"}}>
                                <div className={style["normal-container-title"]} style={{width:"200px"}}>需要密码</div>
                            </div>
                            <div style={{display: "flex",justifyContent: "space-around"}}>
                                {
                                    this.state.needpassword.map((i,index)=>{
                                        return(
                                            <div key={"password"+index} className={style["normal-timelimit-cell"]}  onClick={()=>this.setIsModalVisible(true,{type: "set",password:i.paperpassword,paperno:i.paperno})}>
                                                <div className={style["normal-timelimit-cell-1"]} style={{backgroundImage:"none"}}>
                                                    <LockOutlined style={{fontSize:"100px"}}/>
                                                </div>
                                                <div className={style["normal-timelimit-cell-2"]}>
                                                    <div>名称：{i.papername}</div>
                                                    <div>限时：{i.papertime}（分钟）</div>
                                                </div>
                                                <div className={style["normal-timelimit-cell-3"]}>
                                                    简介：{i.paperbrief}
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className={style["normal-paperlist"]}  style={{display: this.state.type === "notlist" ? "none" : "block"}}>
                    <div style={{width: "80%", margin:"auto"}}>
                        <div className={style["normal-paperlist-top"]}>
                            <h2>搜索：</h2>
                            <div>
                                <Input addonBefore="试卷名：" ref={ this.searchInputRef }/>
                                <Button onClick={()=>this.searchInput()} style={{marginTop:"10px"}}>确定</Button>
                                <Button onClick={()=>this.resetInput()} style={{marginTop:"10px"}}>重置</Button>
                            </div>
                        </div>
                        <Table
                            columns={columns}
                            dataSource={this.state.usepaperlist}
                            onRow={record=>{
                                return {
                                    onClick: ()=>this.paperlistOnclick(record)
                                }
                            }}
                            >
                        </Table>
                    </div>

                </div>
                <div className={style["normal-bottom"]}>欢迎使用本系统</div>
                <Modal title="输入密码" visible={this.state.isModalVisible} onOk={()=>this.setIsModalVisible(false,{type:"check"})} onCancel={()=>this.setIsModalVisible(false)}>
                    <Input ref={this.passwordInputRef}></Input>
                </Modal>
            </div>
        )
    }
}