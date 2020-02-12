import React, { Component } from 'react'
import { Button, Form, Grid, Header, Segment, Modal } from 'semantic-ui-react'

import { webapi } from './../config/index'


export default class Register extends Component {

    state = {
        userlogin: {
            emp_id: '',
            password: '',
            confirm_password: ''
        }
    }

    handleChange = this.handleChange.bind(this)

    handleChange(event) {
        this.setState({
            userlogin: {
                ...this.state.userlogin,
                [event.target.name]: event.target.value
            }
        })
    }

    SubmitsearchEmail = () => {
        let { userlogin } = this.state
        fetch(webapi + 'register', {
            method: 'get',
            headers: {
                'Content-Type': 'application/json'
            },
            // body: JSON.stringify({
            //     userlogin
            // })
        })
    }


    render() {
        let { userlogin: { emp_id, password, confirm_password } } = this.state
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
                            Register to account VH3
        </Header>
                        <Form size='large'>
                            <Segment stacked>
                                <Form.Input
                                    fluid
                                    icon='user'
                                    iconPosition='left'
                                    placeholder='User Employee'
                                    type='text'
                                    name="emp_id"
                                    value={emp_id}
                                    onChange={this.handleChange}
                                />
                                <Form.Input
                                    fluid
                                    icon='lock'
                                    iconPosition='left'
                                    placeholder='Password'
                                    type='password'
                                    name="password"
                                    value={password}
                                    onChange={this.handleChange}
                                />
                                <Form.Input
                                    fluid
                                    icon='lock'
                                    iconPosition='left'
                                    placeholder='Confirm Password'
                                    type='password'
                                    name="confirm_password"
                                    value={confirm_password}
                                    onChange={this.handleChange}
                                />
                                <Button color='teal' fluid size='large' onClick={() => this.SubmitsearchEmail()}>
                                    Submit
            </Button>
                            </Segment>
                        </Form>
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}
