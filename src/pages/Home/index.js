import React, { Component } from 'react'
import { Container, Header, Divider } from 'semantic-ui-react/dist/commonjs'

// import VH3_Header from '../../component/VH3_Header'
import BodyTest from './../../Component/BodyTest'
import Test_Header from '../../Component/Test_Header'


class Home extends Component {

  state = {
    data: null
  }


  render() {
    // let res = sessionStorage.getItem('myData')
    // console.log(res.token)
    return (
      <div>
        <Container style={{ marginTop: '5em' }}>
          <Header size="huge">VEHICLE EXPENSES FORM ( VH 3 )</Header>
        </Container>
        <Container style={{ marginTop: '2em', marginBottom: '2em' }}>
          <Test_Header />
        </Container>
        <Divider />
       
        <BodyTest />

      </div>
    )
  }
}

export default Home