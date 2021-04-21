import React, {Component} from 'react';
import { Table, Tag, Space, Button, Input, message } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import style from "./index.module.css";

class PaperList extends Component{
    componentDidMount(){
      this.getPaperOpenList()
    }
    state = {
        papername: "",
        papertype: "",
        paperlist: []
    }
    getPaperOpenList = ()=>{
        this.axios.get("/users/paper/getPaperOpenList?user=" + this.props.username)
      .then((res) => {
        for(let i in res.data){
          res.data[i].key = res.data[i].paperno
        }
        console.log("Get PaperOpenList: ", res.data)
        this.setState({
          paperlist: res.data
        })
      })
    }
    getColumnSearchProps = dataIndex => ({
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
            ref={node => {
              this.searchInput = node;
            }}
            placeholder={`查询 ${dataIndex}`}
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
              查询
            </Button>
            <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
              充值
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

    handlePaperClose = (paperno) =>{
      this.axios.get("/users/paper/setpaperclose?paperno="+paperno)
      .then(res=>{
        if(res.data === "setpaperclose Success"){
          this.getPaperOpenList()
          message.success("更改成功")
        }else{
          message.warn("出错了...")
        }
      })
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
              title: '浏览次数',
              dataIndex: 'visitnum',
              key: 'visitnum',
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
                <Button type="dashed" style={{marginLeft: "5px"}} onClick={() => this.handlePaperClose(record.paperno)}>禁止使用</Button>
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


export default class OnlinePaperList extends Component{
    componentDidMount(){
    }
    createToPublish = (paperno) => {
      this.props.createToPublish(paperno)
    }
    render(){
        return(
            <div>
                <PaperList username={this.props.username} createToPublish={(paperno) => this.createToPublish(paperno)}></PaperList>
            </div>
        )
    }
}