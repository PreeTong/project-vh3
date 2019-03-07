import React from 'react'
//import { Connect, SignIn, SignOut } from '../config/firebase'
import { Link } from 'react-router-dom'

import 'semantic-ui-css/semantic.min.css'
import {
  Modal,
  Dimmer,
  Form,
  Menu,
  Button,
  Image,
  Segment,
  Loader
} from 'semantic-ui-react/dist/commonjs'

import logo from '../logo.svg'



function withSubscription(Wrap, props) {
  return class extends React.Component {
    state = {
      loading: true,
      activeItem: 'home',
      users: null,
      open: false,
      user: {},

    }

    close = () => this.setState({ open: false })

    OnSubmit = () => this.Submit()

    closeConfigShow = (closeOnEscape, closeOnDimmerClick) => () => {
      this.setState({ closeOnEscape, closeOnDimmerClick, open: true })
    }


    handleItemClick = (e, { name }) => this.setState({ activeItem: name })



    handleChange = this.handleChange.bind(this)

    handleChange(event) {
      this.setState({
        user: {
          ...this.state.user,
          [event.target.name]: event.target.value
        }
      })
    }

    Submit() {
      // fetch('https://reqres.in/api/login', {
      fetch('http://wwit.ddns.net:8250/api/login', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "user": "akekarach_mit@ww.co.th",
          "pass": "01014684"
          // "email": "peter@klaven",
          // "password": "cityslicka"
        })
      }).then((res) => {
        if (res.status === 200) {
          this.setState({ message: "SUCCESSS" })
          console.log("SUCCESSS")
          return res.json();
        }
        else if (res.status === 400) {
          console.log("Missing password")
        }
        else if (res.status === 522) {
          console.log("Server Not Found!!!!")
        }
      })
        .then(res => this.SetlocalStore(res));

      this.setState({ open: false })
    }

    SetlocalStore = (res) => {
      sessionStorage.setItem('myData', res)
      const data = JSON.parse(res)
      if (data) {
        data.map(e =>
          this.setState({ users: e })
        )
      }
    }

    componentDidMount() {
      console.log("withNavbar componentDidMount")
      const data = JSON.parse(sessionStorage.getItem('myData'))
      if (data) {
        data.map(e =>
          this.setState({ users: e })
        )
      } 
      // else {
      //   this.setState({ users: null })
      // }
    }

    // componentWillMount() {
    //   const data = JSON.parse(sessionStorage.getItem('myData'))
    //   if (data) {
    //     data.map(e =>
    //       this.setState({ users: e })
    //     )
    //   } else {
    //     this.setState({ users: null })
    //   }
    // }

    // componentDidUpdate(prevState) {
    //   if(prevState.users){
    //     const data = JSON.parse(sessionStorage.getItem('myData'))
    //     if (data) {
    //       data.map(e =>
    //         this.setState({ users: e })
    //       )
    //     } else {
    //       this.setState({ users: null })
    //     }
    //   }
    // }
    componentDidUpdate(prevProps, prevState) {
      console.log(prevState)
      console.log("withNavbar componentDidUpdate")
    }
    componentWillUpdate(nextProps, nextState) {
      console.log(nextState)
      console.log("withNavbar componentWillUpdate")
    }

    render() {

      let { activeItem, users, open, closeOnEscape, closeOnDimmerClick } = this.state
      let onload
      console.log("withNavbar render")
      if (users) {
        // console.log(users)
        onload = (
          <span>
            users ? <Wrap data={users} />
          </span>
        )
      } else {
        onload = (
          <Segment style={{ margin: '5em 0em 0em', padding: '25em 0em' }}>
            <Dimmer active inverted>
              <Loader inverted>Loading</Loader>
            </Dimmer>
          </Segment>
        )
      }

      return (
        <div id="center">
        {console.log("return render")}
          <Menu fixed="top" inverted>
            <Menu.Item as="a" header>
              <Image size="mini" src={logo} style={{ marginRight: '1.5em' }} />
              Project VH3
            </Menu.Item>
            <Menu.Item
              name="home"
              active={activeItem === 'home'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name="messages"
              active={activeItem === 'messages'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name="friends"
              active={activeItem === 'friends'}
              onClick={this.handleItemClick}
            />
            <Menu.Menu position="right">

              <Menu.Item>
                {users ? (
                  <div>
                    {users.user_fnamet + " " + users.user_lnamet}
                  </div>
                ) : (
                    <div></div>
                  )}
              </Menu.Item>


              <Menu.Item>
                {users ? (
                  <Button >SignOut</Button>
                ) : (

                    <Modal trigger={<Button onClick={this.closeConfigShow(false, true)}>SignIn</Button>}
                      size='tiny'
                      open={open}
                      closeOnEscape={closeOnEscape}
                      closeOnDimmerClick={closeOnDimmerClick}
                      onClose={this.close}>
                      <Modal.Header >Log In</Modal.Header>
                      <Modal.Content>
                        <Modal.Description>
                          <Form>
                            <Form.Group widths="equal">
                              <Form.Input
                                required
                                fluid
                                name="email"
                                label="E-Mail"
                                placeholder="E-Mail"
                                onChange={this.handleChange}
                              />
                            </Form.Group>
                            <Form.Group widths="equal">
                              <Form.Input
                                required
                                fluid
                                type="password"
                                name="email"
                                label="Password"
                                placeholder="Password"
                                onChange={this.handleChange}
                              />
                            </Form.Group>
                          </Form>
                        </Modal.Description>
                      </Modal.Content>
                      <Modal.Actions>
                        <Button
                          icon="react"
                          labelPosition='right'
                          content="Submit"
                          onClick={this.OnSubmit}
                        />
                      </Modal.Actions>
                    </Modal>
                  )}
              </Menu.Item>
            </Menu.Menu>
          </Menu>
          {onload}
        </div>
      )
    }
  }
}

export default withSubscription