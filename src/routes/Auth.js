import React, { Component } from 'react'
import Security from './Security'
import Login from './../Component/Login'

// import { webapi } from './../config/index'


export default class Auth extends Component {

    state = {
        isLogin: false
    }

    componentWillMount() {
        const data = JSON.parse(sessionStorage.getItem('myData'))

        if (data) {
            this.setState({ isLogin: true })
        }
        else {
            this.setState({ isLogin: false })
        }
    }

    Onlogin = () => {
        // window.location.href = '/vh3'
        this.setState({ isLogin: true })
    }
    Onlogout = () => {

        this.setState({ isLogin: false })


        sessionStorage.removeItem("myData");
    }

    render() {
        let { isLogin } = this.state

        return !isLogin ? <Login login={this} /> : <Security logout={this.Onlogout} />
        // return <Security/>

    }
}
