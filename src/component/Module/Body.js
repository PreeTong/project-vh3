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
    Divider,
    Dimmer,
    Modal
} from 'semantic-ui-react/dist/commonjs'
// .....
import { connect } from 'react-redux'
// .....
// api config
import { fetchapi, webapi } from '../../config/index'
// .....

import Action from '../../actions';

// import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import moment from 'moment';

const FromStyleGroup = {
    //height: "100px",
    overflow: 'scroll'
}

export class Body extends Component {
    state = {
        // datafatch: null,
        dateTable: null,
        isOpen: {
            pop_des: false,
            pop_check_out: false,
            pop_data_time_out: false,
            pop_check_in: false,
            pop_data_time_in: false
        },
        key: null,
        segmentloading: true, //<<<<<<< edit real
        inputCheck_out: false,
        messageIsOpenNegative: true,
        PropsData: null,

        // button config //
        buttonedit: true,
        buttonadd: false,

        dataEdit: null,
        messageIsOpenPositive: true,
        messageText: null,
        arr: [],
        license_plate: null,
        modalOpen: false
    }

    handleChange = this.handleChange.bind(this)


    handleOpen = () => this.setState({ modalOpen: true })

    handleClose = () => this.setState({ modalOpen: false })

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
            this.setState({ arr: [], dateTable: null, messageIsOpenNegative: false, messageText: "Please fill out the information. " })
        } else {
            fetch(webapi + 'vh3/save_description', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(arr)
                // }).then(res => console.log(res))
            }).then(res => this.setState({ arr: [], dateTable: null, messageIsOpenPositive: false, messageText: "New Records Success", modalOpen: false })
                , this.props.updatament())

        }

    }




    checkmarktable() {
        let { arr, form: { des,
            check_out,
            data_time_out,
            check_in,
            data_time_in,
            rm_no,
            litr,
            bath,
            expressway,
            carpark,
            otherexpress
        },

        } = this.state


        this.setState({
            isOpen: {
                pop_des: (des === '' || des.length === 0 || des === null) ? true : false,
                pop_check_out: (check_out === '' || check_out.length === 0 || check_out === null) ? true : false,
                pop_data_time_out: (data_time_out === '' || data_time_out.length === 0 || data_time_out === null || moment(data_time_out).format('YYYY') > moment().format('YYYY')) ? true : false,
                pop_check_in: (check_in === '' || check_in.length === 0 || check_in === null || check_in < check_out) ? true : false,
                pop_data_time_in: (data_time_in === '' || data_time_in.length === 0 || data_time_in === null || this.getmin(data_time_out) > this.getmin(data_time_in) || moment(data_time_in).format('YYYY') > moment().format('YYYY')) ? true : false,
            },
            form: {
                ...this.state.form,
                rm_no: (rm_no === '' || rm_no.length === 0 || rm_no === null) ? 0 : rm_no,
                litr: (litr === '' || litr.length === 0 || litr === null) ? 0 : litr,
                bath: (bath === '' || bath.length === 0 || bath === null) ? 0 : bath,
                expressway: (expressway === '' || expressway.length === 0 || expressway === null) ? 0 : expressway,
                carpark: (carpark === '' || carpark.length === 0 || carpark === null) ? 0 : carpark,
                otherexpress: (otherexpress === '' || otherexpress.length === 0 || otherexpress === null) ? 0 : otherexpress
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

                if (arr.length === 0) {

                    this.addtabledetail()
                }
                else {
                    this.addtabledetail()
                }
            }

        })
    }
    getmin = (times) => {

        return moment(times).unix()
    }

    addtabledetail() {

        this.setState({
            arr: [...this.state.arr, this.state.form,]
        }, () => {
            let { arr } = this.state
            // console.log(arr)
            arr.sort((a, b) => (this.getmin(a.data_time_in) > this.getmin(b.data_time_in) ? 1 : -1))
            this.addtable()

        }
        )
    }


    setDataedit = (data, key) => {

        this.setState({

            dataEdit: data,
            buttonedit: false,
            buttonadd: true,
            key: key,
            form: {
                user_empid: data.user_empid,
                des: data.des,
                check_out: data.check_out,
                data_time_out: moment(data.data_time_out).utcOffset('+07:00').format('YYYY-MM-DDTHH:mm'),
                check_in: data.check_in,
                data_time_in: moment(data.data_time_in).utcOffset('+07:00').format('YYYY-MM-DDTHH:mm'),
                rm_no: data.rm_no,
                litr: data.litr,
                bath: data.bath,
                expressway: data.expressway,
                carpark: data.carpark,
                otherexpress: data.otherexpress,
                licence_plate_num: data.licence_plate_num
            }
        })
    }

    addtable() {
        let { arr } = this.state
        console.log(arr)
        const listItems = arr.map((number, key) => (
            <Table.Row key={key}>
                <Table.Cell>{key + 1}</Table.Cell>
                {/* <Table.Cell collapsing>{number.user_fnamet + ' ' + number.user_lnamet}</Table.Cell> */}
                <Table.Cell collapsing>{number.des}</Table.Cell>
                <Table.Cell>{moment(number.data_time_out).utcOffset('+07:00').format('DD/MM/YYYY')}</Table.Cell>
                <Table.Cell>{moment(number.data_time_out).utcOffset('+07:00').format('HH:mm')}</Table.Cell>
                <Table.Cell>{number.check_out}</Table.Cell>
                <Table.Cell>{moment(number.data_time_in).utcOffset('+07:00').format('DD/MM/YYYY')}</Table.Cell>
                <Table.Cell>{moment(number.data_time_in).utcOffset('+07:00').format('HH:mm')}</Table.Cell>
                <Table.Cell>{number.check_in}</Table.Cell>
                <Table.Cell>{number.check_in - number.check_out}</Table.Cell>
                <Table.Cell>{number.rm_no}</Table.Cell>
                <Table.Cell>{number.litr}</Table.Cell>
                <Table.Cell>{number.bath}</Table.Cell>
                <Table.Cell>{number.carpark}</Table.Cell>
                <Table.Cell>{number.expressway}</Table.Cell>
                <Table.Cell>{number.otherexpress}</Table.Cell>

                <Table.Cell>
                    <Popup
                        trigger={
                            <Button
                                color='red'
                                size="mini"
                                icon="cancel"
                                onClick={() => this.canceltable(key)}
                            />
                        }
                        content="Cancel"
                    />
                    <Popup
                        trigger={
                            <Button
                                color='orange'
                                size="mini"
                                icon="edit"
                                onClick={() => this.setDataedit(arr[key], key)}
                            />
                        }
                        content="edit"
                    />

                </Table.Cell>
            </Table.Row>
        ))



        setTimeout(() => {
            this.setState({
                // arr: [],
                dateTable: listItems,
                loading: false,
                messageIsOpenPositive: true,
                messageText: '',
                form: {
                    user_empid: this.state.form.user_empid,
                    des: '',
                    check_out: this.state.form.check_in,
                    data_time_out: moment(this.state.form.data_time_in).utcOffset('+22:00').format('YYYY-MM-DDTHH:mm'),
                    check_in: '',
                    data_time_in: '',
                    rm_no: '',
                    litr: '',
                    bath: '',
                    carpark: '',
                    expressway: '',
                    otherexpress: '',
                    licence_plate_num: this.state.form.licence_plate_num,

                }
            })
        }, 300)
    }

    canceltable(index) {
        let { arr } = this.state

        let datas = arr
        datas.splice(index, 1)
        datas.sort()
        this.setState({
            arr: datas,
            loading: true
        })
        // console.log(datas.length)
        if (datas.length === 0) {
            this.loadData()
            this.addtable()
        }
        else {
            this.addtable()
        }
    }

    changeDesc = () => {
        let { arr, key, form } = this.state

        const updataArray = [...arr]
        updataArray[key] = form

        this.setState({
            arr: updataArray,
            buttonedit: true,
            buttonadd: false,


        }, () => this.addtable())
    }


    componentWillMount() {
        const data = JSON.parse(sessionStorage.getItem('myData'))
        if (data) {
            data.map(e =>
                this.setState({
                    dateTable: null,
                    form: {
                        user_empid: e.user_empid,
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
                })
            )
        } else {
            this.setState({ users: null })
        }
    }

    loadData = () => {
        let { PropsData } = this.state
        PropsData.map(e => {

            return setTimeout(() => {

                let items = fetchapi('vh3/get_load_description', { search: e.licence_plate_num, process: 'header' })
                items.then(res => res.json())
                    .then(res => this.setload(res, e))
            }, 1000)
        })
    }


    componentWillReceiveProps(nextProps) {

        if (JSON.stringify(nextProps.post.data) !== '{}') {
            this.setState({
                dateTable: null,
                PropsData: nextProps.post.data,
                form: {
                    ...this.state.form,
                    licence_plate_num: '',
                    check_out: '',
                }
            }, () => this.loadData())
        } else {
            this.setState({
                dateTable: null,
                segmentloading: true, form: {
                    ...this.state.form,
                    licence_plate_num: '',
                    des: '',
                    check_out: '',
                    data_time_out: '',
                    check_in: '',
                    data_time_in: ''

                }
            })
        }

    }
    // componentWillUpdate(nextProps, nextState) {
    //     console.log(nextState)
    // }

    setload(data, event) {

        if (data.length !== 0) {

            return data.map(datatable =>
                this.setState({
                    segmentloading: false, form: {
                        ...this.state.form,
                        licence_plate_num: event.licence_plate_num,
                        check_out: datatable.check_in,
                        data_time_out: moment(datatable.data_time_in).utcOffset('+15:00').format('YYYY-MM-DDTHH:mm')
                    }
                })
            )
        } else {
            return this.setState({
                segmentloading: false,
                inputCheck_out: false,
                form: {
                    ...this.state.form,
                    licence_plate_num: event.licence_plate_num,

                }
            })
        }

    }

    Nocarusage = () => {
        let { form: { des,
            check_out,
            data_time_out,
            rm_no,
            litr,
            bath,
            expressway,
            carpark,
            otherexpress,
            user_empid,
            licence_plate_num
        },

        } = this.state




        this.setState({
            isOpen: {
                pop_des: (des === '' || des.length === 0 || des === null) ? true : false,
                pop_check_out: (check_out === '' || check_out.length === 0 || check_out === null) ? true : false,
                pop_data_time_out: (data_time_out === '' || data_time_out.length === 0 || data_time_out === null || moment(data_time_out).format('YYYY') > moment().format('YYYY')) ? true : false,
            },
            form: {
                ...this.state.form,
                rm_no: (rm_no === '' || rm_no.length === 0 || rm_no === null) ? 0 : rm_no,
                litr: (litr === '' || litr.length === 0 || litr === null) ? 0 : litr,
                bath: (bath === '' || bath.length === 0 || bath === null) ? 0 : bath,
                expressway: (expressway === '' || expressway.length === 0 || expressway === null) ? 0 : expressway,
                carpark: (carpark === '' || carpark.length === 0 || carpark === null) ? 0 : carpark,
                otherexpress: (otherexpress === '' || otherexpress.length === 0 || otherexpress === null) ? 0 : otherexpress
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

                this.setState({
                    form: {
                        user_empid: user_empid,
                        des: des,
                        check_out: check_out,
                        data_time_out: moment(data_time_out, 'YYYY-MM-DDTHH:mm:00').format('YYYY-MM-DDTHH:mm'),
                        check_in: check_out,
                        data_time_in: moment(data_time_out, 'YYYY-MM-DDTHH:mm:00').utcOffset('+16:00').format('YYYY-MM-DDTHH:mm'),
                        rm_no: 0,
                        litr: 0,
                        bath: 0,
                        carpark: 0,
                        expressway: 0,
                        otherexpress: 0,
                        licence_plate_num: licence_plate_num,
                    }
                }, () => this.addtabledetail())
            }

        })



    }

    renderData() {
        let { dateTable } = this.state
        return (dateTable ? dateTable : null)
    }


    render() {
        let {
            // dateTable,
            isOpen: {
                pop_des, pop_check_in, pop_check_out, pop_data_time_in, pop_data_time_out
            }, buttonedit, buttonadd, inputCheck_out, messageIsOpenPositive, messageIsOpenNegative, messageText, modalOpen, segmentloading, form: { des, check_out, data_time_out, check_in, data_time_in, rm_no, litr, bath, expressway, carpark, otherexpress }
        } = this.state

        // let { post } = this.props
        // console.log(post)




        return (
            <div>

                <Segment color="red">
                    <Header size="huge"> DESCRIPTION </Header>

                    <Dimmer.Dimmable dimmed={segmentloading}>
                        <Dimmer inverted active={segmentloading} />


                        {/* Form  */}


                        <Form>
                            <Message hidden={messageIsOpenPositive} positive>{messageText}</Message>
                            <Message hidden={messageIsOpenNegative} negative>{messageText}</Message>
                            <Form.Group widths="equal">
                                <Form.Input
                                    fluid
                                    name="des"
                                    value={des}
                                    onChange={this.handleChange}
                                    label="OBJECTIVE / DESCRIPTION (รายละเอียดการใช้งานรถยนต์)"
                                    placeholder="OBJECTIVE / DESCRIPTION"
                                    required
                                    error={pop_des}
                                />
                            </Form.Group>
                            <Divider />
                            <Form.Group widths="equal">
                                <Form.Input
                                    disabled={inputCheck_out}
                                    fluid
                                    name="check_out"
                                    value={check_out}
                                    onChange={this.handleChange}
                                    label="CHECK OUT (เลขไมล์รถก่อนออกนำไปใช้งาน)"
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
                                    // max={moment().format('YYYY')}
                                    // max="1979-12-31"
                                    type="datetime-local"
                                    data-date-format="DD MMMM YYYY"
                                    onChange={this.handleChange}
                                    label="DATE-TIME ( 01/01/2019 ) "
                                    error={pop_data_time_out}
                                />
                                <Form.Input
                                    required
                                    fluid
                                    name="check_in"
                                    value={check_in}
                                    onChange={this.handleChange}
                                    label="CHECK IN (เลขไมล์รถหลังจากใช้งาน)"
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
                                    label="DATE-TIME ( 01/01/2019 ) "
                                    error={pop_data_time_in}
                                />
                            </Form.Group>


                            <Divider />
                            <Form.Group widths="equal">
                                <Form.Input
                                    fluid
                                    name="rm_no"
                                    value={rm_no}
                                    label="RM No. (เลขไมค์รถ ณ ที่เติมน้ำมัน)"
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
                            <Divider />
                            <Form.Group>
                                <Button icon color="blue" onClick={() => this.checkmarktable()} labelPosition='left' disabled={buttonadd}>
                                    {/* <Icon name='table' /> */}
                                    <Icon corner name="add" />
                                    Add Table
    </Button>
                                <Button icon color="orange" labelPosition='left' disabled={buttonedit} onClick={() => this.changeDesc()}>
                                    <Icon corner name="edit" />
                                    Save Table
    </Button>
                                <Button icon color="green" labelPosition='left' disabled={buttonadd} onClick={() => this.Nocarusage()}>
                                    <Icon corner name="car" />
                                    ไม่ได้ใช้งานรถ
    </Button>


                            </Form.Group>
                            <Divider />
                        </Form>




                        {/* Form 2  */}

                        <Form>
                            <Form.Group style={FromStyleGroup}>
                                <Table celled padded selectable id="table-to-xls" size='small' compact>
                                    <Table.Header>
                                        <Table.Row>
                                            <Table.HeaderCell rowSpan='2'>No.</Table.HeaderCell>
                                            {/* <Table.HeaderCell rowSpan='2'>USER NAME</Table.HeaderCell> */}
                                            <Table.HeaderCell rowSpan='2'>
                                                OBJECTIVE / PLACE / DESCRIPTION
    </Table.HeaderCell>
                                            <Table.HeaderCell colSpan='3' textAlign='center'>CHECK OUT</Table.HeaderCell>
                                            {/* <Table.HeaderCell rowSpan='2'>DATE-TIME</Table.HeaderCell> */}
                                            <Table.HeaderCell colSpan='3' textAlign='center'>CHECK IN</Table.HeaderCell>
                                            {/* <Table.HeaderCell rowSpan='2'>DATE-TIME</Table.HeaderCell> */}
                                            <Table.HeaderCell rowSpan='2'>WORKING DISTANCE KM.</Table.HeaderCell>
                                            <Table.HeaderCell colSpan='3' textAlign='center'>REFUEL</Table.HeaderCell>
                                            <Table.HeaderCell rowSpan='2'>Expressway</Table.HeaderCell>
                                            <Table.HeaderCell rowSpan='2'>Carpark</Table.HeaderCell>
                                            <Table.HeaderCell rowSpan='2'>Otherexpress</Table.HeaderCell>
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

                                </Table>
                            </Form.Group>
                            <Form.Group>
                                <Modal
                                    trigger={<Button color="red" onClick={this.handleOpen}>Submit</Button>}
                                    open={modalOpen}
                                    onClose={this.handleClose}
                                    basic
                                    size='small'
                                >
                                    <Header icon='archive' content='Confirm the recording data?' />
                                    <Modal.Content>
                                        <p>ยืนยันการบันทึกข้อมูล?</p>
                                    </Modal.Content>
                                    <Modal.Actions>
                                        <Button basic color='red' onClick={this.handleClose}>
                                            <Icon name='remove' /> No
      </Button>
                                        <Button color='green' onClick={() => this.submitFrom()}>
                                            <Icon name='checkmark' /> Yes
      </Button>
                                    </Modal.Actions>
                                </Modal>
                            </Form.Group>
                        </Form>
                    </Dimmer.Dimmable>
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
    updatament: () => dispatch({ type: Action.UPDATE, text: "UPDATE Redux" })
})

export default connect(mapStateToProps, mapDispatchToProps)(Body)
