import React, { Component } from 'react'
import { connect } from "react-redux"
import Normalmod from "../../components/NormalMod"
import Papertest from "../../components/PaperTest"
import './index.css'

class Normal extends Component {
    state = {
        test: false,
        paperno: 0
    }
    gobackmod = ()=>{
        this.setState({test: false})
    }
    gototest = (paperno)=>{
        this.setState({test: true,paperno})
    }
    render() {
        return (
            <div>
                {
                    this.state.test === false ?
                    <Normalmod gototest={this.gototest} history={this.props.history}></Normalmod> :
                    <Papertest gobackmod={this.gobackmod} username={this.props.loginState.username} useraccount={this.props.loginState.useraccount} paperno={this.state.paperno}></Papertest>
                }
            </div>
        )

    }
}

export default connect(
    state => ({ loginState: state.login }),
)(Normal)