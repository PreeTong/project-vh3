import React, { Component } from 'react'
import {
    Header,
    Dimmer,
    Segment,
    Grid,
    Loader,
} from 'semantic-ui-react/dist/commonjs'

export default class Test_Loader extends Component {

    state = { active: true }


    componentDidMount() {
        setTimeout(() => {
            this.setState({ active: false })
        }, 3000)
    }

    render() {
        const { active } = this.state
        return (
            <div>
                <Dimmer.Dimmable as={Segment} dimmed={active}>
                    <Header as='h3'>Overlayable Section</Header>
                    <Grid columns={2} stackable>
                        <Grid.Column>
                            <Segment color="black">Name : Tong</Segment>
                        </Grid.Column>
                        <Grid.Column>
                            <Segment color="black">EmployeeID : 535021000281</Segment>
                        </Grid.Column>
                        <Grid.Column>
                            <Segment color="black">Division : CDS</Segment>
                        </Grid.Column>
                        <Grid.Column>
                            <Segment color="black">Department : DSS</Segment>
                        </Grid.Column>
                        <Grid.Row columns={3}>
                            <Grid.Column>
                                <Segment color="black">
                                    Register No. : 33221
                                </Segment>
                            </Grid.Column>
                            <Grid.Column>
                                <Segment color="black">Brand : TOYOTA</Segment>
                            </Grid.Column>
                            <Grid.Column>
                                <Segment color="black">Fuel Type : Diesel</Segment>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    <Dimmer active={active}>
                        <Loader>Loading</Loader>
                    </Dimmer>
                </Dimmer.Dimmable>
            </div>
        )
    }
}
