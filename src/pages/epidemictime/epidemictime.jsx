import React, { Component } from 'react'
import { Timeline } from 'antd'
import "./epidemictime.css"
import axios from "axios"
export default class epidemictime extends Component {
    state = {
        timelist: [],
        timeday: "",
        timeall: {},
        listnum: 0
    }
    componentDidMount() {
        axios.get('/time/data/json/NcovTimeline/data__desc_1.json')
            .then((res) => {
                let data = res.data.data
                let timelistmode = this.state.timelist
                let timeallcopy = this.state.timeall
                timelistmode.push.apply(timelistmode,data)
                
                for (let i = 0; i < 100; i++){
                    if (!timeallcopy[ data[ i ][ "time_point" ] ]) {
                        timeallcopy[ data[ i ][ "time_point" ] ] = []
                    }
                    timeallcopy[ data[ i ][ "time_point" ] ].push({
                        id: data[ i ][ "id" ],
                        event: data[ i ][ "event" ],
                        remark: data[ i ][ "remark" ]
                    })
                }
                this.setState({timelist: timelistmode,timeall:timeallcopy})
        })
    }
    render() {
        return (
            <div className="epidemic-time">
                <div className="epidemic-time-line">
                    <h1>数据来源：<a target="_blank" rel="noopener noreferrer" href="https://m.mp.oeeee.com/h5/pages/v20/nCovTimeline/?from=singlemessage&amp;isappinstalled=0&amp;dt_platform=wechat_friends&amp;dt_dapp=1">南方都市报</a></h1>
                    <Timeline mode="left">
                        {

                            Object.keys(this.state.timeall).map((v,i) => {
                                return (
                                    <Timeline.Item
                                        key={v.split(" ")[0].split("-").join("")}
                                        dot={<div style={{ border: "2px blue solid", borderRadius: "15px", width: "15px", height: "15px" }}></div>}
                                        style={{ paddingBottom: "50px" }}
                                        className="epidemic-time-item"
                                        label={v.split(" ")[0]}
                                    >   
                                        {
                                            this.state.timeall[ v ].map((v) => {
                                                return (
                                                    <div className="epidemic-time-item-title" key={v.id}>
                                                        <div>
                                                            {v.event}
                                                        </div>
                                                        <div  className="epidemic-time-item-all">
                                                            {v.remark}
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                        
                                    </Timeline.Item>
                                )
                            })
                        }
                    </Timeline>
                </div>
                
            </div>
        )
    }
}

                            // this.state.timelist.map((v, i) => {
                            //     return (
                            //         <Timeline.Item
                            //             key={v.id}
                            //             dot={<div style={{ border: "2px blue solid", borderRadius: "15px", width: "15px", height: "15px" }}></div>}
                            //             style={{ paddingBottom: "50px" }}
                            //             className="epidemic-time-item"
                            //             label={v["time_point"].split(" ")[0]}
                            //         >
                            //             <div className="epidemic-time-item-title">
                            //                 <div>
                            //                     {v.event}
                            //                 </div>
                            //                 <div  className="epidemic-time-item-all">
                            //                     {v.remark}
                            //                 </div>
                            //             </div>
                            //         </Timeline.Item>
                            //     )
                            // })


