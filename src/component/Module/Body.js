import React, { Component, createRef } from 'react'
import {
    Button,
    Form,
    Table,
    Popup,
    Header,
    Segment,
    Icon,
    // Message,
    Divider,
    // Dimmer,
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

import Cookies from 'universal-cookie';

const cookies = new Cookies();

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
            pop_data_time_in: false,
            // pop_time_in: false,  รออัพเดท
            pop_rm_no: false,
            pop_litr: false,
            pop_bath: false,
            // pop_establishment: false,
            pop_tax_id: false,
            pop_branch: false,
            pop_tax_inv_no: false,
        },
        key: null,
        // segmentloading: true, //<<<<<<< edit real
        inputCheck_out: true,
        // messageIsOpenNegative: true,
        PropsData: null,

        // button config //
        buttonedit: true,
        buttonadd: false,
        buttonsave: true,

        dataEdit: null,
        // messageIsOpenPositive: true,
        messageText: null,
        arr: [],
        license_plate: null,
        modalOpen: false,
        modalSubmitOpen: false,
        rm_no_contorl: false,
        fleet_card_num: null
    }

    //focus ref
    inputRef = createRef()
    handleClick = () => this.inputRef.current.focus()

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
        }
        else {
            fetch(webapi + 'vh3/save_description', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(arr)
            }).then(res => res.json())
                .then(res => this.setState({ arr: [], dateTable: null, modalSubmitOpen: true, messageText: res.affectedRows, modalOpen: false }, () => this.props.updatament(), this.removeCookie()))
        }

    }

    validation = (event) => {

        let { arr, form: { des,
            check_out,
            data_time_out,
            // time_outs,
            check_in,
            data_time_in,
            // time_in,
            rm_no,
            litr,
            bath,
            expressway,
            carpark,
            otherexpenses,
        } } = this.state


        this.setState({
            isOpen: {
                pop_des: (des === '' || des.length === 0 || des === null) ? true : false,
                pop_check_out: (check_out === '' || check_out.length === 0 || check_out === null) ? true : false,
                pop_data_time_out: (data_time_out === '' || data_time_out.length === 0 || data_time_out === null) ? true : false,
                // pop_time_outs: (time_outs === '' || this.getvalueOf(time_outs)) ? true : false,
                pop_check_in: (check_in === '' || check_in.length === 0 || check_in === null) ? true : false,
                pop_data_time_in: (data_time_in === '' || data_time_in.length === 0 || data_time_in === null) ? true : false,
                // pop_time_in: (time_in === '' || this.getvalueOf(time_in)) ? true : false,
            },
            form: {
                ...this.state.form,
                rm_no: (rm_no === '' || rm_no.length === 0 || rm_no === null) ? 0 : rm_no,
                litr: (litr === '' || litr.length === 0 || litr === null) ? 0 : litr,
                bath: (bath === '' || bath.length === 0 || bath === null) ? 0 : bath,
                expressway: (expressway === '' || expressway.length === 0 || expressway === null) ? 0 : expressway,
                carpark: (carpark === '' || carpark.length === 0 || carpark === null) ? 0 : carpark,
                otherexpenses: (otherexpenses === '' || otherexpenses.length === 0 || otherexpenses === null) ? 0 : otherexpenses
            },

        }, () => {
            let { isOpen: { pop_des,
                pop_check_out,
                pop_data_time_out,
                pop_time_outs,
                pop_check_in,
                pop_data_time_in,
                pop_time_in } } = this.state

            if (!pop_des && !pop_check_out && !pop_data_time_out && !pop_time_outs && !pop_check_in &&
                !pop_data_time_in && !pop_time_in) {
                let { form: { rm_no } } = this.state
                this.setState({
                    rm_no_contorl: (rm_no === 0) ? true : false
                }, () => {
                    let { rm_no_contorl, form: {
                        check_out,
                        data_time_out,
                        time_outs,
                        check_in,
                        data_time_in,
                        time_in,
                        litr,
                        bath,
                        tax_id,
                        branch,
                        tax_inv_no

                    } } = this.state


                    let a = moment(`${data_time_out} ${time_outs}`, "YYYY-MM-DD HH:mm").valueOf()
                    let b = moment(`${data_time_in} ${time_in}`, "YYYY-MM-DD HH:mm").valueOf()
                    // console.log(a, b)

                    let c = a > b

                    if (!rm_no_contorl) {

                        this.setState({
                            form: {
                                ...this.state.form,
                                fleet_card_num: this.state.fleet_card_num
                            },
                            isOpen: {
                                ...this.state.isOpen,
                                pop_data_time_out: (moment(data_time_out).format('YYYY') > moment().format('YYYY')) ? true : false,
                                pop_time_outs: c,
                                pop_check_in: (parseInt(check_in) < parseInt(check_out)) ? true : false,
                                pop_data_time_in: (this.getmin(data_time_out) > this.getmin(data_time_in) || moment(data_time_in).format('YYYY') > moment().format('YYYY')) ? true : false,
                                pop_time_in: c,
                                pop_rm_no: (parseInt(rm_no) > parseInt(check_in) || parseInt(check_out) > parseInt(rm_no)) ? true : false,
                                pop_litr: (litr === 0),
                                pop_bath: (bath <= 0),
                                pop_tax_id: (tax_id.length !== 13),
                                pop_branch: (branch.length !== 5),
                                pop_tax_inv_no: (tax_inv_no.length === 0) ? true : false

                            }
                        }, () => {
                            let { isOpen: { pop_des,
                                pop_check_out,
                                pop_data_time_out,
                                pop_check_in,
                                pop_data_time_in,
                                pop_rm_no,
                                pop_litr,
                                pop_bath,
                                pop_tax_id,
                                pop_branch,
                                pop_tax_inv_no
                            }
                            } = this.state

                            if (!pop_des && !pop_check_out && !pop_data_time_out && !pop_time_outs && !pop_check_in &&
                                !pop_data_time_in && !pop_rm_no && !pop_time_outs && !pop_litr && !pop_bath && !pop_tax_id &&
                                !pop_branch && !pop_tax_inv_no) {

                                if (event === 'addtableEvent') {
                                    if (arr.length === 0) {

                                        this.addtabledetail()
                                        this.setState({
                                            buttonsave: false
                                        })
                                    }
                                    else {
                                        this.addtabledetail()
                                    }
                                }
                                else if (event === 'savetable') {
                                    this.setDataDefault()
                                    this.setState({
                                        buttonedit: true,
                                        buttonadd: false,
                                    })
                                }
                            }
                        })
                    }
                    else {
                    // console.log(a > b)

                        this.setState({
                            form: {
                                ...this.state.form,
                                fleet_card_num: ''
                            },
                            isOpen: {
                                ...this.state.isOpen,
                                pop_time_outs: c,
                                pop_time_in: c,
                                pop_data_time_out: (moment(data_time_out).format('YYYY') > moment().format('YYYY')) ? true : false,
                                pop_check_in: (parseInt(check_in) < parseInt(check_out)) ? true : false,
                                pop_data_time_in: (this.getmin(data_time_out) > this.getmin(data_time_in) || moment(data_time_in).format('YYYY') > moment().format('YYYY')) ? true : false,
                            }
                        }, () => {
                            let { isOpen: { pop_des,
                                pop_check_out,
                                pop_data_time_out,
                                pop_check_in,
                                pop_data_time_in,
                                pop_time_outs,
                                pop_time_in
                            } } = this.state

                            if (!pop_des && !pop_check_out && !pop_data_time_out && !pop_check_in && !pop_data_time_in && !pop_time_outs && !pop_time_in) {
                                if (event === 'addtableEvent') {
                                    if (arr.length === 0) {
                                        this.addtabledetail()
                                        this.setState({
                                            buttonsave: false
                                        })

                                    }
                                    else {
                                        this.addtabledetail()
                                    }
                                }
                                else if (event === 'savetable') {
                                    this.setDataDefault()
                                    this.setState({
                                        buttonsave: false,
                                        buttonedit: true,
                                        buttonadd: false,
                                    })
                                }

                            }
                        })
                    }
                })
            }
        })
    }

    setDataDefault = () => {
        let { form: { user_empid, check_in, data_time_in, licence_plate_num } } = this.state
        this.setState({
            loading: false,
            messageIsOpenPositive: true,
            messageText: '',
            form: {
                user_empid: user_empid,
                des: '',
                check_out: check_in,
                data_time_out: moment(data_time_in).add(1, 'days').format('YYYY-MM-DD'),
                time_outs: '',
                check_in: '',
                data_time_in: moment(data_time_in).add(1, 'days').format('YYYY-MM-DD'),
                time_in: '',
                rm_no: '',
                litr: '',
                bath: '',
                carpark: '',
                expressway: '',
                otherexpenses: '',
                tax_id: '',
                branch: '',
                tax_inv_no: '',
                licence_plate_num: licence_plate_num,
            }
        })
    }

    getmin = (times) => {
        return moment(times).unix()
    }
    getvalueOf = (times) => {
        // console.log(times)
        return moment(times).valueOf()
    }

    addtabledetail() {
        // let { f} } = this.state
        this.setState({
            arr: [...this.state.arr, this.state.form,]
        }, () => {
            let { arr } = this.state
            arr.sort((a, b) => (this.getmin(a.data_time_in) > this.getmin(b.data_time_in) ? 1 : -1))

            setTimeout(() => {
                this.setDataDefault()
            }, 300)
        })
    }


    setDataedit = (data, key) => {

        this.setState({
            inputCheck_out: false,
            dataEdit: data,
            buttonedit: false,
            buttonadd: true,
            key: key,
            form: {
                user_empid: data.user_empid,
                des: data.des,
                check_out: data.check_out,
                data_time_out: moment(data.data_time_out).utcOffset('+07:00').format('YYYY-MM-DD'),
                time_outs: data.time_outs,
                check_in: data.check_in,
                data_time_in: moment(data.data_time_in).utcOffset('+07:00').format('YYYY-MM-DD'),
                time_in: data.time_in,
                rm_no: data.rm_no,
                litr: data.litr,
                bath: data.bath,
                expressway: data.expressway,
                carpark: data.carpark,
                otherexpenses: data.otherexpenses,
                licence_plate_num: data.licence_plate_num,
                tax_id: data.tax_id,
                branch: data.branch,
                tax_inv_no: data.tax_inv_no
            }
        })
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
        if (datas.length === 0) {
            this.loadData()
            this.setState({
                buttonsave: true
            })
        }
    }

    changeDesc = () => {
        let { arr, key, form } = this.state

        const updataArray = [...arr]
        updataArray[key] = form


        this.setState({
            arr: updataArray,
        }, () => this.validation('savetable'))
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
                        time_outs: '',
                        check_in: '',
                        data_time_in: '',
                        time_in: '',
                        rm_no: '',
                        litr: '',
                        bath: '',
                        expressway: '',
                        carpark: '',
                        otherexpenses: '',
                        tax_id: '',
                        branch: '',
                        tax_inv_no: ''
                    }
                })
            )
        } else {
            this.setState({ users: null })
        }
    }

    loadData = () => {
        let { PropsData } = this.state

        let items = fetchapi('vh3/get_load_description', { search: PropsData[0].licence_plate_num, process: 'header' })
        items.then(res => res.json())
            .then(res => this.setload(res, PropsData))

    }


    componentWillReceiveProps(nextProps) {

        if (JSON.stringify(nextProps.post.data) !== '{}') {
            this.setState({
                dateTable: null,
                arr: [],
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
                buttonsave: true,
                PropsData: null,
                arr: [],
                form: {
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

    setload(data, PropsData) {

        if (data.length !== 0) {

            return data.map(datatable =>
                this.setState({
                    fleet_card_num: PropsData[0].fleet_card_num,
                    form: {
                        ...this.state.form,
                        licence_plate_num: PropsData[0].licence_plate_num,
                        check_out: datatable.check_in,
                        data_time_out: moment(datatable.data_time_in).format('YYYY-MM-DD'),
                        data_time_in: moment(datatable.data_time_in).format('YYYY-MM-DD'),
                        time_outs: ''
                    }
                })
                // }, console.log(cookies.get('myData')))
            )
        } else {
            return this.setState({
                inputCheck_out: false,
                form: {
                    ...this.state.form,
                    licence_plate_num: PropsData[0].licence_plate_num,

                }
            })
        }

    }

    Nocarusage = () => {
        let { form: { des,
            check_out,
            data_time_out,
            data_time_in,
            rm_no,
            litr,
            bath,
            expressway,
            carpark,
            otherexpenses,
            user_empid,
            licence_plate_num
        } } = this.state

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
                otherexpenses: (otherexpenses === '' || otherexpenses.length === 0 || otherexpenses === null) ? 0 : otherexpenses,
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
                        ...this.state.form,
                        user_empid: user_empid,
                        des: des,
                        check_out: check_out,
                        data_time_out: moment(data_time_out, 'YYYY-MM-DDTHH').format('YYYY-MM-DD'),
                        time_outs: '08:30',
                        // time_out: moment(data_time_out, 'YYYY-MM-DDTHH:mm:00').format('YYYY-MM-DDTHH:mm'),
                        check_in: check_out,
                        data_time_in: moment(data_time_in, 'YYYY-MM-DDTHH').format('YYYY-MM-DD'),
                        time_in: '17:30',
                        rm_no: 0,
                        litr: 0,
                        bath: 0,
                        carpark: 0,
                        expressway: 0,
                        otherexpenses: 0,
                        licence_plate_num: licence_plate_num,
                        fleet_card_num: ''
                    },
                    buttonsave: false
                }, () => this.addtabledetail())
            }

        })



    }

    saveCookies = () => {
        let { arr } = this.state
        // console.log(PropsData[0].licence_plate_num)
        cookies.set('myData', arr, { path: '/vh3information' });
    }
    getCookies = () => {
        let data = cookies.get('myData', { path: '/vh3information' })
        console.log(data)
        if (data) {
            this.setState({
                arr: data,
                buttonsave: false
            })
        }
    }
    removeCookie = () => {
        cookies.remove('myData', { path: '/vh3information' })
        this.setState({ buttonsave: true })
    }


    renderData() {
        let { dateTable } = this.state
        return (dateTable ? dateTable : null)
    }

    renderDataTest() {
        let { arr } = this.state
        return (
            arr.map((number, key) => (
                <Table.Row key={key}>
                    <Table.Cell>{key + 1}</Table.Cell>
                    {/* <Table.Cell collapsing>{number.user_fnamet + ' ' + number.user_lnamet}</Table.Cell> */}
                    <Table.Cell fixed="true">{number.des}</Table.Cell>
                    <Table.Cell>{moment(number.data_time_out).utcOffset('+07:00').format('DD/MM/YYYY')}</Table.Cell>
                    <Table.Cell>{number.time_outs}</Table.Cell>
                    <Table.Cell>{number.check_out}</Table.Cell>
                    <Table.Cell>{moment(number.data_time_in).utcOffset('+07:00').format('DD/MM/YYYY')}</Table.Cell>
                    <Table.Cell>{number.time_in}</Table.Cell>
                    <Table.Cell>{number.check_in}</Table.Cell>
                    <Table.Cell>{number.check_in - number.check_out}</Table.Cell>
                    <Table.Cell>{number.rm_no}</Table.Cell>
                    <Table.Cell>{number.litr}</Table.Cell>
                    <Table.Cell>{number.bath}</Table.Cell>
                    <Table.Cell>{number.expressway}</Table.Cell>
                    <Table.Cell>{number.carpark}</Table.Cell>
                    <Table.Cell>{number.otherexpenses}</Table.Cell>
                    {/* <Table.Cell>{number.establishment}</Table.Cell> */}
                    <Table.Cell>{number.tax_id}</Table.Cell>
                    <Table.Cell>{number.branch}</Table.Cell>
                    <Table.Cell>{number.tax_inv_no}</Table.Cell>

                    <Table.Cell>
                        <Popup
                            trigger={
                                <Button
                                    color='blue'
                                    size="mini"
                                    icon="edit"
                                    onClick={() => this.setDataedit(arr[key], key)}
                                />
                            }
                            content="Edit"
                        />
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

                    </Table.Cell>
                </Table.Row>
            ))

        )
    }

    // componentWillUpdate(nextProps, nextState) {
    //     console.log(nextState)
    // }
    // componentWillUnmount() {
    //     console.log("object")
    // }


    render() {
        // buttonsave เอาออกก่อนรอการแก้ไข
        let {
            PropsData,
            inputCheck_out,
            isOpen: {
                pop_des, pop_check_in, pop_check_out, pop_data_time_in, pop_data_time_out, pop_rm_no, pop_litr, pop_bath, pop_tax_id, pop_branch, pop_tax_inv_no, pop_time_outs, pop_time_in
            }, buttonedit, buttonadd, messageText, modalOpen, modalSubmitOpen, form: { des, check_out, data_time_out, time_outs, check_in, data_time_in, time_in, rm_no, litr, bath, expressway, carpark, otherexpenses, tax_id, branch, tax_inv_no }
        } = this.state


        // return <div />

        return (
            (!PropsData) ? <div /> : <div>

                <Segment color="red">
                    <Header size="huge"> DESCRIPTION </Header>

                    {/* <Dimmer.Dimmable dimmed={segmentloading}>
                        <Dimmer inverted active={segmentloading} /> */}


                    {/* Form  */}


                    <Form>
                        {/* <Message hidden={messageIsOpenPositive} positive>บันทึกข้อมูลแล้ว : {messageText} Record</Message> */}
                        {/* <Message hidden={messageIsOpenNegative} negative>{messageText}</Message> */}
                        <Form.Group widths="equal">
                            <Form.Input
                                // ref={this.inputRef}
                                fluid
                                name="des"
                                value={des}
                                onChange={this.handleChange}
                                label="OBJECTIVE / DESCRIPTION (รายละเอียดการใช้งานรถยนต์)"
                                placeholder="OBJECTIVE / DESCRIPTION"
                                required
                                autoFocus
                                // autoFocus={autoFocuInput} ขอค้างไว้ก่อนจะกลับมาดู
                                error={pop_des}
                            />
                        </Form.Group>
                        <Divider />
                        <Form.Group widths="equal">
                            <Form.Input
                                // disabled={inputCheck_out}
                                // disabled
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
                                type="date"
                                data-date-format="DD MMMM YYYY"
                                onChange={this.handleChange}
                                label="CHECK OUT DATE ( 01/12/2019 ) "
                                error={pop_data_time_out}
                            />
                            <Form.Input
                                required
                                fluid
                                name="time_outs"
                                value={time_outs || '00:00'}
                                type="time"
                                onChange={this.handleChange}
                                label="TIME OUT"
                                error={pop_time_outs}
                            />
                        </Form.Group>
                        <Form.Group widths="equal">
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
                                type="date"
                                data-date-format="DD MMMM YYYY"
                                onChange={this.handleChange}
                                label="CHECK IN DATE ( 01/12/2019 ) "
                                error={pop_data_time_in}
                            />

                            {/*  รออัพเดท */}
                            <Form.Input
                                required
                                fluid
                                name="time_in"
                                value={time_in || '00:00'}
                                type="time"
                                onChange={this.handleChange}
                                label="TIME IN"
                                error={pop_time_in}
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
                                error={pop_rm_no}
                            />
                            <Form.Input
                                fluid
                                name="litr"
                                value={litr}
                                label="LITR"
                                placeholder="LITR"
                                onChange={this.handleChange}
                                type="number"
                                error={pop_litr}
                            />
                            <Form.Input
                                fluid
                                name="bath"
                                value={bath}
                                label="BATH"
                                placeholder="BATH"
                                onChange={this.handleChange}
                                type="number"
                                error={pop_bath}
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
                                name="otherexpenses"
                                value={otherexpenses}
                                label="Otherexpenses"
                                placeholder="Otherexpenses"
                                onChange={this.handleChange}
                                type="number"
                            />
                        </Form.Group>
                        {/*  INV  */}
                        <Divider />
                        <Form.Group widths="equal">
                        </Form.Group>
                        <Form.Group widths="equal">
                            <Form.Input
                                fluid
                                name="tax_id"
                                value={tax_id}
                                label="TAX ID ( เลขประจำตัวผู้เสียภาษี ) จำนวนเลขต้องเป็น 13 หลัก"
                                placeholder="TAX ID"
                                onChange={this.handleChange}
                                maxLength={13}
                                // minLength={13}
                                error={pop_tax_id}
                                type="number"
                            />
                            <Form.Input
                                fluid
                                name="branch"
                                value={branch}
                                label="Branc Number ( เลขที่สาขา ) Head Office ให้ใส่ 00000 "
                                // color='red'
                                placeholder="เลขที่สาขา"
                                onChange={this.handleChange}
                                maxLength={5}
                                // minLength={5}
                                error={pop_branch}
                                type="number"
                            />
                            <Form.Input
                                fluid
                                name="tax_inv_no"
                                value={tax_inv_no}
                                label="TAX INV NO. ( เลขที่ใบกำกับภาษี ) "
                                placeholder="TAX INV NO."
                                onChange={this.handleChange}
                                error={pop_tax_inv_no}
                            />
                        </Form.Group>
                        <Divider />
                        <Form.Group>
                            <Button icon color="blue" onClick={() => this.validation('addtableEvent')} labelPosition='left' disabled={buttonadd}>
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
                            {/* <Button icon color="red" labelPosition='left' disabled={buttonsave} onClick={() => this.saveCookies()}>
                                <Icon corner name="save outline" />
                                บันทึก
</Button> */}

                        </Form.Group>
                        <Divider />
                    </Form>




                    {/* Form 2  */}

                    <Form>
                        <Form.Group style={FromStyleGroup}>
                            <Table celled padded selectable id="table-to-xls" size='small' compact fixed>
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
                                        <Table.HeaderCell rowSpan='2'>Otherexpenses</Table.HeaderCell>
                                        {/* <Table.HeaderCell rowSpan='2'>Establishment</Table.HeaderCell> */}
                                        <Table.HeaderCell rowSpan='2'>TAX ID</Table.HeaderCell>
                                        <Table.HeaderCell rowSpan='2'>Branch</Table.HeaderCell>
                                        <Table.HeaderCell rowSpan='2'>TAX INV NO.</Table.HeaderCell>
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
                                    {/* {this.renderData()} */}
                                    {this.renderDataTest()}
                                </Table.Body>

                            </Table>
                        </Form.Group>
                        <Form.Group>
                            <Modal
                                trigger={<Button icon labelPosition='left' color="red" onClick={this.handleOpen}><Icon corner name="checkmark" />Submit</Button>}
                                open={modalOpen}
                                onClose={this.handleClose}
                                // basic
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
                            <Modal open={modalSubmitOpen} size='small'>
                                <Header icon='archive' content='Archive Old Messages' />
                                <Modal.Content>
                                    <p>
                                        บันทึกข้อมูลแล้ว : {messageText} Record
  </p>
                                </Modal.Content>
                                <Modal.Actions>
                                    <Button color='green' inverted onClick={() => this.setState({ modalSubmitOpen: false })}>
                                        <Icon name='checkmark' /> OK
  </Button>
                                </Modal.Actions>
                            </Modal>
                        </Form.Group>
                    </Form>
                    {/* </Dimmer.Dimmable> */}
                </Segment>
            </div>
        )
        //     return (



        //     )
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
