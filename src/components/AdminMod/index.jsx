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
export default class AdminMod extends Component {
    state = {
        listName: [],
        paperno: 0
    }
    checkListName = (item) => {
        this.setState({listName: [item.item,item.i.name]})
    }
    ctp = (paperno) =>{
        this.setState({paperno: paperno})
    }
    render() {
        console.log('user')
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
                        <UserMain listName={this.state.listName} username={ this.props.username } useraccount={ this.props.useraccount } paperno={this.state.paperno} operationPage={this.state.listName[1]} ctp={(paperno) => this.ctp(paperno)}></UserMain>
                    </div></div>
            </>
        )
    }
}