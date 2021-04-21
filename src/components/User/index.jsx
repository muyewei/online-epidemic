import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import UserTopNav from '../UserTopNav'
import UserMenu from '../UserMenu'
import UserMain from '../UserMain'
import styles from './index.module.css'
/**
 * 
 * 顶部菜单栏
 */
export default class User extends Component {
    state = {
        listName: [],
        paperno: 0,
        questionno: 0
    }
    checkListName = (item) => {
        this.setState({listName: [item.item,item.i.name]})
    }
    ctp = (paperno) =>{
        let ln = this.state.listName
        ln[1] = "创建试卷"
        this.setState({paperno: paperno, listName: ln})
    }
    ctpq = (questionno) =>{
        let ln = this.state.listName
        ln[1] = "创建题目"
        this.setState({questionno: questionno, listName: ln})
    }
    render() {
        // console.log('user')
        return (
            <>
                <div className={styles.top}>
                    <UserTopNav><Link to="/login">TOLOGIN</Link></UserTopNav>
                </div>
                <div className={styles.container}>
                    <div className={styles.aside}>
                        <UserMenu username={this.props.username} menu={this.props.menu} callListName={this.checkListName}></UserMenu>
                    </div>
                    <div className={styles.main}>
                        <UserMain identify={this.props.identify} listName={this.state.listName} account={this.props.account} username={this.props.username} paperno={this.state.paperno} operationPage={this.state.listName[1]} ctp={(paperno) => this.ctp(paperno)} ctpq={(questionno)=>this.ctpq(questionno)}></UserMain>
                    </div>
                </div>
            </>
        )
    }
}