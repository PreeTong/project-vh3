import React, { Component } from 'react'
import { Container, Header, Divider } from 'semantic-ui-react/dist/commonjs'

import VH3_Header from '../../component/VH3_Header'
import BodyTest from '../../component/BodyTest'
import Test_Loader from '../../component/Test_Loader'


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
          <VH3_Header />
        </Container>
        <Divider />
        {/* <Container style={{ marginTop: '2em' }}> */}
        <BodyTest />
        {/* </Container> */}
        {/* <Container style={{ marginTop: '2em' }}>
        <Test_Loader />
        </Container> */}

      </div>
    )
  }
}

export default Home