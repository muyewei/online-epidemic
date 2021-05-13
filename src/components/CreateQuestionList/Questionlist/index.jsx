import React, { Component } from "react"
import style from "./index.module.css"
import { Table, Tag, Space, Button, Popconfirm, Input, Modal } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';

export default class QuestionList extends Component {

  componentDidMount() {
    console.log("QuestionList didmount: ", this.props)
    this.axios.get("/users/question/getQuestionList?user_account=" + this.props.useraccount)
      .then((res) => {
        for (let i in res.data) {
          res.data[i].key = res.data[i].questionno
        }
        console.log("Get QuestionList: ", res.data)
        this.setState({
          questionlist: res.data
        })
      })
  }
  state = {
    questionname: "",
    questiontype: "",
    questionlist: [],
    questionPreviewValue: [],
    isModalVisible: false
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
    this.axios.get("/users/question/getquestion?questionno="+questionno)
    .then(res=>{
      console.log([JSON.parse(res.data[0].value)])
      this.setState({ isModalVisible: true,questionPreviewValue: [JSON.parse(res.data[0].value)] })
    })
  }

  handleCancel = ()=>{
    this.setState({ isModalVisible: false })
  }

  render() {
    const columns = [
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
    ];
    const data = this.state.questionlist;
    return (
      <div className={style["questionlist"]}>
        <Table columns={columns} dataSource={data} />
        <Modal 
          visible={this.state.isModalVisible}
          onCancel={()=>this.handleCancel()}
          footer={[
            <Button key="back" type="primary" onClick={()=>this.handleCancel()}>
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