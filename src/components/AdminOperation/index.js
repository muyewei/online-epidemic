import React, {Component} from "react"
import { Table, Button, Input } from "antd";

class Allusers extends Component{
    usernameRef = React.createRef()
    useraccountRef = React.createRef()
    state = {
        identify: "",
        defaultdata: "",
        usedata: "",
        page: 0
    }
    componentDidMount(){
        this.getUsersList(1)
    }
    componentDidUpdate(){
        this.getUsersList(1)
    }
    getUsersList = (page) => {
        let i = ""
        if(this.props.operationPage === "普通用户"){
            i = "normal"
        }else if(this.props.operationPage === "发布用户"){
            i = "publisher"
        }else if(this.props.operationPage === "管理员"){
            i = "admin"
        }
        if(i === this.state.identify && page === this.state.page){
            return
        }
        this.axios.get("/users/admin/getallusers?identify="+i+"&page="+page)
        .then((res)=>{
            let data = res.data
            for(let j in data){
                data[j]["key"] = j + 1
            }
            this.setState({defaultdata: data,usedata: data,identify:i,page})
        })

    }

    filterAccount = ()=>{
        let data = this.state.defaultdata
        let afterData = []
        let regexp = this.useraccountRef.current.input.value
        afterData = data.filter(function(i){
            return i.user_account.search(RegExp(regexp,"ig")) >= 0
        })
        this.setState({usedata: afterData})
    }
    filterName = () =>{
        let data = this.state.defaultdata
        let afterData = []
        let regexp = this.usernameRef.current.input.value
        afterData = data.filter(function(i){
            return i.username.search(RegExp(regexp,"ig")) >= 0
        })
        this.setState({usedata: afterData})
    }
    resetData = () =>{
        let data = this.state.defaultdata
        this.setState({usedata: data})
    }
    tableChange = (pagination) =>{
        this.getLogList(pagination.current)
    }
    render(){
        const columns = [
            {
              title: '用户名',
              dataIndex: 'user_account',
              render: text => <span>{text}</span>,
            },
            {
              title: '账号',
              className: 'column-money',
              dataIndex: 'username',
              align: 'right',
            },
            {
              title: '最近浏览日期',
              dataIndex: 'behaviordate',
            },
            {
              title: '操作',
              dataIndex: 'operation',
              render: (_,record) => (
                  <>
                    <Button onClick={() => console.log("删除用户： ",record)} disabled={this.state.identify === "admin" ? true : false}>删除用户</Button>
                    {
                        this.state.identify === "normal" &&
                        <Button>设为发布者</Button>
                    }
                    {
                        this.state.identify === "publisher" &&
                        <Button>设为管理员</Button>
                    }
                  </>
              )
            }
          ];
          
          const data = this.state.usedata        
        return(
            <div>
                <div>
                    <div style={{display: "flex"}}>
                        <Input addonBefore="用户名" style={{ width:"200px" }} ref={this.useraccountRef}/>
                        <Button onClick={()=>this.filterAccount()}>搜索</Button></div>
                    <div style={{display: "flex"}}>
                        <Input addonBefore="账号" style={{ width:  "200px" }} ref={this.usernameRef}/>
                        <Button onClick={()=>this.filterName()}>搜索</Button></div>
                    <div><Button onClick={()=>this.resetData()}>重置</Button></div>
                </div>
                <Table
                    columns={columns}
                    dataSource={data}
                    bordered
                    pagination={{position: ["bottomCenter"], pageSize: 10, defaultCurrent: this.state.page}}
                    scroll={{ y: 340 }}
                    onChange={(pagination) => this.tableChange(pagination)}
                />
            </div>
        )
    }
}

class Alllog extends Component{
    identifyRef = React.createRef()
    useraccountRef = React.createRef()
    state = {
        logtype: "",
        defaultdata: "",
        usedata: "",
        page: 0
    }
    componentDidMount(){
        this.getLogList(1)
    }
    componentDidUpdate(){
        this.getLogList(1)
    }
    getLogList = (page) => {
        let i = ""
        if(this.props.operationPage === "用户日志"){
            i = "userlog"
        }else if(this.props.operationPage === "试卷日志"){
            i = "paperlog"
        }else if(this.props.operationPage === "题目日志"){
            i = "questionlog"
        }
        if(i === this.state.logtype && page === this.state.page){
            return
        }
        this.axios.get("/users/admin/getalllog?logtype="+i+"&page="+page)
        .then((res)=>{
            let data = res.data
            for(let j in data){
                data[j]["key"] = j + 1
            }
            this.setState({defaultdata: data,usedata: data,logtype:i,page})
        })
    }
    filterAccount = ()=>{
        let data = this.state.defaultdata
        let afterData = []
        let regexp = this.useraccountRef.current.input.value
        afterData = data.filter(function(i){
            return i.user_account.search(RegExp(regexp,"ig")) >= 0
        })
        this.setState({usedata: afterData})
    }
    filterIdentify = () =>{
        let data = this.state.defaultdata
        let afterData = []
        let regexp = this.identifyRef.current.input.value
        afterData = data.filter(function(i){
            return i.user_identify.search(RegExp(regexp,"ig")) >= 0
        })
        this.setState({usedata: afterData})
    }
    resetData = () =>{
        let data = this.state.defaultdata
        this.setState({usedata: data})
    }
    tableChange = (pagination) =>{
        this.getLogList(pagination.current)
    }
    render(){
        const columns = [
            {
                title: '编号',
                dataIndex: 'behaviorno'
            },
            {
              title: '用户名',
              dataIndex: 'user_account',
              render: text => <span>{text}</span>,
            },
            {
              title: '账号',
              className: 'column-money',
              dataIndex: 'username',
              align: 'right',
            },
            {
              title: '行为日期',
              dataIndex: 'behaviordate',
            },
            {
              title: '行为',
              dataIndex: 'behavior'
            },
            {
              title: '身份',
              dataIndex: 'user_identify'
            }
          ];
          
          const data = this.state.usedata        
        return(
            <div>
                <div>
                    <div style={{display: "flex"}}>
                        <Input addonBefore="用户名" style={{ width:"200px" }} ref={this.useraccountRef}/>
                        <Button onClick={()=>this.filterAccount()}>搜索</Button></div>
                    <div style={{display: "flex"}}>
                        <Input addonBefore="身份" style={{ width:  "200px" }} ref={this.identifyRef}/>
                        <Button onClick={()=>this.filterIdentify()}>搜索</Button></div>
                    <div><Button onClick={()=>this.resetData()}>重置</Button></div>
                </div>
                <Table
                    columns={columns}
                    dataSource={data}
                    bordered
                    pagination={{position: ["bottomCenter"], pageSize: 10, defaultCurrent: this.state.page}}
                    scroll={{ y: 340 }}
                    onChange={(pagination) => this.tableChange(pagination)}
                />
            </div>
        )
    }
}

export default class AdminOperation extends Component{
    render(){
        return(
            <div>
                <div>
                    {
                        (this.props.operationPage === "普通用户" || this.props.operationPage === "发布用户" || this.props.operationPage === "管理员") &&
                        <Allusers operationPage={this.props.operationPage}></Allusers>
                    }
                    {
                        (this.props.operationPage === "用户日志" || this.props.operationPage === "试卷日志" || this.props.operationPage === "题目日志") &&
                        <Alllog operationPage={this.props.operationPage}></Alllog>
                    }
                </div>
            </div>
        )
    }
}