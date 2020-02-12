import React, { Component } from 'react'
import { Container, Grid, List, Image, Header, Segment, Form, Menu, Icon } from 'semantic-ui-react/dist/commonjs'

// import no_photo from './../image/no_photo.png'

// import Cookies from 'universal-cookie';

// const cookies = new Cookies();

import { fetchapi } from './../config/index'

export default class Users extends Component {

  state = {
    search: '',
    data: null,
    activeItem: '1',
    num: 1,
    to: 12,
  }

  handleRef = (c) => {
    this.inputRef = c
  }

  focus = () => {
    this.inputRef.focus()
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value }, () => { this.searchData() })
  handleItemClick = (number) => this.setState({ num: number, activeItem: number })

  searchData = () => {

    // let { search } = this.state

    // let items = fetchapi('', { search: search })
    // console.log(this.state)
  }


  componentDidMount() {
    // console.log('object')
    let items = fetchapi('user/usersall')
    items.then(res => res.json())
      .then(res => this.setState({ data: res }))

  }
  renderMunu = () => {
    let { data, activeItem, to } = this.state
    if (data) {
      let num = Math.ceil(data.length / to)


      let numData = 1
      let renderMunuData = []

      if (data.length !== 0) {

        for (numData; numData <= num; numData++) {

          let i = numData;
          renderMunuData.push(<Menu.Item key={i} name={`${i}`} active={activeItem === `${i}`} onClick={() => this.handleItemClick(i)} />)

        }
        return (
          <Menu floated='right' pagination >
            {renderMunuData}
          </Menu>
        )

      }
      else {
        return (
          <Menu floated='right' pagination>
            <Menu.Item as='a' icon>
              <Icon name='chevron left' />
            </Menu.Item>
            <Menu.Item as='a' icon>
              <Icon name='chevron right' />
            </Menu.Item>
          </Menu>
        )
      }
    }

  }

  renderData = () => {
    let { data, to, num } = this.state
    let Data = []
    // link_pic = 

    if (data) {
      Data.push(data.slice((to * num) - to, (to * num)).map((items, key) => (
        <Grid.Column key={key}>
          <List>
            <List.Item>
              <Image src={`https://rm.wwit.info/storage/image/empimg/${items.user_empid}.jpg`} size='tiny' circular />
              <List.Content>
                <List.Header as='a'>{items.user_inite+ ' ' + items.user_fnamee + '  ' + items.user_lnamee}</List.Header>
                <List.Description >
                  {items.user_initt + items.user_fnamet + '  ' + items.user_lnamet}
                </List.Description>
              </List.Content>
            </List.Item>
          </List>
        </Grid.Column>
      )))
    }

    return Data
  }

  render() {
    return (
      <div>
        <Container style={{ marginTop: '5em' }}>
          <Header size="huge"> User Management </Header>
        </Container>
        <Container style={{ marginTop: '1em' }}>
          <Segment color="red">
            <Form>
              <Form.Group widths='equal'>
                <Form.Input
                  // ref={this.handleRef}
                  fluid
                  name="search"
                  label='Search'
                  onChange={this.handleChange}
                  placeholder='Search...' />
              </Form.Group>
            </Form>
            <Grid columns={3} divided>
              <Grid.Row >
                {this.renderData()}
              </Grid.Row>
            </Grid>
            {this.renderMunu()}
          </Segment>
        </Container>
      </div>
    )

  }
}
