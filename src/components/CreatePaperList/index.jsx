import React, {Component} from 'react';
import { Table, Tag, Space, Button, Popconfirm,Input } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import style from "./index.module.css";

class PaperList extends Component{
    componentDidMount(){
      this.axios.get("/users/paper/getPaperList?user=" + this.props.username)
      .then((res) => {
        for(let i in res.data){
          res.data[i].key = res.data[i].paperno
        }
        console.log("Get PaperList: ", res.data)
        this.setState({
          paperlist: res.data
        })
      })
    }
    state = {
        papername: "",
        papertype: "",
        paperlist: []
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

    handleDelete = (paperno) => {
      console.log("handleDelete: ", paperno)
    }

    handlePaperEdit = (paperno) => {
      this.props.createToPublish(paperno)
      console.log("handlePaperEdit: ", paperno)
    }

    render(){
        const columns = [
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
              title: '简介',
              dataIndex: 'paperbrief',
              key: 'paperbrief',
              render: text => <span>{text}</span>,
            },
            {
              title: '限时',
              dataIndex: 'papertime',
              key: 'papertime',
              render: text => <Link to="/user/publisher">{text}</Link>,
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
                <Popconfirm title="确认删除?" onConfirm={() => this.handleDelete(record.key)}>
                  <Button danger>删除</Button>
                </Popconfirm>
                <Button type="primary" style={{marginLeft: "5px"}} onClick={() => this.handlePaperEdit(record.key)}>编辑</Button>
                <Button type="dashed" style={{marginLeft: "5px"}}>上传</Button>
              </>,
            }
          ];
          const data = this.state.paperlist;
        return(
            <div className={style["paperlist"]}>
                <Table columns={columns} dataSource={data} />
            </div>
        )
    }
}


export default class createPaperList extends Component{
    componentDidMount(){
    }
    createToPublish = (paperno) => {
      this.props.createToPublish(paperno)
    }
    render(){
        return(
            <div>
                createPaperList
                <PaperList username={this.props.username} createToPublish={(paperno) => this.createToPublish(paperno)}></PaperList>
            </div>
        )
    }
}