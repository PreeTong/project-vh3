import React, { Component } from 'react'

import {
    Button,
    Form,
    Table,
    Header,
    Segment,
    Icon,
    Message,
    Divider,
    // Dimmer,
    Modal,
    // Input
} from 'semantic-ui-react/dist/commonjs'


// .... Connect Redux ....
import { connect } from 'react-redux'

// .... API ....
import { fetchapi, fetchapiDelete, fetchapiUpData } from '../../config/index'

import PDF from './../PDF'

import moment from 'moment';

const FromStyleGroup = {
    //height: "100px",
    overflow: 'scroll'
}


class DataTable extends Component {
    state = {
        // dataTable: null,
        header: null,
        data: null,
        dataProcess: null,
        openModel_message: false,
        dataEdit: null,
        messageIsOpenPositive: true,
        messageIsOpenNegative: true,
        messageTextUpdata: '',
        messageText: '',
        form: {
            user_empid: '',
            des: '',
            check_out: '',
            data_time_out: '',
            check_in: '',
            data_time_in: '',
            rm_no: '',
            litr: '',
            bath: '',
            expressway: '',
            carpark: '',
            otherexpress: ''
        }
    }

    // myRef = React.createRef();

    closeModel_Del = () => this.setState({ openModel_Del: false })
    closeModel_Edit = () => this.setState({ openModel_Edit: false })
    closeModel_Message = () => this.setState({ openModel_message: false })

    openModel_Del = () => this.setState({ openModel_Del: true })
    openModel_Edit = () => this.setState({ openModel_Edit: true })

    handleChange = (e, { name, value }) => this.setState({
        form: {
            ...this.state.form,
            [name]: value
        }
    })

    DeleteData = () => {
        let { dataProcess, keyData, data } = this.state
        if (dataProcess) {
            let items = fetchapiDelete('vh3/delete_data', { dataProcess })
            items.then(res => res.json())
                .then(res => this.setState({ messageText: res.affectedRows })
                )
            data.splice(keyData, 1)
            data.sort()
            this.setState({ data: data, openModel_Del: false, openModel_message: true, dataProcess: null })


        }
    }

    changeDesc = () => {
        let { data, form, keyData } = this.state
        // console.log(form)
        const updataArray = [...data]
        updataArray[keyData] = form

        // this.setState({ data: updataArray })
        let items = fetchapiUpData('vh3/update_data', updataArray[keyData])

        items.then(res => res.json())
            .then(res =>
                this.setState({
                    messageIsOpenPositive: false,
                    messageTextUpdata: `Updata ข้อมูลแล้ว : ${res.affectedRows} `,
                    data: updataArray,
                    dataEdit: null
                })
            )
        setTimeout(() => {
            this.setState({
                messageIsOpenPositive: true
            })
        }, 3000)


    }

    setload = (data, key) => {
        // console.log("TIME : ", data.data_time_out, moment(data.data_time_out, 'YYYY-MM-DDTHH:mm:00.000Z').format('YYYY-MM-DD HH:mm:00'));
        this.setState({
            dataEdit: data,
            // openModel_Edit: true,
            keyData: key,
            form: {
                id: data.id,
                user_empid: data.user_empid,
                user_fnamet: data.user_fnamet,
                user_lnamet: data.user_lnamet,
                des: data.des,
                check_out: data.check_out,
                data_time_out: moment(data.data_time_out, 'YYYY-MM-DDTHH:mm:00').format('YYYY-MM-DDTHH:mm'),
                check_in: data.check_in,
                data_time_in: moment(data.data_time_in, 'YYYY-MM-DDTHH:mm:00').format('YYYY-MM-DDTHH:mm'),
                rm_no: data.rm_no,
                litr: data.litr,
                bath: data.bath,
                expressway: data.expressway,
                carpark: data.carpark,
                otherexpress: data.otherexpress,
                car_licence: data.car_licence,
            }
        })
    }


    componentWillUpdate(nextProps, nextState) {
        console.log(nextState)
    }

    componentWillReceiveProps(nextProps) {

        if (JSON.stringify(nextProps.post.data) !== '{}') {
            let header = fetchapi('car/get_car/', { search: nextProps.post.data.search })
            header.then(res => res.json())
                .then(res => this.setState({
                    header: (res === '' || res.length === 0 || res === null) ? null : res[0], messageIsOpenNegative: (res === '' || res.length === 0 || res === null) ? false : true, messageText: (res === '' || res.length === 0 || res === null) ? 'ไม่มีข้อมูลรถคันนี้' : ''
                }))

            let items = fetchapi('vh3/get_load_description', { search: nextProps.post.data.search, process: 'summerycar', sumnow: nextProps.post.data.sumnow })
            items.then(res => res.json())
                .then(res => this.setState({
                    data: (res === '' || res.length === 0 || res === null) ? null : res, messageIsOpenNegative: (res === '' || res.length === 0 || res === null) ? false : true, messageText: (res === '' || res.length === 0 || res === null) ? 'ไม่มีข้อมูลเดือนนี้' : ''
                }))
        }
        else {
            this.setState({ data: null, header: null })
        }
    }

    renderViewEdit() {
        let { dataEdit,
            form: { des, check_out, data_time_out, check_in, data_time_in, rm_no, litr, bath, expressway, carpark, otherexpress }
        } = this.state
        if (dataEdit) {

            return (
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
                        // error={pop_des}
                        />
                    </Form.Group>
                    <Divider />
                    <Form.Group widths="equal">
                        <Form.Input
                            // disabled={inputCheck_out}
                            fluid
                            name="check_out"
                            value={check_out}
                            onChange={this.handleChange}
                            label="CHECK OUT"
                            placeholder="CHECK OUT"
                            required
                            // error={pop_check_out}
                            type="number"
                        />

                        <Form.Input
                            required
                            fluid
                            // disabled
                            name="data_time_out"
                            value={data_time_out}
                            type="datetime-local"
                            data-date-format="DD MMMM YYYY"
                            onChange={this.handleChange}
                            label="DATE-TIME"
                        // error={pop_data_time_out}
                        />
                        <Form.Input
                            required
                            fluid
                            name="check_in"
                            value={check_in}
                            onChange={this.handleChange}
                            label="CHECK IN"
                            placeholder="CHECK IN"
                            // error={pop_check_in}
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
                        // error={pop_data_time_in}
                        />
                    </Form.Group>


                    <Divider />
                    <Form.Group widths="equal">
                        <Form.Input
                            fluid
                            name="rm_no"
                            value={rm_no}
                            label="RM No."
                            placeholder="RM No."
                            onChange={this.handleChange}
                            type="number"
                        />
                        <Form.Input
                            fluid
                            name="litr"
                            value={litr}
                            label="LITR"
                            placeholder="LITR"
                            onChange={this.handleChange}
                            type="number"
                        />
                        <Form.Input
                            fluid
                            name="bath"
                            value={bath}
                            label="BATH"
                            placeholder="BATH"
                            onChange={this.handleChange}
                            type="number"
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
                            type="number"
                        />
                        <Form.Input
                            fluid
                            name="carpark"
                            value={carpark}
                            label="Carpark"
                            placeholder="Carpark"
                            onChange={this.handleChange}
                            type="number"
                        />
                        <Form.Input
                            fluid
                            name="otherexpress"
                            value={otherexpress}
                            label="Otherexpress"
                            placeholder="Otherexpress"
                            onChange={this.handleChange}
                            type="number"
                        />
                    </Form.Group>
                    <Form.Group>
                        <Button color='green' onClick={() => { this.changeDesc() }}>
                            <Icon name='checkmark' /> Save Table
      </Button>
                        <Button color='red' onClick={() => { this.setState({ dataEdit: null }) }}>
                            <Icon name='close' /> Cancel
      </Button>
                    </Form.Group>

                </Form>
            )
        }
    }
    // componentWillUpdate(nextProps, nextState) {
    //     console.log(nextState)
    // }

    renderData() {
        let { data,
            openModel_Del,
        } = this.state
        if (data) {
            return (
                data.map((number, key) => (
                    <Table.Row key={key}>
                        <Table.Cell>{key + 1}</Table.Cell>
                        <Table.Cell collapsing>{number.user_fnamet + ' ' + number.user_lnamet}</Table.Cell>
                        <Table.Cell collapsing>{number.des}</Table.Cell>
                        <Table.Cell>{moment(number.data_time_out, 'YYYY-MM-DDTHH:mm:00').format('DD/MM/YYYY')}</Table.Cell>
                        <Table.Cell>{moment(number.data_time_out, 'YYYY-MM-DDTHH:mm:00').format('HH:mm')}</Table.Cell>
                        <Table.Cell>{this.formatNumber(number.check_out)}</Table.Cell>
                        <Table.Cell>{moment(number.data_time_in, 'YYYY-MM-DDTHH:mm:00').format('DD/MM/YYYY')}</Table.Cell>
                        <Table.Cell>{moment(number.data_time_in, 'YYYY-MM-DDTHH:mm:00').format('HH:mm')}</Table.Cell>
                        <Table.Cell>{this.formatNumber(number.check_in)}</Table.Cell>
                        <Table.Cell textAlign='right'>{this.formatNumber(number.check_in - number.check_out)}</Table.Cell>
                        <Table.Cell textAlign='right'>{this.formatNumber(number.rm_no)}</Table.Cell>
                        <Table.Cell textAlign='right'>{number.litr}</Table.Cell>
                        <Table.Cell textAlign='right'>{this.formatNumber(number.bath)}</Table.Cell>
                        <Table.Cell textAlign='right'>{number.carpark}</Table.Cell>
                        <Table.Cell textAlign='right'>{number.expressway}</Table.Cell>
                        <Table.Cell textAlign='right'>{number.otherexpress}</Table.Cell>

                        <Table.Cell collapsing>
                            <Button color='blue' size="mini" icon="edit" onClick={() => this.setload(data[key], key)} ></Button>

                            {/* //////////////////////////////////////////// */}
                            < Modal
                                open={openModel_Del}
                                onClose={this.closeModel_Del}
                                trigger={< Button color='red' size="mini" icon="cancel" onClick={() => this.setState({ dataProcess: data[key].id, keyData: key, openModel_Del: true })}></Button >}

                            > <Header icon='archive' content='Confirm the delete data?' />
                                <Modal.Content>
                                    <p>ยืนยันการลบข้อมูล?</p>
                                </Modal.Content>
                                <Modal.Actions>
                                    <Button color='red'>
                                        <Icon name='remove' /> No
      </Button>
                                    <Button color='green' onClick={() => this.DeleteData()}>
                                        <Icon name='checkmark' /> Yes
      </Button>
                                </Modal.Actions>
                            </Modal >
                        </Table.Cell >
                    </Table.Row >
                ))
            )
        }
    }

    renderFoots = () => {
        let { data } = this.state
        // console.log(data)
        if (data) {

            const numbers = data.map(e => {

                const num = {
                    sum_working_distance: e.check_in - e.check_out,
                    sum_litr: e.litr,
                    sum_baht: e.bath,
                    sum_expressway: e.expressway,
                    sum_carpark: e.carpark,
                    sum_otherexpress: e.otherexpress
                }

                return num

            })
            // console.log(numbers)
            return (
                <Table.Footer>
                    <Table.Row >
                        <Table.HeaderCell colSpan='3' />
                        <Table.HeaderCell colSpan='6' textAlign='center'>Grand Total</Table.HeaderCell>
                        <Table.HeaderCell textAlign='right'>{this.formatNumber(numbers.map(val => val.sum_working_distance).reduce((sum, num) => sum + num))}</Table.HeaderCell>
                        <Table.HeaderCell />
                        <Table.HeaderCell textAlign='right'>{this.formatNumber(numbers.map(val => val.sum_litr).reduce((sum, num) => sum + num).toFixed(3))}</Table.HeaderCell>
                        <Table.HeaderCell textAlign='right'>{this.formatNumber(numbers.map(val => val.sum_baht).reduce((sum, num) => sum + num))}</Table.HeaderCell>
                        <Table.HeaderCell textAlign='right'>{numbers.map(val => val.sum_expressway).reduce((sum, num) => sum + num)}</Table.HeaderCell>
                        <Table.HeaderCell textAlign='right'>{numbers.map(val => val.sum_carpark).reduce((sum, num) => sum + num)}</Table.HeaderCell>
                        <Table.HeaderCell textAlign='right'>{numbers.map(val => val.sum_otherexpress).reduce((sum, num) => sum + num)}</Table.HeaderCell>
                        <Table.HeaderCell />
                    </Table.Row>
                </Table.Footer>
            )
        }
    }
    formatNumber = (num) => {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
      }

    renderPDF = () => {
        let { data, header } = this.state
        if (data && header) {
            return (
                <div>
                    <Segment compact>
                        <PDF header={header} data={data} />
                    </Segment>
                    <Divider />
                </div>
            )
        }

    }


    render() {
        // console.log(this.state)
        let { messageText, openModel_message, messageIsOpenPositive, messageIsOpenNegative, messageTextUpdata } = this.state

        return (
            <div>
                {/* {(dataTable && dataTable.length > 0) ? dataTable : null} */}
                <Segment color="red">
                    <Message hidden={messageIsOpenPositive} positive>{messageTextUpdata}</Message>
                    <Message hidden={messageIsOpenNegative} negative>{messageText}</Message>
                    {this.renderViewEdit()}
                    {this.renderPDF()}
                    <Form>
                        <Form.Group style={FromStyleGroup}>
                            <Table celled padded selectable id="table-to-xls" size='small' compact>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell rowSpan='2'>No.</Table.HeaderCell>
                                        <Table.HeaderCell rowSpan='2'>USER NAME</Table.HeaderCell>
                                        <Table.HeaderCell rowSpan='2' collapsing>
                                            OBJECTIVE / PLACE / DESCRIPTION
    </Table.HeaderCell>
                                        <Table.HeaderCell colSpan='3' textAlign='center'>CHECK OUT</Table.HeaderCell>
                                        {/* <Table.HeaderCell rowSpan='2'>DATE-TIME</Table.HeaderCell> */}
                                        <Table.HeaderCell colSpan='3' textAlign='center'>CHECK IN</Table.HeaderCell>
                                        {/* <Table.HeaderCell rowSpan='2'>DATE-TIME</Table.HeaderCell> */}
                                        <Table.HeaderCell rowSpan='2' textAlign='center'>WORKING DISTANCE KM.</Table.HeaderCell>
                                        <Table.HeaderCell colSpan='3' textAlign='center'>REFUEL</Table.HeaderCell>
                                        <Table.HeaderCell rowSpan='2'>Expressway</Table.HeaderCell>
                                        <Table.HeaderCell rowSpan='2'>Carpark</Table.HeaderCell>
                                        <Table.HeaderCell rowSpan='2'>Otherexpress</Table.HeaderCell>
                                        <Table.HeaderCell rowSpan='2' />
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.HeaderCell>D/M/Y</Table.HeaderCell>
                                        <Table.HeaderCell>TIME</Table.HeaderCell>
                                        <Table.HeaderCell>RM No.</Table.HeaderCell>
                                        <Table.HeaderCell>D/M/Y</Table.HeaderCell>
                                        <Table.HeaderCell>TIME</Table.HeaderCell>
                                        <Table.HeaderCell>RM No.</Table.HeaderCell>
                                        <Table.HeaderCell>RM NO.</Table.HeaderCell>
                                        <Table.HeaderCell>LITR</Table.HeaderCell>
                                        <Table.HeaderCell>BATH</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>

                                <Table.Body>
                                    {this.renderData()}
                                </Table.Body>
                                {this.renderFoots()}
                            </Table>
                        </Form.Group>
                        <Modal
                            open={openModel_message}
                            onClose={this.closeModel_Message}
                        > <Header icon='checkmark' content='Delete successfully' />
                            <Modal.Content>
                                ลบข้อมูลออกแล้ว : {messageText} Record
                            </Modal.Content>
                            <Modal.Actions>
                                <Button color='green' onClick={() => { this.setState({ openModel_message: false }) }}>
                                    <Icon name='checkmark' /> Yes
      </Button>
                            </Modal.Actions>
                        </Modal>
                    </Form>
                </Segment>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    post: state.post

})

const mapDispatchToProps = dispatch => ({
    // increment: () => dispatch({ type: Action.INCREMENT, text: "INCREMENT Redux" }),
    // decrement: () => dispatch({ type: Action.DECREMENT, text: "DECREMENT Redux" }),
    // postment: (posts) => dispatch({ type: Action.ADDDATA, text: "ADDDATA Redux", post: posts }),
    // despostment: () => dispatch({ type: Action.DEDATA, text: "DEDATA Redux" , post: {} }),

    // searchment: (datas) => dispatch({ type: Action.SEARCH, text: "SEARCH Redux", data: datas }),
    // clearment: () => dispatch({ type: Action.CLEAR, text: "CLEAR Redux" })
})

export default connect(mapStateToProps, mapDispatchToProps)(DataTable)