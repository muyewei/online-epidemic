import React, { Component } from "react"
import * as echarts from "echarts";
import { china } from "./china"
import "./epidemicmap.css"
import axios from "axios"
import { world } from "./world"


class Epidemicmapinfo extends Component {
    state = {
        cndata: {
            "cn_econNum": "现有确诊",
            "cn_asymptomNum": "无症状",
            "cn_susNum": "现有疑似",
            "cn_heconNum": "现有重症",
            "cn_conNum": "累计确诊",
            "cn_jwsrNum": "境外输入",
            "cn_cureNum": "累计治愈",
            "cn_deathNum": "累计死亡"
        },
        adddata: {
            "addecon_new": "现有确诊",
            "addasymptom": "无症状",
            "addsus": "现有疑似",
            "addhecon_new": "现有重症",
            "addcon_new": "累计确诊",
            "addjwsr": "境外输入",
            "addcure_new": "累计治愈",
            "adddeath_new": "累计死亡"
        }
    }
    render() {
        return (
            <>
                <ul className="epidemic-map-info">
                    {
                        Object.keys(this.state.cndata).map((cndatav, i) => {
                            return (
                                <li key={cndatav}>
                                    <h5>{this.state.cndata[ cndatav ]}</h5>
                                    <p>{this.props.dailyData[ cndatav ]}</p>
                                    <span>
                                        <em>昨日</em>
                                        <i>
                                            {
                                                (this.props.dailyData[ cndatav ] && this.props.yesterdayData[ cndatav ])
                                                    ?
                                                    (
                                                        this.props.dailyData[ cndatav ] - this.props.yesterdayData[ cndatav ] > 0
                                                            ? "+" + (this.props.dailyData[ cndatav ] - this.props.yesterdayData[ cndatav ])
                                                            : this.props.dailyData[ cndatav ] - this.props.yesterdayData[ cndatav ]
                                                    )
                                                    :
                                                    0
                                            }
                                        </i>
                                    </span>
                                </li>
                            )
                        })
                    }
                </ul>
            </>
        )
    }
}


export default class Epidemicmap extends Component {

    state = {
        data: {},
        econData: [],
        allData: [],
        econOrAll: "现有确诊",
        firstSearch: 1,
        showCountry: "国内疫情"
    }

    componentDidMount() {
        this.getChinaEpidemic()
    }
    //获取中国疫情数据
    getChinaEpidemic = () => {
        axios({
            url: "/api/project/fymap/ncp2020_full_data.json",
            type: "get",
            params: {
                callback: "jsoncallback"
            },
        }).then((res) => {
            let reg = /{.*}/;
            let jsonStr = res.data.match(reg);
            let resData = JSON.parse(jsonStr).data;
            let list = resData.list;
            let resEconData = []
            let resAllData = []
            list.forEach(function (ele) {
                resEconData.push({
                    name: ele.name,
                    value: ele.econNum
                })
                resAllData.push({
                    name: ele.name,
                    value: ele.value
                })
            })
            this.setState(
                {
                    data: resData,
                    econData: resEconData,
                    allData: resAllData
                }
            )
            this.getCNnowmap()
            this.getCNtrendline()
            this.getCNconfirmbar()
        }).catch((err) => {
            console.log("ChinaEpidemic: ", err);
        });

    }

    //绘制中国地图
    getCNnowmap = () => {
        let chartDom = document.querySelector(".map-china-content");
        let myChart = echarts.init(chartDom);
        if (this.state.firstSearch === 1) {
            myChart = echarts.init(chartDom);
        }
        let option;
        let mapData;
        myChart.hideLoading();
        echarts.registerMap("china", china);
        mapData = this.state.econOrAll === "现有确诊" ? this.state.econData : this.state.allData
        option = {
            title: {
                text: "中国地图",
                subtext: "数据来源：新浪"
            },
            tooltip: {
                show: true,
                formatter: function (arg) {
                    return `<div>地区：${arg.name}<br/>确诊：${arg.value}</div>`
                }
            },
            geo: {
                map: "china",
                zoom: 1.2,
                itemStyle: {
                    areaColor: "#FFF"
                },
                label: {
                    show: "true"
                }
            },
            series: [ {
                type: "map",
                geoIndex: 0,
                data: mapData
            } ],
            visualMap: {
                type: "piecewise",
                pieces: [
                    { min: 0, max: 0, label: "0", color: "#fff" },
                    { min: 1, max: 9, label: "1-9", color: "#ffe4da" },
                    { min: 10, max: 99, label: "10-99", color: "#ff937f" },
                    { min: 100, max: 999, label: "100-999", color: "#ff6c5e" },
                    { min: 1000, max: 9999, label: "1000-9999", color: "#fe3335" },
                    { min: 10000, label: ">=10000", color: "#cd0000" },
                ],
                itemWidth: 10,
                itemHeight: 10,
                itemGap: 2,
                inverse: false
            }
        }

        option && myChart.setOption(option);

    }

    //全国 总确诊/新增境外输入确诊 趋势
    getCNtrendline = () => {
        let chartDom = document.querySelector(".trend-content");
        let myChart = echarts.init(chartDom);
        let option;
        let data = this.state.data
        let xAxisData = []
        let allnew = []
        let newoversea = []
        for (let i = 0; i < 14; i++) {
            xAxisData.unshift(data.historylist[ i ].date)
            allnew.unshift(data.historylist[ i ][ "cn_conNum" ] - data.historylist[ i + 1 ][ "cn_conNum" ])
            newoversea.unshift(data.historylist[ i ][ "cn_jwsrNum" ] - data.historylist[ i + 1 ][ "cn_jwsrNum" ])
        }
        option = {
            tooltip: {
                trigger: "axis"
            },
            legend: {
                data: [ "总新增确诊", "新增境外输入" ]
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: "category",
                boundaryGap: true,
                data: xAxisData
            },
            yAxis: {
                type: "value"
            },
            series: [
                {
                    name: "总新增确诊",
                    type: "line",
                    data: allnew
                },
                {
                    name: "新增境外输入",
                    type: "line",
                    data: newoversea
                }
            ]
        }

        option && myChart.setOption(option);
    }

    //新增确诊分布
    getCNconfirmbar = () => {
        let chartDom = document.querySelector(".confirm-content");
        let myChart = echarts.init(chartDom);
        let option;
        let data = this.state.data.list
        let conData = []
        let xAxisData = []
        let zerodays = []
        for (let i = 0; i < data.length; i++) {
            xAxisData.push(data[ i ].name)
            zerodays.push(data[ i ].zerodays)
            conData.push(data[ i ].adddaily[ "conadd_n" ])
        }
        option = {
            title: {
                subtext: "部分地区名称省略"
            },
            legend: {
                data: [ "本土新增", "归零天数" ]
            },
            tooltip: {
                show: true,
                formatter: function (arg) {
                    return `<div>地区：${arg.name}<br/>${arg.seriesName}：${arg.value}</div>`
                }
            },
            xAxis: {
                type: "category",
                data: xAxisData
            },
            yAxis: {
                type: "value"
            },
            series: [
                {
                    name: "本土新增",
                    data: conData,
                    stack: "one",
                    type: "bar",
                },
                {
                    name: "归零天数",
                    data: zerodays,
                    stack: "one",
                    type: "bar"
                }
            ]
        }

        option && myChart.setOption(option);
    }

    //获取全球疫情数据
    getWorldEpidemic = () => {
        let chart = echarts.init(document.querySelector(".epidemic-world-list"));
        echarts.registerMap("world", world);
        chart.setOption({
            series: [ {
                type: "map",
                map: "world"
            } ]
        });
    }

    changeEconOrAll = (event) => {
        let text = event.target.innerHTML
        if (this.state.econData !== text) {
            this.setState({ econOrAll: text })
            this.getChinaEpidemic()
        }
    }

    changeChinaOrWorld = (event) => {
        let text = event.target.innerHTML
        if (this.state.showCountry !== text) {
            this.setState({ showCountry: text })
        }
    }

    render() {
        return (
            <div className="epidemic-map">
                <div className="epidemic-map-list">
                    <div className="epidemic-map-header">
                        <ul>
                            <li>
                                <span className={this.state.showCountry === "国内疫情" ? "epidemic-map-active" : ""} onClick={(e) => this.changeChinaOrWorld(e)}>国内疫情</span>
                            </li>
                            {/* <li>
                                <span  className={this.state.showCountry === "国外疫情" ? "epidemic-map-active" : ""} onClick={(e) => this.changeChinaOrWorld(e)}>国外疫情</span>
                            </li> */}
                        </ul>
                    </div>
                    <div className={`${this.state.showCountry === "国内疫情" ? "" : "epidemic-map-notshow"}`}>
                        <div className="epidemic-map-details">
                            <h3 className="epidemic-map-title">疫情数据</h3>
                            <h4 className="epidemic-map-time">数据更新<span>{this.state.data.times}</span></h4>
                            <Epidemicmapinfo
                                dailyData={this.state.data.historylist ? this.state.data.historylist[ 0 ] : ""}
                                addData={this.state.data[ "add_daily" ] || ""}
                                yesterdayData={this.state.data.historylist ? this.state.data.historylist[ 1 ] : ""}
                            ></Epidemicmapinfo>
                        </div>
                        <div className="epidemic-map-china">
                            <nav>
                                <span className={this.state.econOrAll === "现有确诊" ? "epidemic-map-active" : ""} onClick={(event) => this.changeEconOrAll(event)}>现有确诊</span>
                                <span className={this.state.econOrAll === "累计确诊" ? "epidemic-map-active" : ""} onClick={(event) => this.changeEconOrAll(event)}>累计确诊</span>
                            </nav>
                            <div className="map-china-title">现有确诊病例，排除治愈、死亡</div>
                            <div className="map-china-content"></div>
                        </div>
                        <div className="epidemic-map-trend">
                            <div className="trend-title">全国 总确诊/新增境外输入确诊 趋势</div>
                            <div className="trend-content"></div>
                        </div>
                        <div className="epidemic-map-confirm">
                            <div className="confirm-title">新增确诊分布</div>
                            <div className="confirm-content"></div>
                        </div>
                    </div>
                    <div className={`${this.state.showCountry === "国外疫情" ? "" : "epidemic-map-notshow"}`}>

                    </div>

                </div>
            </div>
        )
    }
}
