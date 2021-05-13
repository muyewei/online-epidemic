import React, { Component } from 'react';
import { Radio, Checkbox, Row, Col, Table, Tag, Space, Button, Input, message, Modal } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import * as echarts from 'echarts';
import style from "./index.module.css";
//modal type = > details(试卷详情) list(答卷查看) self(个人答卷) init(不显示)
class PaperList extends Component {
  componentDidMount() {
    this.getPaperOpenList()
  }
  state = {
    papername: "",
    papertype: "",
    paperlist: [],
    modalshow: "init",
    checkpaper: [],
    checkanswer: []
  }
  getPaperOpenList = () => {
    this.axios.get("/users/paper/getPaperOpenList?user=" + this.props.username)
      .then((res) => {
        for (let i in res.data) {
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
  showModal = (type, no) => {
    this.setState({ modalshow: type })
    if (type === "details") {
      this.axios.get("/users/paper/checkpaperdetails?paperno=" + no)
        .then(res => {
          let v = res.data[0][0].papervalue.slice(1, -1).split("},")
          let data = []
          for (let i in v) {
            if (i * 1 + 1 === v.length) {
              data.push(JSON.parse(v[i]))
            } else {
              data.push(JSON.parse(v[i] + "}"))
            }
          }
          let checkanswer = []
          for(let m = 0; m < res.data[1].length; m++){
            let answer = "["+res.data[1][m].answer.slice(1, -1)+"]"
            answer = answer.replace(/,{/ig,",[").replace(/},/ig,"],").replace(/,NULL,/ig,",\"\",")
            answer = JSON.parse(answer)
            if(answer.length === 0){
              break;
            }
            for(let n = 0; n < v.length; n++){
              let key = answer[n].toString()
              if(!answer[n]){
                key = "跳过"
              }
              if(checkanswer[n] && checkanswer[n][0] && checkanswer[n][0][key]){
                checkanswer[n][checkanswer[n][0][key]]["value"]++
              }else{
                if(!checkanswer[n] || !checkanswer[n][0] || !checkanswer[n][0].count){
                  checkanswer[n] = []
                  checkanswer[n].unshift({count: 0})
                }
                checkanswer[n][0].count++
                checkanswer[n][0][key] = checkanswer[n][0].count
                checkanswer[n].push({value: 1,name:key})
              }
            }
          }
          setTimeout(()=>{
            for(let j = 0; j < checkanswer.length;j++){
              this.drawecharts("echarts"+j,checkanswer[j])
            }
          },2000)
          this.setState({checkpaper: data,checkanswer: checkanswer})
        })
    }
  }
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
  drawecharts = (id,data) =>{
    data.shift()
    console.log(id,data)
    let myChart = echarts.init(document.getElementById(id));
        // 绘制图表
        myChart.setOption({
          tooltip: {
              trigger: 'item'
          },
          series: [
              {
                  name: '信息分布',
                  type: 'pie',
                  radius: '50%',
                  label: { 
                      normal: 
                      { show: true, position: 'inner' }
                  },
                  data: data,
                  emphasis: {
                      itemStyle: {
                          shadowBlur: 10,
                          shadowOffsetX: 0,
                          shadowColor: 'rgba(0, 0, 0, 0.5)'
                      }
                  }
              }
          ]
      });
  }
  render() {
    const radioStyle = {
      display: 'block',
      lineHeight: '30px',
      width: '100%',
      textOverflow: 'ellipsis',
      whiteSpace: 'normal'
  };
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
            <Button type="primary" style={{ marginLeft: "5px" }} onClick={() => this.showModal("details", record.paperno)}>试卷详情</Button>
            <Button style={{ marginLeft: "5px" }} onClick={() => this.showModal("list")}>答卷查看</Button>
            <Button type="dashed" style={{ marginLeft: "5px" }} onClick={() => this.handlePaperClose(record.paperno)}>禁止使用</Button>
          </>,
      }
    ];
    const data = this.state.paperlist;
    return (
      <div className={style["paperlist"]}>
        <Table columns={columns} dataSource={data} />
        <Modal
          title={"试卷详情"}
          visible={this.state.modalshow === "details" ? true : false}
          onCancel={() => this.showModal("init")}
          footer={[
            <Button onClick={() => this.showModal("init")}>
              返回
                  </Button>
          ]}
        >123
          {
            this.state.checkpaper.map((ele, i) => {
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
                          <Radio.Group>
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
                            <Checkbox.Group style={{ width: '100%' }}>
                              {ele.option.map((el, i) => {
                                return (<Row key={"multi" + i}>
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
                            <Radio.Group>
                              <Radio style={radioStyle} value="对">√</Radio>
                              <Radio style={radioStyle} value="错">×</Radio>
                            </Radio.Group>
                          </div>
                        </div>
                      ) : ""
                  }
                  {
                    (ele.type === "gaptype" || ele.type === "shorttype") ?
                      (
                        <div className={style["paperTestBlock"]}>
                          <div>回答：</div>
                          <div>
                            暂无
                          </div>
                        </div>
                      ) : ""
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
                    <div>答题情况：</div>
                    <div id={"echarts"+i} style={{width:"100px",height:"100px",visibility: (ele.type === "gaptype" || ele.type === "shorttype") ? 'hidden':'visible'}}>{ele.analyze}</div>
                  </div>
                </div>
              )
            })
          }
        </Modal>
        <Modal
          title={"答卷查看"}
          visible={this.state.modalshow === "list" ? true : false}
          onCancel={() => this.showModal("init")}
          footer={[
            <Button onClick={() => this.showModal("init")}>
              返回
                  </Button>
          ]}
        ></Modal>
        <Modal
          title={"答卷详情"}
          visible={this.state.modalshow === "self" ? true : false}
          onCancel={() => this.showModal("init")}
          footer={[
            <Button onClick={() => this.showModal("init")}>
              返回
                  </Button>
          ]}
        ></Modal>
      </div>
    )
  }
}


export default class OnlinePaperList extends Component {
  componentDidMount() {
  }
  createToPublish = (paperno) => {
    this.props.createToPublish(paperno)
  }
  render() {
    return (
      <div>
        <PaperList username={this.props.username} createToPublish={(paperno) => this.createToPublish(paperno)}></PaperList>
      </div>
    )
  }
}