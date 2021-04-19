import React, {Component} from "react"
import style from "./index.module.css"
import { Table, Tag, Space, Button, Popconfirm,Input } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';

export default class QuestionList extends Component{
    componentDidMount(){
        console.log("QuestionList didmount: ",this.props)
        this.axios.get("/users/question/getQuestionList?user_account="+this.props.username)
        .then((res) => {
          for(let i in res.data){
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
          questionlist: []
      }
  
      getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
          <div style={{ padding: 8 }}>
            <Input
              ref={node => {
                this.searchInput = node;
              }}
              placeholder={`Search ${dataIndex}`}
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
                Search
              </Button>
              <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                Reset
              </Button>
              <Button
                type="link"
                size="small"
                onClick={() => {
                  confirm({ closeDropdown: false });
                  this.setState({
                    searchText: selectedKeys[0],
                    searchedColumn: dataIndex,
                  });
                }}
              >
                Filter
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
        this.axios.get("/users/question/deletequestion?username="+this.props.username+"&questionno="+record.questionno)
        .then(res=>{
          console.log(res)
        })
      }
  
      handleQuestionEdit = (questionno) => {
        this.props.createToPublish(questionno)
        console.log("handleQuestionEdit: ", questionno)
      }
  
      render(){
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
                  <Button type="primary" style={{marginLeft: "5px"}} onClick={() => this.handleQuestionEdit(record.key)}>编辑</Button>
                </>,
              }
            ];
            const data = this.state.questionlist;
          return(
              <div className={style["questionlist"]}>
                  <Table columns={columns} dataSource={data} />
              </div>
          )
    }
}