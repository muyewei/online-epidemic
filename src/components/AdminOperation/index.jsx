import React, { Component } from "react"
import { Table, Tag, Space, Button, Popconfirm, Input, message, Modal } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import style from "./index.module.css"

class Allusers extends Component {
    usernameRef = React.createRef()
    useraccountRef = React.createRef()
    state = {
        identify: "",
        defaultdata: "",
        usedata: "",
        page: 0
    }
    componentDidMount() {
        this.getUsersList(1)
    }
    componentDidUpdate() {
        this.getUsersList(1)
    }
    getUsersList = (page) => {
        let i = ""
        if (this.props.operationPage === "普通用户") {
            i = "normal"
        } else if (this.props.operationPage === "发布用户") {
            i = "publisher"
        } else if (this.props.operationPage === "管理员") {
            i = "admin"
        }
        if (i === this.state.identify && page === this.state.page) {
            return
        }
        this.axios.get("/users/admin/getallusers?identify=" + i + "&page=" + page)
            .then((res) => {
                let data = res.data
                for (let j in data) {
                    data[j]["key"] = j + 1
                }
                console.log(data)
                this.setState({ defaultdata: data, usedata: data, identify: i, page })
            })

    }

    filterAccount = () => {
        let data = this.state.defaultdata
        let afterData = []
        let regexp = this.useraccountRef.current.input.value
        afterData = data.filter(function (i) {
            return i.user_account.search(RegExp(regexp, "ig")) >= 0
        })
        this.setState({ usedata: afterData })
    }
    filterName = () => {
        let data = this.state.defaultdata
        let afterData = []
        let regexp = this.usernameRef.current.input.value
        afterData = data.filter(function (i) {
            return i.username.search(RegExp(regexp, "ig")) >= 0
        })
        this.setState({ usedata: afterData })
    }
    resetData = () => {
        let data = this.state.defaultdata
        this.setState({ usedata: data })
    }
    tableChange = (pagination) => {
        this.getUsersList(pagination.current)
    }
    render() {
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
                render: (_, record) => (
                    <>
                        <Button onClick={() => console.log("删除用户： ", record)} disabled={this.state.identify === "admin" ? true : false}>删除用户</Button>
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
        console.log(data)
        return (
            <div>
                <div>
                    <div style={{ display: "flex" }}>
                        <Input addonBefore="用户名" style={{ width: "200px" }} ref={this.useraccountRef} />
                        <Button onClick={() => this.filterAccount()}>搜索</Button></div>
                    <div style={{ display: "flex" }}>
                        <Input addonBefore="账号" style={{ width: "200px" }} ref={this.usernameRef} />
                        <Button onClick={() => this.filterName()}>搜索</Button></div>
                    <div><Button onClick={() => this.resetData()}>重置</Button></div>
                </div>
                <Table
                    columns={columns}
                    dataSource={data}
                    bordered
                    pagination={{ position: ["bottomCenter"], pageSize: 10, defaultCurrent: this.state.page + 1 }}
                    scroll={{ y: 340 }}
                    onChange={(pagination) => this.tableChange(pagination)}
                />
            </div>
        )
    }
}

class Alllog extends Component {
    identifyRef = React.createRef()
    useraccountRef = React.createRef()
    state = {
        logtype: "",
        defaultdata: "",
        usedata: "",
        page: 0
    }
    componentDidMount() {
        this.getLogList(1)
    }
    componentDidUpdate() {
        this.getLogList(1)
    }
    getLogList = (page) => {
        let i = ""
        if (this.props.operationPage === "用户日志") {
            i = "userlog"
        } else if (this.props.operationPage === "试卷日志") {
            i = "paperlog"
        } else if (this.props.operationPage === "题目日志") {
            i = "questionlog"
        }
        if (i === this.state.logtype && page === this.state.page) {
            return
        }
        this.axios.get("/users/admin/getalllog?logtype=" + i + "&page=" + page)
            .then((res) => {
                let data = res.data
                for (let j in data) {
                    data[j]["key"] = j + 1
                }
                this.setState({ defaultdata: data, usedata: data, logtype: i, page })
            })
    }
    filterAccount = () => {
        let data = this.state.defaultdata
        let afterData = []
        let regexp = this.useraccountRef.current.input.value
        afterData = data.filter(function (i) {
            return i.user_account.search(RegExp(regexp, "ig")) >= 0
        })
        this.setState({ usedata: afterData })
    }
    filterIdentify = () => {
        let data = this.state.defaultdata
        let afterData = []
        let regexp = this.identifyRef.current.input.value
        afterData = data.filter(function (i) {
            return i.user_identify.search(RegExp(regexp, "ig")) >= 0
        })
        this.setState({ usedata: afterData })
    }
    resetData = () => {
        let data = this.state.defaultdata
        this.setState({ usedata: data })
    }
    tableChange = (pagination) => {
        this.getLogList(pagination.current)
    }
    render() {
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
        return (
            <div>
                <div>
                    <div style={{ display: "flex" }}>
                        <Input addonBefore="用户名" style={{ width: "200px" }} ref={this.useraccountRef} />
                        <Button onClick={() => this.filterAccount()}>搜索</Button></div>
                    <div style={{ display: "flex" }}>
                        <Input addonBefore="身份" style={{ width: "200px" }} ref={this.identifyRef} />
                        <Button onClick={() => this.filterIdentify()}>搜索</Button></div>
                    <div><Button onClick={() => this.resetData()}>重置</Button></div>
                </div>
                <Table
                    columns={columns}
                    dataSource={data}
                    bordered
                    pagination={{ position: ["bottomCenter"], pageSize: 10, defaultCurrent: this.state.page + 1 }}
                    scroll={{ y: 340 }}
                    onChange={(pagination) => this.tableChange(pagination)}
                />
            </div>
        )
    }
}
//paper and question
class Paq extends Component {
    state = {
        paperlist: [],
        questionlist: [],
        questionPreviewValue: [],
        isModalVisible: [],
        type: "paper"
    }
    componentDidMount() {
        if (this.props.operationPage === "试卷信息") {
            this.getallpaper()
        } else if (this.props.operationPage === "题目信息") {
            this.getallquestion()
        }
    }
    getallpaper = () => {
        this.axios.get("/users/admin/getallpaper")
            .then((res) => {
                for (let i in res.data) {
                    res.data[i].key = res.data[i].paperno
                }
                this.setState({
                    paperlist: res.data,
                    type: "paper"
                })
            })
    }
    getallquestion = () => {
        this.axios.get("/users/admin/getallquestion")
            .then((res) => {
                for (let i in res.data) {
                    res.data[i].key = res.data[i].questionno
                }
                this.setState({
                    questionlist: res.data,
                    type: "question"
                })
            })
    }
    componentDidUpdate(pre, now) {
        if (pre.operationPage === "试卷信息" && this.props.operationPage === "题目信息") {
            this.getallquestion()
        } else if (pre.operationPage === "题目信息" && this.props.operationPage === "试卷信息") {
            this.getallpaper()
        }
    }
    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
          <div style={{ padding: 8 }}>
            <Input
              ref={node => {
                this.searchInput = node;
              }}
              placeholder={`输入 ${dataIndex}`}
              value={selectedKeys[0]}
              onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
              style={{ width: 188, marginBottom: 8, display: 'block' }}
            />
            <Space>
              <Button
                type="primary"
                onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                icon={<SearchOutlined />}
                size="small"
                style={{ width: 90 }}
              >
                寻找
                  </Button>
              <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                重置
                  </Button>
            </Space>
          </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) =>
          record[dataIndex]
            ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
            : '',
        onFilterDropdownVisibleChange: visible => {
          if (visible) {
            setTimeout(() => this.searchInput.select(), 100);
          }
        },
        render: text =>
          this.state.searchedColumn === dataIndex ? (
            <Highlighter
              highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
              searchWords={[this.state.searchText]}
              autoEscape
              textToHighlight={text ? text.toString() : ''}
            />
          ) : (
            text
          ),
      });
    
    handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        this.setState({
          searchText: selectedKeys[0],
          searchedColumn: dataIndex,
        });
      };
    handlePaperClose = (paperno) => {
        this.axios.get("/users/paper/setpaperclose?paperno=" + paperno)
            .then(res => {
                if (res.data === "setpaperclose Success") {
                    this.getPaperOpenList()
                    message.success("更改成功")
                } else {
                    message.warn("出错了...")
                }
            })
    }
    handleDeletePaper = (record) => {
        console.log("handleDelete: ", record)
        this.axios.get("/users/paper/deletepaper?username=" + this.props.username + "&paperno=" + record.paperno + "&papername=" + record.papername)
            .then(res => {
                console.log("deletepaper: ", res)
            })
    }

    handlePaperOpen = (paperno) => {
        this.axios.get("/users/paper/setpaperopen?paperno=" + paperno)
            .then(res => {
                if (res.data === "setpaperopen Success") {
                    message.success("更改成功")
                } else {
                    message.warn("未知错误...")
                }
            })
    }

    handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
    };

    handleDelete = (record) => {
        console.log("handleDelete: ", record.questionno)
        this.axios.get("/users/question/deletequestion?username=" + this.props.username + "&questionno=" + record.questionno)
            .then(res => {
                console.log(res)
            })
    }

    handleQuestionPreview = (questionno) => {
        console.log("handleQuestionEdit: ", questionno)
        this.axios.get("/users/question/getquestion?questionno=" + questionno)
            .then(res => {
                console.log([JSON.parse(res.data[0].value)])
                this.setState({ isModalVisible: true, questionPreviewValue: [JSON.parse(res.data[0].value)] })
            })
    }

    handleCancel = () => {
        this.setState({ isModalVisible: false })
    }
    render() {
        let columnpaper = [
            {
                title: '编号',
                dataIndex: 'paperno',
                key: 'paperno',
                render: text => <span>{text}</span>,
                ...this.getColumnSearchProps('paperno')
            },
            {
                title: '题目',
                dataIndex: 'papername',
                key: 'papername',
                render: text => <span>{text}</span>,
                ...this.getColumnSearchProps('papername')
            },
            {
                title: '类型',
                dataIndex: 'paperstyle',
                key: 'paperstyle',
                render: text => <Tag color="geekblue">{text}</Tag>,
                ...this.getColumnSearchProps('paperstyle')
            },
            {
                title: '用户',
                dataIndex: 'user_account',
                key: 'user_account',
                render: text => <span>{text}</span>,
            },
            {
                title: '限时',
                dataIndex: 'papertime',
                key: 'papertime',
                render: text => <span>{text}</span>,
            },
            {
                title: '密码',
                dataIndex: 'paperpassword',
                key: 'paperpassword',
                render: text => <span>{text}</span>,
            },
            {
                title: '日期',
                dataIndex: 'paperdate',
                key: 'paperdate',
                render: text => <span>{text}</span>,
                ...this.getColumnSearchProps('paperdate')
            },
            {
                title: '操作',
                dataIndex: 'papercontrol',
                key: 'papercontrol',
                render: (_, record) =>
                    <>
                        <Popconfirm title="确认删除?" onConfirm={() => this.handleDeletePaper(record)}>
                            <Button danger style={{ marginLeft: "5px" }}>删除</Button>
                        </Popconfirm>
                        <Button type="dashed" style={{ marginLeft: "5px" }} onClick={() => this.handlePaperOpen(record.paperno)}>开放使用</Button>
                        <Button type="dashed" style={{ marginLeft: "5px" }} onClick={() => this.handlePaperClose(record.paperno)}>禁止使用</Button>
                    </>,
            }
        ]
        let paperdata = this.state.paperlist
        let columnquestion = [
            {
                title: '编号',
                dataIndex: 'questionno',
                key: 'questionno',
                render: text => <span>{text}</span>,
                ...this.getColumnSearchProps('questionno')
            },
            {
                title: '题目',
                dataIndex: 'title',
                key: 'title',
                render: text => <span>{text}</span>,
                ...this.getColumnSearchProps('title')
            },
            {
                title: '题型',
                dataIndex: 'type',
                key: 'type',
                render: text =>
                (<span>{text === "singletype" ? "单选题" : ""}
                    {text === "multitype" ? "多选题" : ""}
                    {text === "gaptype" ? "填空题" : ""}
                    {text === "judgetype" ? "判断题" : ""}
                    {text === "shorttype" ? "简答题" : ""}</span>)
                ,
                ...this.getColumnSearchProps('type')
            },
            {
                title: '用户',
                dataIndex: 'user_account',
                key: 'user_account',
                render: text => <span>{text}</span>,
            },
            {
                title: '类型',
                dataIndex: 'subject',
                key: 'subject',
                render: text => <Tag color="geekblue">{text}</Tag>,
                ...this.getColumnSearchProps('subject')
            },
            {
                title: '日期',
                dataIndex: 'questiondate',
                key: 'questiondate',
                render: text => <span>{text}</span>,
                ...this.getColumnSearchProps('questiondate')
            },
            {
                title: '操作',
                dataIndex: 'questioncontrol',
                key: 'questioncontrol',
                render: (_, record) =>
                    <>
                        <Popconfirm title="确认删除?" onConfirm={() => this.handleDelete(record)}>
                            <Button danger>删除</Button>
                        </Popconfirm>
                        <Button type="primary" style={{ marginLeft: "5px" }} onClick={() => this.handleQuestionPreview(record.key)}>预览</Button>
                    </>,
            }
        ]
        let questiondata = this.state.questionlist
        return (
            <div>
                <Table columns={this.state.type === "paper" ? columnpaper : columnquestion} dataSource={this.state.type === "paper" ? paperdata : questiondata} />
                <Modal
                    visible={this.state.isModalVisible}
                    onCancel={() => this.handleCancel()}
                    footer={[
                        <Button key="back" type="primary" onClick={() => this.handleCancel()}>
                            返回
                        </Button>
                    ]}
                >
                    <div className={style["questionPreview"]}>
                        {
                            this.state.questionPreviewValue.map((ele, i) => {
                                if (ele.type === "singletype" || ele.type === "multitype") {
                                }
                                return (
                                    <div className={style["questionPreviewQustion"]} key={"questionPreview" + i}>
                                        <div>
                                            {ele.type === "singletype" ? "单选题" : ""}
                                            {ele.type === "multitype" ? "多选题" : ""}
                                            {ele.type === "judgetype" ? "判断题" : ""}
                                            {ele.type === "gaptype" ? "填空题" : ""}
                                            {ele.type === "shorttype" ? "简答题" : ""}
                                        </div>
                                        <div className={style["questionPreviewBlock"]}>
                                            <div>题目：</div>
                                            <div>{ele.title}</div>
                                        </div>
                                        {
                                            (ele.type === "singletype" || ele.type === "multitype") ?
                                                (<div className={style["questionPreviewBlock"]}>
                                                    <div>选项：</div>
                                                    <div>
                                                        {ele.option.map((el, i) => { return (<p key={i}>{String.fromCharCode(65 + i * 1) + "：" + el}</p>) })}
                                                    </div>
                                                </div>)
                                                : ""
                                        }
                                        <div className={style["questionPreviewBlock"]}>
                                            <div>答案：</div>
                                            {
                                                ele.type !== "gaptype"
                                                    ? (<div>{ele.answer}</div>)
                                                    : (<div>
                                                        {ele.option.map((el, i) => { return (<p key={i}>{String.fromCharCode(65 + i * 1) + "：" + el}</p>) })}
                                                    </div>)
                                            }
                                        </div>
                                        <div className={style["questionPreviewBlock"]}>
                                            <div>解析：</div>
                                            <div>{ele.analyze}</div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </Modal>
            </div>
        )
    }
}

export default class AdminOperation extends Component {
    render() {
        return (
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
                    {
                        (this.props.operationPage === "试卷信息" || this.props.operationPage === "题目信息") &&
                        <Paq operationPage={this.props.operationPage}></Paq>
                    }
                </div>
            </div>
        )
    }
}