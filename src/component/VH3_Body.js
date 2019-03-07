import React, { Component } from 'react'
import {
    Button,
    Form,
    Table,
    Popup,
    Header,
    Segment,
    Icon
} from 'semantic-ui-react/dist/commonjs'


const FromStyleGroup = {
    //height: "100px",
    overflow: 'scroll'
}

export default class vh3_body extends Component {
    state = {
        dateTable: null,
        displayName: '',
        email: '',
        uid: '',
        form: {
            des: '',
            check_out: '',
            data_time_out: '',
            check_in: '',
            data_time_in: '',
            rm_no: '',
            litr: '',
            bath: '',
            expressway: '',
            otherexpress: ''


        },
        arr: [],
        dataArr: [
            "Saab",
            "Volvo",
            "BMW"]
    }

    handleChange = this.handleChange.bind(this)

    handleChange(event) {
        this.setState({
            form: {
                ...this.state.form,
                [event.target.name]: event.target.value
            }
        })
    }

    submitFrom() {
        let { dataArr, arr } = this.state
        // Check ค่า if() ตรงนี้
        // console.log(dataArr)
        fetch('http://localhost:8250/api/vh3/save_description', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(arr)
        }).then(res => res.json())
            .then(res => console.log(res))
        // this.firebasesavedata()
    }


    checkmarktable() { }



    onClick() {
        this.setState({
            form: {
                des: '',
                check_out: '',
                data_time_out: '',
                check_in: '',
                data_time_in: '',
                rm_no: '',
                litr: '',
                bath: '',
                carpark: '',
                expressway: '',
                otherexpress: ''
            }
        })
    }

    addtabledetail() {
        this.setState({
            arr: [this.state.form, ...this.state.arr]
        })

        setTimeout(() => {
            this.addtable()
        }, 300)
    }

    addtable() {
        let { arr } = this.state
        const listItems = arr.map((number, key) => (
            <Table.Row key={key}>
                <Table.Cell>{key + 1}</Table.Cell>
                <Table.Cell>{number.des}</Table.Cell>
                <Table.Cell>{number.check_out}</Table.Cell>
                <Table.Cell>{number.data_time_out}</Table.Cell>
                <Table.Cell>{number.check_in}</Table.Cell>
                <Table.Cell>{number.data_time_in}</Table.Cell>
                <Table.Cell>{number.rm_no}</Table.Cell>
                <Table.Cell>{number.litr}</Table.Cell>
                <Table.Cell>{number.bath}</Table.Cell>
                <Table.Cell>{number.carpark}</Table.Cell>
                <Table.Cell>{number.expressway}</Table.Cell>
                <Table.Cell>{number.otherexpress}</Table.Cell>

                <Table.Cell>
                    {/* <Popup
                        trigger={
                            <Button
                                size="mini"
                                icon="edit"
                            // onClick={}
                            />
                        }
                        content="Edit"
                    />
                    <Popup
                        trigger={
                            <Button
                                size="mini"
                                icon="copy"
                            // onClick={}
                            />
                        }
                        content="Copy"
                    /> */}
                    <Popup
                        trigger={
                            <Button
                                size="mini"
                                icon="cancel"
                                onClick={() => this.canceltable(key)}
                            />
                        }
                        content="Cancel"
                    />
                </Table.Cell>
            </Table.Row>
        ))

        setTimeout(() => {
            this.setState({
                dateTable: listItems,
                loading: false,
                form: {
                    des: '',
                    check_out: '',
                    data_time_out: '',
                    check_in: '',
                    data_time_in: '',
                    rm_no: '',
                    litr: '',
                    bath: '',
                    carpark: '',
                    expressway: '',
                    otherexpress: ''
                }
            })
        }, 300)
    }

    canceltable(index) {
        let datas = this.state.arr
        datas.splice(index, 1)
        datas.sort()
        this.setState({
            arr: datas,
            loading: true
        })
        console.log(this.state.arr)
        this.addtable(this.state.arr)
    }

    componentDidMount() {
    }


    render() {
        let {
            arr, form: { des, check_out, data_time_out, check_in, data_time_in, rm_no, litr, bath, expressway, carpark, otherexpress }
        } = this.state

        return (
            <div>
                <Segment color="red">
                    <Header size="huge"> DESCRIPTION </Header>


                    {/* Form  */}
                    <Form>
                        <Form.Group widths="equal">
                            <Form.Input
                                required
                                fluid
                                name="des"
                                value={des}
                                onChange={this.handleChange}
                                label="OBJECTIVE / DESCRIPTION"
                                placeholder="OBJECTIVE / DESCRIPTION"
                            />
                        </Form.Group>
                        <Form.Group widths="equal">
                            <Form.Input
                                required
                                fluid
                                name="check_out"
                                value={check_out}
                                onChange={this.handleChange}
                                label="CHECK OUT"
                                placeholder="CHECK OUT"
                            />

                            <Form.Input
                                required
                                fluid
                                name="data_time_out"
                                value={data_time_out}
                                type="datetime-local"
                                data-date-format="DD MMMM YYYY"
                                onChange={this.handleChange}
                                label="DATE-TIME"
                            />
                            <Form.Input
                                required
                                fluid
                                name="check_in"
                                value={check_in}
                                onChange={this.handleChange}
                                label="CHECK IN"
                                placeholder="CHECK IN"
                            />
                            <Form.Input
                                required
                                fluid
                                name="data_time_in"
                                value={data_time_in}
                                type="datetime-local"
                                data-date-format="DD MMMM YYYY"
                                onChange={this.handleChange}
                                label="DATE-TIME"
                            />
                        </Form.Group>
                        <Form.Group widths="equal">
                            <Form.Input
                                fluid
                                name="rm_no"
                                value={rm_no}
                                label="RM No."
                                placeholder="RM No."
                                onChange={this.handleChange}
                            />
                            <Form.Input
                                fluid
                                name="litr"
                                value={litr}
                                label="LITR"
                                placeholder="LITR"
                                onChange={this.handleChange}
                            />
                            <Form.Input
                                fluid
                                name="bath"
                                value={bath}
                                label="BATH"
                                placeholder="BATH"
                                onChange={this.handleChange}
                            />
                        </Form.Group>
                        <Form.Group widths="equal">
                            <Form.Input
                                fluid
                                name="expressway"
                                value={expressway}
                                label="Expressway"
                                placeholder="Expressway"
                                onChange={this.handleChange}
                            />
                            <Form.Input
                                fluid
                                name="carpark"
                                value={carpark}
                                label="Carpark"
                                placeholder="Carpark"
                                onChange={this.handleChange}
                            />
                            {/* <Form.Input
                                fluid
                                name="carpark"
                                value={carpark}
                                label="Carpark"
                                placeholder="Carpark"
                                onChange={this.handleChange}
                            /> */}
                            <Form.Input
                                fluid
                                name="otherexpress"
                                value={otherexpress}
                                label="Otherexpress"
                                placeholder="Otherexpress"
                                onChange={this.handleChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Header as="h3">
                                <Icon.Group size="large">
                                    <Icon
                                        link
                                        onClick={() => this.addtabledetail()}
                                        name="table"
                                    />
                                    <Icon corner name="add" />
                                </Icon.Group>
                                Add Table
              </Header>
                        </Form.Group>
                    </Form>




                    {/* Form 2  */}
                    <Form>
                        <Form.Group style={FromStyleGroup}>
                            <Table celled padded selectable>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell singleLine>No.</Table.HeaderCell>
                                        <Table.HeaderCell singleLine>
                                            OBJECTIVE / PLACE / DESCRIPTION
                    </Table.HeaderCell>
                                        <Table.HeaderCell>CHECK OUT</Table.HeaderCell>
                                        <Table.HeaderCell>DATE-TIME</Table.HeaderCell>
                                        <Table.HeaderCell>CHECK IN</Table.HeaderCell>
                                        <Table.HeaderCell>DATE-TIME</Table.HeaderCell>
                                        <Table.HeaderCell>RM No.</Table.HeaderCell>
                                        <Table.HeaderCell>LITR</Table.HeaderCell>
                                        <Table.HeaderCell>BATH</Table.HeaderCell>
                                        <Table.HeaderCell>Expressway</Table.HeaderCell>
                                        <Table.HeaderCell>Carpark</Table.HeaderCell>
                                        <Table.HeaderCell>Otherexpress</Table.HeaderCell>
                                        <Table.HeaderCell />
                                    </Table.Row>
                                </Table.Header>

                                <Table.Body>
                                    {this.state.dateTable ? this.state.dateTable : null}
                                </Table.Body>
                                <Table.Footer>
                                    <Table.Row>
                                        <Table.HeaderCell />
                                        <Table.HeaderCell />
                                        <Table.HeaderCell />
                                        <Table.HeaderCell />
                                        <Table.HeaderCell />
                                        <Table.HeaderCell />
                                        <Table.HeaderCell />
                                        <Table.HeaderCell />
                                        <Table.HeaderCell />
                                        <Table.HeaderCell />
                                        <Table.HeaderCell />
                                        <Table.HeaderCell />
                                        <Table.HeaderCell />
                                    </Table.Row>
                                </Table.Footer>
                            </Table>
                        </Form.Group>
                        <Form.Group>
                            <Form.Button color="red" onClick={() => this.submitFrom()}>
                                Submit
              </Form.Button>
                        </Form.Group>
                        <strong>onChangeForm:</strong>
                        <pre>
                            {JSON.stringify(
                                {
                                    arr
                                },
                                null,
                                2
                            )}
                        </pre>
                        <strong>onChange:</strong>
                        <pre>
                            {JSON.stringify(
                                {
                                    des, check_out, data_time_out, check_in, data_time_in, rm_no, litr, bath, expressway, carpark, otherexpress
                                },
                                null,
                                2
                            )}
                        </pre>
                    </Form>
                </Segment>
            </div>
        )
    }
}
