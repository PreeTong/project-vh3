import React, { Component } from 'react'

import { Container, Segment, Header, Input, Button, Icon, Grid } from 'semantic-ui-react/dist/commonjs'

class AuthSystem extends Component {

    state = {
        textinput: {
            search: '',

        },
        active: false,
        messageIsOpen: true,
        messageText: '',

    }

    handleChange = this.handleChange.bind(this)

    handleChange(event, { name, value }) {

        this.setState({
            textinput: {
                ...this.state.textinput,
                [name]: value
                // [event.target.name]: event.target.value

            }
        })
    }

    handleRef = (c) => {
        this.inputRef = c
    }

    OnloadData = () => {
        let { textinput: { search } } = this.state

        console.log(search)
    }

    render() {
        let { textinput: { search } } = this.state

        return (
            <div>
                <Container style={{ marginTop: '5em' }}>
                    <Segment color="blue">
                        <Header as='h2'>
                            Authentication Management System
                            </Header>
                        <Input
                            ref={this.handleRef}
                            required
                            value={search}
                            name="search"
                            placeholder='Search...'
                            onChange={this.handleChange} >
                        </Input>
                        <Button color='blue' onClick={() => this.OnloadData()}>
                            <Icon name='search' />
                            Search
                    </Button>

                        {/* Form */}
                        <Grid columns={2} stackable style={{ marginTop: '2em' }}>
                            <Grid.Column>
                                <Segment color="black">Name : </Segment>
                            </Grid.Column>
                            <Grid.Column>
                                <Segment color="black">EmployeeID : </Segment>
                            </Grid.Column>
                            <Grid.Row columns={3}>
                                <Grid.Column>
                                    <Segment color="black">Division : </Segment>
                                </Grid.Column>
                                <Grid.Column>
                                    <Segment color="black">Department : </Segment>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Segment>

                </Container>
            </div >
        )
    }
}

export default AuthSystem