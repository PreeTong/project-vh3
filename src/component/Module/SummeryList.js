import React, { Component } from 'react'

import {
    // Button,
    Form,
    Table,
    // Popup,
    Header,
    // Segment,
    // Icon,
    // Message,
    // Image,
    Divider,
    // Dimmer,
    // Loader
} from 'semantic-ui-react/dist/commonjs'

import pic from './../../image/Picture1.png'

// .... Connect Redux ....
import { connect } from 'react-redux'
// .... API ....
import { fetchapi } from '../../config/index'

// .... Componect ....
import Search from './Search'
// import PDF from './../PDF'
// .... Lib ....
import moment from 'moment'

// import ReactHTMLTableToExcel from 'react-html-table-to-excel';
// import moment from 'moment';

const FromStyleGroup = {
    overflow: 'scroll'
}

class SummeryList extends Component {

    state = {
        data: null,
        arr: [],
        summery: {
            sum_working_distance: 0,
            sum_litr: 0,
            sum_baht: 0,
            sum_expressway: 0,
            sum_carpark: 0,
            sum_otherexpress: 0
        }
    }

    addtable = () => {
        let { dateTable } = this.state
        console.log(dateTable)
        if(dateTable && dateTable.length > 0 ){
            const listItems = dateTable.map((items, key) => (

                <tr style={{ textAlign: 'center' }} key={key}>
                    <td style={{ textAlign: 'center' }} >{key + 1}</td>
                    <td>{items.user_fnamet + ' ' + items.user_lnamet}</td>
                    <td>{items.des}</td>
                    <td style={{ width: '70px' }}>{moment(items.data_time_out).utcOffset('+00:00').format('DD/MM/YYYY')}</td>
                    <td>{moment(items.data_time_out).utcOffset('+00:00').format('HH:mm')}</td>
                    <td>{items.check_out}</td>
                    <td>{moment(items.data_time_in).utcOffset('+00:00').format('DD/MM/YYYY')}</td>
                    <td>{moment(items.data_time_in).utcOffset('+00:00').format('HH:mm')}</td>
                    <td>{items.check_in}</td>
                    <td>{items.check_in - items.check_out}</td>
                    <td>{items.rm_no}</td>
                    <td>{items.litr}</td>
                    <td>{items.bath}</td>
                    <td>{items.expressway}</td>
                    <td>{items.carpark}</td>
                    <td>{items.otherexpress}</td>
                </tr>
    
                // <Table.Row key={key}>
                //     <Table.Cell>{key + 1}</Table.Cell>
                //     <Table.Cell>{items.des}</Table.Cell>
                //     <Table.Cell>{items.check_out}</Table.Cell>
                //     <Table.Cell>{moment(items.data_time_out).utcOffset('+00:00').format('YYYY-MM-DD HH:mm')}</Table.Cell>
                //     <Table.Cell>{items.check_in}</Table.Cell>
                //     <Table.Cell>{moment(items.data_time_in).utcOffset('+00:00').format('YYYY-MM-DD HH:mm')}</Table.Cell>
                //     <Table.Cell>{items.check_in - items.check_out}</Table.Cell>
                //     <Table.Cell>{items.rm_no}</Table.Cell>
                //     <Table.Cell>{items.litr}</Table.Cell>
                //     <Table.Cell>{items.bath}</Table.Cell>
                //     <Table.Cell>{items.carpark}</Table.Cell>
                //     <Table.Cell>{items.expressway}</Table.Cell>
                //     <Table.Cell>{items.otherexpress}</Table.Cell>
    
                //     {/* <Table.Cell> */}
                //     {/* <Popup
                //             trigger={
                //                 <Button
                //                     size="mini"
                //                     icon="edit"
                //                 // onClick={}
                //                 />
                //             }
                //             content="Edit"
                //         />
                //         <Popup
                //             trigger={
                //                 <Button
                //                     size="mini"
                //                     icon="copy"
                //                 // onClick={}
                //                 />
                //             }
                //             content="Copy"
                //         /> */}
                //     {/* </Table.Cell> */}
                // </Table.Row>
            ))
    
            const numbers = dateTable.map(e => {
    
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
            this.setState({
                dateTable: listItems,
                array: dateTable,
                summery: {
                    sum_working_distance: numbers.map(val => val.sum_working_distance).reduce((sum, num) => sum + num),
                    sum_baht: numbers.map(val => val.sum_baht).reduce((sum, num) => sum + num),
                    sum_litr: numbers.map(val => val.sum_litr).reduce((sum, num) => sum + num),
                    sum_expressway: numbers.map(val => val.sum_expressway).reduce((sum, num) => sum + num),
                    sum_carpark: numbers.map(val => val.sum_carpark).reduce((sum, num) => sum + num),
                    sum_otherexpress: numbers.map(val => val.sum_otherexpress).reduce((sum, num) => sum + num)
                }
            })
        }
        
    }

    checkData_res = (data) => {
        if (data === '' || data.length === 0 || data === null) {
            // console.log('object')
        }
        else {
            let items = fetchapi('car/get_car/', { search: data.search })
            items.then(post => post.json())
                .then(post => this.setState({ data: post[0] },this.addtable()))
        }



    }


    componentWillReceiveProps(nextProps) {
        // let { data } = this.state

        console.log(nextProps)
        if (JSON.stringify(nextProps.post.data) !== '{}') {
            console.log(nextProps.post.data.sumnow)

            return setTimeout(() => {

                let items = fetchapi('vh3/get_load_description', { search: nextProps.post.data.search, process: 'summerycar', sumnow: nextProps.post.data.sumnow})
                items.then(res => res.json())
                    // .then(res => console.log(res))
                    .then(res => this.setState({
                        dateTable: res
                    }), this.checkData_res(nextProps.post.data))

            }, 1000)
        }
        else {
            this.setState({ data: null, dateTable: [] })
        }
    }


    // renderHeader() {
    //     let { data } = this.state

    //     if (data) {

    //         return (

    //             <Table.Header >
    //                 <Table.Row>
    //                     <Table.Cell colSpan='12' ></Table.Cell>
    //                 </Table.Row>
    //                 <Table.Row >
    //                     <Table.Cell />
    //                     <Table.HeaderCell colSpan='5' border='1'>Name : {data.user_initt + "" + data.user_fnamet + " " + data.user_lnamet}</Table.HeaderCell>
    //                     <Table.HeaderCell colSpan='6'>EmployeeID : {data.user_empid}</Table.HeaderCell>

    //                 </Table.Row>
    //                 <Table.Row>
    //                     <Table.Cell />
    //                     <Table.HeaderCell colSpan='2'>Division : {data.user_department}</Table.HeaderCell>
    //                     <Table.HeaderCell colSpan='5'>Department : {data.user_department}</Table.HeaderCell>
    //                     <Table.HeaderCell colSpan='4'>Register No. : {data.licence_plate_num}</Table.HeaderCell>

    //                 </Table.Row>
    //                 <Table.Row>
    //                     <Table.Cell />
    //                     <Table.HeaderCell colSpan='5'>Brand : {data.car_brand}</Table.HeaderCell>
    //                     <Table.HeaderCell colSpan='6'>Oil type : {data.product}</Table.HeaderCell>
    //                 </Table.Row>
    //                 <Table.Row>
    //                     <Table.Cell colSpan='12'></Table.Cell>
    //                 </Table.Row>
    //                 <Table.Row>
    //                     <Table.HeaderCell rowSpan='2'>No.</Table.HeaderCell>
    //                     <Table.HeaderCell rowSpan='2'>
    //                         OBJECTIVE / PLACE / DESCRIPTION
    // </Table.HeaderCell>
    //                     <Table.HeaderCell rowSpan='2'>CHECK OUT</Table.HeaderCell>
    //                     <Table.HeaderCell rowSpan='2'>DATE-TIME</Table.HeaderCell>
    //                     <Table.HeaderCell rowSpan='2'>CHECK IN</Table.HeaderCell>
    //                     <Table.HeaderCell rowSpan='2'>DATE-TIME</Table.HeaderCell>
    //                     <Table.HeaderCell rowSpan='2'>WORKING DISTANCE KM.</Table.HeaderCell>
    //                     <Table.HeaderCell colSpan='3' textAlign='center'>REFUEL</Table.HeaderCell>
    //                     <Table.HeaderCell rowSpan='2'>Expressway</Table.HeaderCell>
    //                     <Table.HeaderCell rowSpan='2'>Carpark</Table.HeaderCell>
    //                     <Table.HeaderCell rowSpan='2'>Otherexpress</Table.HeaderCell>
    //                 </Table.Row>
    //                 <Table.Row>
    //                     <Table.HeaderCell>RM NO.</Table.HeaderCell>
    //                     <Table.HeaderCell>LITR</Table.HeaderCell>
    //                     <Table.HeaderCell>BATH</Table.HeaderCell>
    //                 </Table.Row>
    //             </Table.Header>
    //         )
    //     }
    // }

    renderTable() {
        let { data, dateTable, summery: { sum_working_distance, sum_litr, sum_baht, sum_expressway, sum_carpark, sum_otherexpress } } = this.state
        // console.log(data)
        if (data) {
            return (
                <table id="table-to-xls2" border='1' style={{ width: '100%', fontFamily: 'arial, sans-serif', borderCollapse: 'collapse', fontSize: '11px' }} >
                    <thead>
                        <tr>
                            <th colSpan='15'>  VEHICLE EXPENSES FORM ( VH 3 )  </th>
                        </tr>
                        <tr>
                            <th rowSpan='3' colSpan='3'>
                                <img src={pic} alt="Trulli" width="150" height="50" />
                            </th>
                            <th colSpan='6'>Name : {data.user_initt + "" + data.user_fnamet + " " + data.user_lnamet}</th>
                            <th colSpan='6'>EmployeeID : {data.user_empid}</th>
                        </tr>
                        <tr>
                            <th colSpan='4'>Division : {data.user_department}</th>
                            <th colSpan='4'>Department : {data.user_department}</th>
                            <th colSpan='4'>Register No. : {data.licence_plate_num}</th>
                        </tr>
                        <tr>
                            <th colSpan='6'>Brand : {data.car_brand}</th>
                            <th colSpan='6'>Oil type : {data.product}</th>
                        </tr>
                        <tr>
                            <th colSpan='15'>&nbsp;</th>
                        </tr>
                        <tr>
                            <th rowSpan='2' style={{ textAlign: 'center' }} >No.</th>
                            <th rowSpan='2' style={{ textAlign: 'center' }} >USER NAME</th>
                            <th rowSpan='2' style={{ width: '300px' }}>OBJECTIVE / PLACE / DESCRIPTION</th>
                            <th colSpan='3'>CHECK OUT</th>
                            <th colSpan='3'>CHECK IN</th>
                            <th rowSpan='3' style={{ width: '80px' }} >WORKING DISTANCE KM.</th>
                            <th colSpan='3'>REFUEL</th>
                            <th rowSpan='2'>Expressway</th>
                            <th rowSpan='2'>Carpark</th>
                            <th rowSpan='2'>Otherexpress</th>
                        </tr>
                        <tr>
                            <th style={{ width: '70px' }}>D/M/Y</th>
                            <th style={{ width: '70px' }}>TIME</th>
                            <th style={{ width: '70px' }}>RM No.</th>
                            <th style={{ width: '70px' }}>D/M/Y</th>
                            <th style={{ width: '70px' }}>TIME</th>
                            <th style={{ width: '70px' }}>RM No.</th>
                            <th style={{ width: '70px' }}>RM NO.</th>
                            <th style={{ width: '70px' }}>LITR</th>
                            <th style={{ width: '70px' }}>BATH</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(dateTable && dateTable.length > 0) ? dateTable : null}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th />
                            <th colSpan='8'> Grand Total </th>
                            <th>{sum_working_distance}</th>
                            <th>&nbsp;</th>
                            <th>{sum_litr}</th>
                            <th>{sum_baht}</th>
                            <th>{sum_expressway}</th>
                            <th>{sum_carpark}</th>
                            <th>{sum_otherexpress}</th>
                        </tr>
                    </tfoot>
                </table >

            )
        }
    }


    render() {
       return (
            <div>
                <Search />
                <Header size="huge"> DESCRIPTION  </Header>
                
                
                <Divider />
                <Form>
                    <Form.Group style={FromStyleGroup}>
                        {this.renderTable()}
                    </Form.Group>
                </Form>
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

export default connect(mapStateToProps, mapDispatchToProps)(SummeryList)