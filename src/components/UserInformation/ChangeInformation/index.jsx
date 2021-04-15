import React, {Component} from "react"
import style from "./index.module.css"

export default class ChangeInformation extends Component{
    initPassword = React.createRef()
    newPassword = React.createRef()
    repeatPassword = React.createRef()
    state = {
        repeat: "none",
        warnword: ""
    }
    render(){
        return (
            <div className={style["changeinformation"]}>
                <div className={style["cileft"]}>
                    <div>个人信息</div>
                    <hr/>
                    <div className={style["head"]}>
                        <img src={process.env.PUBLIC_URL + "/image/head/local.png"} alt="头像.jpg"/>
                    </div>
                    <hr/>
                    <div>简介</div>
                    <div>
                        无
                    </div>
                </div>
                <div className={style["ciright"]}>
                    <div>账号</div>
                    <div>
                        <div>
                            <p>用户名</p>
                            <input type="text" value={this.props.username}/>
                        </div>
                        <div>
                            <button>更新</button>
                        </div>    
                    </div>
                </div>
            </div>
        )
    }
}