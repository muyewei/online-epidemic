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
    render() {
        console.log('user')
        return (
            <>
                <div className={styles.top}>
                    <UserTopNav><Link to="/login">TOLOGIN</Link></UserTopNav>
                </div>
                <div className={styles.container}>
                    <div className={styles.aside}>
                        <UserMenu></UserMenu>
                    </div>
                    <div className={styles.main}>
                        <UserMain></UserMain>
                    </div></div>

            </>
        )
    }
}