import React, { Component } from 'react'
import { Container, Header, Segment } from 'semantic-ui-react/dist/commonjs'

// import SummeryList from './Module/SummeryList'
// import ModuleDataTable from './Module/DataTable'


export default class SummeryCar extends Component {
  render() {
    return (
      <div>
        <Container style={{ marginTop: '5em' }}>
          <Header size="huge">SUMMERYCAR VEHICLE EXPENSES FORM ( VH 3 )</Header>
        </Container>
        {/* <Container style={{ marginTop: '2em', marginBottom: '2em' }}> */}
          <Segment color="red" >
          <SummeryList />
          </Segment>
        {/* </Container> */}
      </div>
    )
  }
}
