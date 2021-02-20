import React, { Component } from "react"
// import { Link } from "react-router-dom"
import style from "./index.module.css"
/**
 * 
 * 左侧菜单栏
 */
export default class Menu extends Component {
    state = { 
        menu: [
            {
                "title": "用户展示",
                "list": ["show1","show2"]
            },
            {
                "title": "考试试卷",
                "list": ["show3","show4","show5"]
            }
        ]
     }
    render() {
        return (
            <div className={style.menu}>
                <div className={style["menu_list"]}>
                    {/* 123{this.asd}
                    <i className={style["menu_list_icon"]} ></i> */}
                    <ul style={{"listStyle": "none"}}>
                        {
                            this.state.menu.map((item) => {
                                return (
                                    <li key={item.title} className={style["menu_list_block"]}>
                                        <div>{item.title}</div>
                                        <i className={style["menu_list_icon"]} ></i>
                                        <ul>
                                            {
                                                item.list.map((i) => {
                                                    return (
                                                        <li key={i} className={style[ "menu_list_detail" ]}>
                                                            {i}
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </li>
                                )
                            })
                        }
                    </ul>

                </div>
            </div>
        )
    }
}
