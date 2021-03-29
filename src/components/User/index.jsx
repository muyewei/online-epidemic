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
        listName: []
    }
    checkListName = (item) => {
        console.log("checkListName", item)
        this.setState({listName: [item.item,item.i.name]})
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
                        <UserMain listName={this.state.listName}></UserMain>
                    </div></div>

            </>
        )
    }
}