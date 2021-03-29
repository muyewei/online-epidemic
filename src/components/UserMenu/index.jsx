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
        ],
        itemValue: ""
    }
    componentDidMount = () => {
        console.log("menu: ", this.props)
    }
    showItem = (value) => {
        if (this.state.itemValue === value) {
            this.setState({itemValue: ""})
        } else {
            this.setState({itemValue: value})
        }
        
    }

    detailContent = (item,i) => {
        this.props.callListName({item,i})
        console.log(item,i)
    }
    render() {
        return (
            <div className={style.menu}>
                <div className={style["menu_list"]}>
                    {/* 123{this.asd}
                    <i className={style["menu_list_icon"]} ></i> */}
                    <div className={style.userDetail}>{ this.props.username }</div>
                    <ul style={{"listStyle": "none"}}>
                        {
                            this.props.menu.map((item) => {
                                return (
                                    <li key={item.title} className={`${style["menu_list_block"]} ${this.state.itemValue === item.title ? style["menu_detail_show"]: ""}`} onClick={() => this.showItem(item.title)}>
                                        <div>{item.title}</div>
                                        <i className={style["menu_list_icon"]} ></i>
                                        <ul>
                                            {
                                                item.list.map((i) => {
                                                    return (
                                                        <li key={i.name} className={style[ "menu_list_detail" ]} onClick={() => this.detailContent(item.title,i)}>
                                                            {i.name}
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
