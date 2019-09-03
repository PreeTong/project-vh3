import React, { Component } from 'react'
import { Button, Form, Grid, Header, Segment, Message } from 'semantic-ui-react'

import { webapi } from './../config/index'

export default class Login extends Component {

    state = {
        messageIsOpenNegative: true,
        userlogin: {
            user: '',
            pass: ''
            // user: "akekarach_mit@ww.co.th",
            // pass: "01014684"
        }
    }

    handleOpen = () => this.setState({ modalOpen: true })

    handleClose = () => this.setState({ modalOpen: false })

    handleChange = this.handleChange.bind(this)

    handleChange(event) {
        this.setState({
            userlogin: {
                ...this.state.userlogin,
                [event.target.name]: event.target.value
            }
        })
    }

    Submit() {
        let { userlogin } = this.state
        // console.log(userlogin)
        // fetch('https://www.digime.space:8251/api/login', {
        fetch(webapi + 'login', {
            // fetch('https://www.digime.space:8250/api/login', {
            // fetch('http://wwit.ddns.net:8250/api/login', {

            // mode: 'no-cors',
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({

                user: userlogin.user,
                pass: userlogin.pass
                // user: "akekarach_mit@ww.co.th",
                // pass: "01014684"
            })
        }).then((res) => {
            if (res.status === 200) {
                return res.json();
            }
            else if (res.status === 400) {
                console.log("Missing password")
            }
            else if (res.status === 522) {
                console.log("Server Not Found!!!!")
            }
            else if (res.status === 500) {
                console.log("Internal Server Error!!!!")
            }
        })
            .then(res => {
                // console.log(res)
                if (res !== '[]') {
                    this.setState({ messageText: "SUCCESSS", messageIsOpenNegative: true })
                    this.SetlocalStore(res)
                    this.props.login.Onlogin()
                }
                else {
                    this.setState({ messageText: "Email or Password No SUCCESSS", messageIsOpenNegative: false })
                }
                // this.SetlocalStore(res)

            });

        this.setState({ open: false })
    }



    SetlocalStore = (res) => {

        const data = JSON.parse(res)

        // console.log(data[0].user_empid)

        // let items = fetchapi('vh3/checkrole', { search: data[0].user_empid, process: 'checkrole' })

        sessionStorage.setItem('myData', res)
        if (data) {
            data.map(e =>
                this.setState({ users: e })
            )
        }
    }

    componentWillReceiveProps(nextProps) {
        // let { data } = this.state
        console.log(nextProps)
    }
    render() {

        const { messageText, messageIsOpenNegative, userlogin: { user, pass } } = this.state

        return (
            <div className='login-form'>
                {/*
      Heads up! The styles below are necessary for the correct render of this example.
      You can do same with CSS, the main idea is that all the elements up to the `Grid`
      below must have a height of 100%.
    */}
                <style>{`
      body > div,
      body > div > div,
      body > div > div > div.login-form {
        height: 100%;
      }
    `}
                </style>

                <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <Header as='h2' color='teal' textAlign='center'>
                            Log-in to your account VH3
        </Header>
                        <Form size='large'>
                            <Segment stacked>
                                <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' name="user" value={user} onChange={this.handleChange} />
                                <Form.Input
                                    fluid
                                    icon='lock'
                                    iconPosition='left'
                                    placeholder='Password'
                                    type='password'
                                    name="pass"
                                    value={pass}
                                    onChange={this.handleChange}
                                />

                                <Button color='teal' fluid size='large' onClick={() => this.Submit()}>
                                    Login
            </Button>
                            </Segment>

                            <Message hidden={messageIsOpenNegative} negative>{messageText}</Message>
                        </Form>
                        {/* <Message>
                            New to us? <a href='#'>Sign Up</a>
                        </Message> */}
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}
