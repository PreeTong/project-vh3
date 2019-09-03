import React, { Component } from 'react'

import {
    // Button,
    Form,
    Table,
    // Header,
    Segment,
    Icon,
    Menu,
    // Message,
    // Divider,
    // Dimmer,
    // Modal
} from 'semantic-ui-react/dist/commonjs'

import { connect } from 'react-redux'

import { fetchapi } from '../config/index'

import moment from 'moment';

// import PDF from './PDF'

const FromStyleGroup = {
    //height: "100px",
    overflow: 'scroll'
}

class ViewData extends Component {

    state = {
        activeItem: '1',
        data: [],
        num: 1,
        to: 5,
        dateTable: null
    }

    handleItemClick = (number) => this.setState({ num: number, activeItem: number })
    // ItemClick = (num) => this.setState({ activeItem: num })


    componentWillUpdate(nextProps, nextState) {
        // console.log(nextState)
        console.log(nextProps)

    }
    // componentDidUpdate(prevProps, prevState) {

    // }


    componentWillReceiveProps(nextProps) {

        if (JSON.stringify(nextProps.post.data) !== '{}') {

            if(moment().format('DD') > 26){
               let month =  moment().add(1,'months').format('MM')
               let items = fetchapi('vh3/get_load_description', { search: nextProps.post.data[0].licence_plate_num, process: 'viewdata', sumnow: month })
               items.then(res => res.json())
                   // .then(res => console.log(res))
                   .then(res => this.setState({
                       data: (res === '' || res.length === 0 || res === null) ? [] : res
                   }))
              
            }
            else {
                let items = fetchapi('vh3/get_load_description', { search: nextProps.post.data[0].licence_plate_num, process: 'viewdata', sumnow: moment().format('MM') })
                items.then(res => res.json())
                    // .then(res => console.log(res))
                    .then(res => this.setState({
                        data: (res === '' || res.length === 0 || res === null) ? [] : res
                    }))
            }

        }
        else {
            this.setState({ data: [] })
        }
    }



    renderData() {
        let { data, num, to } = this.state


        if (data.length !== 0) {

            return data.slice((to * num) - to, (to * num)).map((number, key) => (
                // return data.slice(0, 5).map((number, key) => (
                <Table.Row key={key}>
                    <Table.Cell textAlign='center'>{key + ((num - 1) * to) + 1}</Table.Cell>
                    <Table.Cell collapsing>{number.user_fnamet + ' ' + number.user_lnamet}</Table.Cell>
                    <Table.Cell collapsing>{number.des}</Table.Cell>
                    <Table.Cell>{moment(number.data_time_out).utcOffset('+00:00').format('DD/MM/YYYY')}</Table.Cell>
                    <Table.Cell>{moment(number.data_time_out).utcOffset('+00:00').format('HH:mm')}</Table.Cell>
                    <Table.Cell>{number.check_out}</Table.Cell>
                    <Table.Cell>{moment(number.data_time_in).utcOffset('+00:00').format('DD/MM/YYYY')}</Table.Cell>
                    <Table.Cell>{moment(number.data_time_in).utcOffset('+00:00').format('HH:mm')}</Table.Cell>
                    <Table.Cell>{number.check_in}</Table.Cell>
                    <Table.Cell textAlign='right'>{number.check_in - number.check_out}</Table.Cell>
                    <Table.Cell textAlign='right'>{number.rm_no}</Table.Cell>
                    <Table.Cell textAlign='right'>{number.litr}</Table.Cell>
                    <Table.Cell textAlign='right'>{number.bath}</Table.Cell>
                    <Table.Cell textAlign='right'>{number.carpark}</Table.Cell>
                    <Table.Cell textAlign='right'>{number.expressway}</Table.Cell>
                    <Table.Cell textAlign='right'>{number.otherexpress}</Table.Cell>
                    <Table.Cell collapsing>
                    </Table.Cell>
                </Table.Row>
            ))


        }
        else {
            return (
                <Table.Row >
                    <Table.Cell textAlign='center' colSpan='17'>ไม่พบข้อมูลย้อนหลังของเดือนนี้</Table.Cell>
                </Table.Row >
            )
        }
    }
    renderMunu = () => {
        let { data, activeItem, to } = this.state

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

    render() {

        return (

            <div>
                <Segment color="red">
                     {/* <PDF data={array} header={data} /> */}
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
                                <Table.Footer>
                                    <Table.Row>
                                        <Table.HeaderCell colSpan='16'>
                                            {this.renderMunu()}
                                        </Table.HeaderCell>
                                    </Table.Row>
                                </Table.Footer>
                            </Table>
                        </Form.Group>
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

export default connect(mapStateToProps, mapDispatchToProps)(ViewData)