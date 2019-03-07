import React, { Component } from 'react'
import {
  Header,
  // Form,
  Segment,
  Grid,
  // Select,
  Dimmer,
  Loader,
  Image
} from 'semantic-ui-react/dist/commonjs'

import img from '../image/media-paragraph.png'

// const options = [
//   { key: 1, text: 'Gasohol 95', value: 'Gasohol 95' },
//   { key: 2, text: 'Gasohol 91', value: 'Gasohol 91' },
//   { key: 3, text: 'Diesel', value: 'Diesel' },
//   { key: 4, text: 'E85', value: 'E85' },
//   { key: 5, text: 'E20', value: 'E20' },
//   { key: 6, text: 'NGV', value: 'NGV' },
// ]

class VH3_Header extends Component {
  state = {
    uid: null,
    form: {
      name: null,
      employeeId: null,
      division: null,
      department: null,
      register_no: null,
      brand: null,
      model: null,
      color: null,
      fuel_type: null
    },
    active: true,
    data: null,
    user: null
  }

  handleChange = this.handleChange.bind(this)

  componentDidMount = () => {
    this.setState({ user: JSON.parse(sessionStorage.getItem('myData')) },
      () => {
        let { user } = this.state
        user.map(e => this.setState({ uid: e.user_empid }, () => this.onLoadData()))
      })
  }

  handleChange(event, { name, value }) {
    // console.log(event)
    this.setState({
      form: {
        ...this.state.form,
        [name]: value
      }
    })
  }

  onClick = () => {
    let { form } = this.state

    fetch('http://localhost:8250/api/vh3/save_header', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    }).then(res => res.json())
      .then(res => console.log(res))

    setTimeout(() => {
      this.onLoadData()
    }, 1000)
  }

  onLoadData = () => {
    let { uid } = this.state
    // console.log(uid)
    fetch(`http://wwit.ddns.net:8250/api/vh3/get_header/${uid}`)
      .then(res => res.json())
      // .then(res => console.log(res))
      .then(function (res) {
        // console.log(res);
        this.setState({ data: res })
        this.setform()
      }.bind(this))
  }

  setform = () => {
    let { data } = this.state
    data.map(e =>
      this.setState({
        form: {
          name: e.user_initt + e.user_fnamet + " " + e.user_lnamet,
          employeeId: e.user_empid,
          division: e.department,
          department: e.department,
          register_no: e.licence_plate_num,
          brand: e.car_brand,
          // model: null,
          // color: null,
          fuel_type: e.product
        }, active: false
      }))
  }

  render() {
    let { data, form: { name, employeeId, division, department, register_no, brand, fuel_type }, active } = this.state
    let load
    // console.log(data)
    if (data) {
      load = (
        <span>
          <Grid columns={2} stackable>
            <Grid.Column>
              <Segment color="black">Name : {name}</Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment color="black">EmployeeID : {employeeId}</Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment color="black">Division : {division}</Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment color="black">Department : {department}</Segment>
            </Grid.Column>
            <Grid.Row columns={3}>
              <Grid.Column>
                <Segment color="black">
                  Register No. : {register_no}
                </Segment>
              </Grid.Column>
              <Grid.Column>
                <Segment color="black">Brand : {brand}</Segment>
              </Grid.Column>
              {/* <Grid.Column>
                <Segment color="black">Model : {form.model}</Segment>
              </Grid.Column>
              <Grid.Column>
                <Segment color="black">Color : {form.color}</Segment>
              </Grid.Column> */}
              <Grid.Column>
                <Segment color="black">Fuel Type : {fuel_type}</Segment>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </span>
      )
    } else {
      load = (
        <span>
          <Image src={img} fluid />
        </span>
      )
    }
    // } else {
    //   load = (
    //     <span>
    //       <Form>
    //         <Form.Group widths="equal">
    //           <Form.Input
    //             required
    //             fluid
    //             name="name"
    //             label="Name"
    //             placeholder="Name"
    //             onChange={this.handleChange}
    //           />
    //           <Form.Input
    //             required
    //             fluid
    //             name="employeeId"
    //             label="Employee ID"
    //             placeholder="Employee ID"
    //             onChange={this.handleChange}
    //           />
    //         </Form.Group>
    //         <Form.Group widths="equal">
    //           <Form.Input
    //             required
    //             fluid
    //             name="division"
    //             label="Division"
    //             placeholder="Division"
    //             onChange={this.handleChange}
    //           />
    //           <Form.Input
    //             required
    //             fluid
    //             name="department"
    //             label="Department"
    //             placeholder="Department"
    //             onChange={this.handleChange}
    //           />
    //         </Form.Group>
    //         <Form.Group widths="equal">
    //           <Form.Input
    //             required
    //             fluid
    //             name="register_no"
    //             label="Register No. :"
    //             placeholder="Register No....."
    //             onChange={this.handleChange}
    //           />
    //           <Form.Input
    //             required
    //             fluid
    //             name="brand"
    //             label="Brand"
    //             placeholder="Brand"
    //             onChange={this.handleChange}
    //           />
    //           <Form.Input
    //             required
    //             fluid
    //             name="model"
    //             label="Model"
    //             placeholder="Model"
    //             onChange={this.handleChange}
    //           />
    //           <Form.Input
    //             required
    //             fluid
    //             name="color"
    //             label="Color"
    //             placeholder="Color"
    //             onChange={this.handleChange}
    //           />
    //           {/* <Form.Input
    //             required
    //             fluid
    //             name="fuel_type"
    //             label="Fuel Type"
    //             placeholder="Fuel Type"
    //             onChange={this.handleChange}
    //           /> */}
    //           <Form.Field name="fuel_type" control={Select} label='Fuel Type' options={options} placeholder='Fuel Type' onChange={this.handleChange} />
    //         </Form.Group>
    //         <Form.Group>
    //           <Form.Button color="red" onClick={() => this.onClick()}>
    //             Submit
    //           </Form.Button>
    //         </Form.Group>
    //       </Form>
    //       {/* <strong>onChange:</strong>
    //       <pre>{JSON.stringify({ form }, null, 2)}</pre> */}
    //     </span>
    // )


    return (
      <div>
        <Dimmer.Dimmable dimmed={active}>
          <Dimmer inverted active={active}>
            <Loader size='large'>Loading</Loader>
          </Dimmer>
          <Segment color="red">
            <Header size="huge">HEADER</Header>
            {load}
          </Segment>
        </Dimmer.Dimmable>
      </div>
    )
  }
}

export default VH3_Header
