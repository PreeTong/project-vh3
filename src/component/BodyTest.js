import React, { Component } from 'react'
import {
    Button,
    Form,
    Table,
    Popup,
    Header,
    Segment,
    Icon,
    Message,
    Divider
} from 'semantic-ui-react/dist/commonjs'


const FromStyleGroup = {
    //height: "100px",
    overflow: 'scroll'
}

export default class vh3_body extends Component {
    state = {
        dateTable: null,
        isOpen: {
            pop_des: false,
            pop_check_out: false,
            pop_data_time_out: false,
            pop_check_in: false,
            pop_data_time_in: false
        },
        messageIsOpen: true,
        messageText: null,
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
        let { arr } = this.state
        console.log(arr)
        // Check ค่า if() ตรงนี้
        if (arr.length === 0) {
            console.log('test1')
        } else {
            fetch('http://localhost:8250/api/vh3/save_description', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(arr)
            }).then(res => console.log(res))
                .then(res => this.setState({ arr: [], dateTable: null, messageIsOpen: false, messageText: "New Records Success" }))

        }

    }


    checkmarktable() {
        let { form: { des,
            check_out,
            data_time_out,
            check_in,
            data_time_in
        },

        } = this.state

        this.setState({
            isOpen: {
                pop_des: (des === '' || des.length === 0 || des === null) ? true : false,
                pop_check_out: (check_out === '' || check_out.length === 0 || check_out === null) ? true : false,
                pop_data_time_out: (data_time_out === '' || data_time_out.length === 0 || data_time_out === null) ? true : false,
                pop_check_in: (check_in === '' || check_in.length === 0 || check_in === null) ? true : false,
                pop_data_time_in: (data_time_in === '' || data_time_in.length === 0 || data_time_in === null) ? true : false,
            }
        }, () => {
            let { isOpen: { pop_des,
                pop_check_out,
                pop_data_time_out,
                pop_check_in,
                pop_data_time_in
            }
            } = this.state

            if (!pop_des && !pop_check_out && !pop_data_time_out && !pop_check_in && !pop_data_time_in) {
                this.addtabledetail()
            } else {
                console.log('test2')
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
                {/* <Table.Cell>{number.rm_no}</Table.Cell>
                <Table.Cell>{number.litr}</Table.Cell>
                <Table.Cell>{number.bath}</Table.Cell>
                <Table.Cell>{number.carpark}</Table.Cell>
                <Table.Cell>{number.expressway}</Table.Cell>
                <Table.Cell>{number.otherexpress}</Table.Cell> */}

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
                // arr: [],
                dateTable: listItems,
                loading: false,
                messageIsOpen: true,
                form: {
                    user_empid: this.state.form.user_empid,
                    des: '',
                    check_out: '',
                    data_time_out: '',
                    check_in: '',
                    data_time_in: '',
                    // rm_no: '',
                    // litr: '',
                    // bath: '',
                    // carpark: '',
                    // expressway: '',
                    // otherexpress: ''
                }
            })
        }, 300)
    }

    canceltable(index) {

        // let { arr } = this.state

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

    componentWillMount() {
        const data = JSON.parse(sessionStorage.getItem('myData'))
        if (data) {
            data.map(e =>
                this.setState({
                    form: {
                        user_empid: e.user_empid,
                        des: '',
                        check_out: '',
                        data_time_out: '',
                        check_in: '',
                        data_time_in: ''
                    }
                })
            )
            // setTimeout(() => {
            //     console.log(this.state.users)
            // }, 1000)
        } else {
            this.setState({ users: null })
        }
    }

    render() {
        let { dateTable,
            isOpen: { pop_des, pop_check_in, pop_check_out, pop_data_time_in, pop_data_time_out
            }, messageIsOpen, messageText, form: { des, check_out, data_time_out, check_in, data_time_in, }
        } = this.state
        // , rm_no, litr, bath, expressway, carpark, otherexpress 
        return (
            <div>
                <Segment color="red">
                    <Header size="huge"> DESCRIPTION </Header>


                    {/* Form  */}
                    <Form>
                        <Form.Group widths="equal">
                            <Form.Input
                                fluid
                                name="des"
                                value={des}
                                onChange={this.handleChange}
                                label="OBJECTIVE / DESCRIPTION"
                                placeholder="OBJECTIVE / DESCRIPTION"
                                required
                                error={pop_des}
                            />
                        </Form.Group>
                        <Divider />
                        <Form.Group widths="equal">
                            <Form.Input
                                fluid
                                name="check_out"
                                value={check_out}
                                onChange={this.handleChange}
                                label="CHECK OUT"
                                placeholder="CHECK OUT"
                                required
                                error={pop_check_out}
                                type="number"
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
                                error={pop_data_time_out}
                            />
                            <Form.Input
                                required
                                fluid
                                name="check_in"
                                value={check_in}
                                onChange={this.handleChange}
                                label="CHECK IN"
                                placeholder="CHECK IN"
                                error={pop_check_in}
                                type="number"
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
                                error={pop_data_time_in}
                            />
                        </Form.Group>
                        <Divider />
                        {/* <Form.Group widths="equal">
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
                        <Form.Input
                                fluid
                                name="otherexpress"
                                value={otherexpress}
                                label="Otherexpress"
                                placeholder="Otherexpress"
                                onChange={this.handleChange}
                            />
                        </Form.Group>
                        <Divider /> */}
                        <Form.Group>
                            <Header as="h3">
                                <Icon.Group size="large">
                                    <Icon
                                        link
                                        onClick={() => this.checkmarktable()}
                                        name="table"
                                    />
                                    <Icon corner name="add" />
                                </Icon.Group>
                                Add Table
              </Header>
                        </Form.Group>
                        <Divider />
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
                                        {/* <Table.HeaderCell>RM No.</Table.HeaderCell>
                                        <Table.HeaderCell>LITR</Table.HeaderCell>
                                        <Table.HeaderCell>BATH</Table.HeaderCell>
                                        <Table.HeaderCell>Expressway</Table.HeaderCell>
                                        <Table.HeaderCell>Carpark</Table.HeaderCell>
                                        <Table.HeaderCell>Otherexpress</Table.HeaderCell> */}
                                        <Table.HeaderCell />
                                    </Table.Row>
                                </Table.Header>

                                <Table.Body>
                                    {dateTable ? dateTable : null}
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
                                        {/* <Table.HeaderCell />
                                        <Table.HeaderCell />
                                        <Table.HeaderCell />
                                        <Table.HeaderCell />
                                        <Table.HeaderCell />
                                        <Table.HeaderCell /> */}
                                    </Table.Row>
                                </Table.Footer>
                            </Table>
                        </Form.Group>
                        <Form.Group>
                            <Form.Button color="red" onClick={() => this.submitFrom()}>
                                Submit
              </Form.Button>
                        </Form.Group>
                        <Message hidden={messageIsOpen} positive>{messageText}</Message>
                        {/* <strong>onChangeForm:</strong>
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
                                    des, check_out, data_time_out, check_in, data_time_in
                                },
                                null,
                                2
                            )}
                        </pre> */}
                    </Form>
                </Segment>
            </div>
        )
    }
}
