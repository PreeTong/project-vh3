import React, { Component } from 'react'
import { Container, Header } from 'semantic-ui-react/dist/commonjs'

export default class Messages extends Component {
    render() {
        return (
            <div>
                <Container style={{ marginTop: '5em' }}>
                    <Header size="huge">Hello</Header>
                </Container>
            </div>
        )
    }
}
