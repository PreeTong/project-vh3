import React, { Component } from 'react'
import {
    // Container,
    // Modal,
    // Dimmer,
    // Form,
    Menu,
    Button,
    Image,
    // Segment,
    // Message,
    // Loader
} from 'semantic-ui-react/dist/commonjs'

import { fetchapi } from './../config/index'

import logo from './../logo.svg'
import { NavLink } from "react-router-dom";

class Navbar extends Component {

    state = {
        activeItem: 'home',
        users: null,
        admin: null
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })


    // SetlocalStore = (res) => {
    //     sessionStorage.setItem('myData', res)
    //     const data = JSON.parse(res)
    //     if (data) {
    //         data.map(e =>
    //             this.setState({ users: e })
    //         )
    //     }
    // }


    checkadmin = () => {
        let { users } = this.state
        let items = fetchapi('vh3/checkadmin', users)
        items.then(res => res.json())
            .then(res => {
                if(res){
                    this.setState({
                        admin: true
                    })
                }
                else {
                    this.setState({
                        admin: false
                    })   
                }
            })
        // this.setState({ admin: (Promise.resolve(fetchapi('vh3/checkadmin',users.user_empid))) ? true : false })
    }


    componentWillMount() {
        // console.log("withNavbar componentDidMount")
        const data = JSON.parse(sessionStorage.getItem('myData'))
        if (data) {
            data.map(e =>
                this.setState({ users: e })
            )
            // setTimeout(() => {
            //     this.checkadmin()
            // }, 3000)
        }
        // let test = Promise.resolve(fetchapi())

        // test.then(function (value) {
        //   value.map(e =>
        //     console.log(e.car_licence));
        // });
        // else {
        //   this.setState({ users: null })
        // }
    }
    // componentWillUpdate(nextProps, nextState) {
    //     console.log(nextState)
    // }

    render() {
        let { activeItem, users } = this.state
        return (
            <div>
                {/* 2 */}
                <Menu fixed="top" inverted>
                    <Menu.Item as="a" header>
                        <Image size="mini" src={logo} style={{ marginRight: '1.5em' }} />
                        Project VH3
            </Menu.Item>
                    <Menu.Item
                        name="home"
                        active={activeItem === 'home'}
                        as={NavLink} to="/" content="Home"
                        onClick={this.handleItemClick}
                    />
                    <Menu.Item

                        name="Information"
                        active={activeItem === 'Information'}
                        as={NavLink} to="/vh3information" content="Information VH3"
                        onClick={this.handleItemClick}
                    />
                    <Menu.Item

                        name="summerycar"
                        active={activeItem === 'summerycar'}
                        as={NavLink} to="/summerycar" content="SummeryCar"
                        onClick={this.handleItemClick}
                    />
                    <Menu.Item
                        name="users"
                        active={activeItem === 'users'}
                        as={NavLink} to="/users" content="Users"
                        onClick={this.handleItemClick}
                    />
                    <Menu.Menu position="right">
                        <Menu.Item>
                            {users.user_fnamet + " " + users.user_lnamet}
                        </Menu.Item>
                        <Menu.Item>
                            <Button onClick={() => this.props.logout()}>SignOut</Button>
                        </Menu.Item>
                    </Menu.Menu>
                </Menu>
            </div>
        )
    }
}

export default Navbar