import React, { Component } from 'react'
import { connect } from 'react-redux'
import Action from '../../actions';

import {
    Header,
    Button,
    Divider,
    Dropdown,
    Input,
    Icon,
    // Image,
    Modal,
    // List,
    // Grid
} from 'semantic-ui-react/dist/commonjs'

// import PDF from './../PDF';

// import { webapi } from '../../config/index'
// import { fetchapiGet } from '../../config/index'

const options = [
    { key: 'JAN', text: 'JAN', value: '01' },
    { key: 'FEB', text: 'FEB', value: '02' },
    { key: 'MAR', text: 'MAR', value: '03' },
    { key: 'APR', text: 'APR', value: '04' },
    { key: 'MAY', text: 'MAY', value: '05' },
    { key: 'JUN', text: 'JUN', value: '06' },
    { key: 'JUL', text: 'JUL', value: '07' },
    { key: 'AUG', text: 'AUG', value: '08' },
    { key: 'SEP', text: 'SEP', value: '09' },
    { key: 'OCT', text: 'OCT', value: '10' },
    { key: 'NOV', text: 'NOV', value: '11' },
    { key: 'DEC', text: 'DEC', value: '12' },

]

const DataYear = [
    { key: '2019', text: '2019', value: '2019' },
    { key: '2020', text: '2020', value: '2020' }
]

export class Search extends Component {

    state = {
        textinput: {
            search: '',
            sumnow: '',
            yearnow: ''

        },
        openModel: false,
        active: false,
        // messageIsOpen: true,
        messageText: '',
        // dropdownclear: false
        errorOption: {
            errorSearch: false,
            errorMonths: false,
            errorYear: false
        }

    }

    closeModel = () => this.setState({ openModel: false })
    handleItemClick = (e) => console.log(e)


    handleChange = this.handleChange.bind(this)

    handleChange(event, { name, value }) {
        this.setState({
            textinput: {
                ...this.state.textinput,
                [name]: value
                // [event.target.name]: event.target.value

            }
        })
    }

    handleRef = (c) => {
        this.inputRef = c
    }

    focus = () => {
        this.inputRef.focus()
        this.OnClaer()
    }

    OnClaer() {
        this.setState({ data: null, textinput: { search: '', sumnow: '', yearnow: '' } })
        // this.handleFocus()
        this.props.clearment()
    }

    OnloadData() {
        let { textinput } = this.state
        // console.log(textinput)
        this.setState({
            active: true,
            data: null,
            errorOption: {
                errorSearch: (textinput.search === '' || textinput.search.length === 0 || textinput.search === null),
                errorMonths: (textinput.sumnow === '' || textinput.sumnow.length === 0),
                errorYear: (textinput.yearnow === '' || textinput.yearnow.length === 0)
            }
        }, () => {
            let { errorOption: {
                errorSearch,
                errorMonths,
                errorYear
            } } = this.state

            // console.log(errorSearch, errorMonths, errorYear)
            // console.log((!errorSearch && !errorMonths && !errorYear))
            if (!errorSearch && !errorMonths && !errorYear) {
                this.props.searchment(textinput)
            }
            else {
                this.setState({ openModel: true, messageText: 'รบกวนตรวจสอบข้อมูล ทะเบียนรถ เดือน และปี', textinput: { search: '', sumnow: '', yearnow: '' } }, this.focus)

            }
        })
    }

    // renderListCar = () => {

    //     let Data = []

    //     for (let num = 0; num < 10; num++) {
    //         Data.push(
    //             <Grid.Column key={num}>
    //                 <List>
    //                     <List.Item>
    //                         <Icon name='car' size='huge' color='grey' />
    //                         <List.Content>
    //                             <List.Header as='a'>Rachel</List.Header>
    //                             <List.Description >
    //                                 Total
    //                         </List.Description>
    //                         </List.Content>
    //                     </List.Item>
    //                 </List>
    //             </Grid.Column>
    //         )
    //     }

    //     return (
    //         <Grid columns={4} divided>
    //             <Grid.Row >
    //                 {Data}
    //             </Grid.Row>
    //         </Grid>

    //     )
    // }

    // CheckDatareturn(data) {

    //     if (data.length === 0) {
    //         this.setState({ openModel: true, messageText: 'ไม่มีข้อมูลรถหรือข้อมูลเดือนนี้', textinput: { search: '' } })

    //     }
    //     return data
    // }

    // componentDidMount() {
    //     let items = fetchapiGet('vh3/get_year/')
    //     items.then(res => res.json())
    //         .then(res => this.setState({ year: res }))

    // }

    // componentWillUpdate(nextProps, nextState) {
    //     console.log(nextState)
    // }

    render() {
        let { textinput: { search, sumnow, yearnow }, openModel, messageText, errorOption: { errorSearch, errorMonths, errorYear } } = this.state
        return (
            <div>
                <Input
                    error={errorSearch}
                    ref={this.handleRef}
                    required
                    value={search}
                    name="search"
                    placeholder='Search...'
                    onChange={this.handleChange} >
                </Input>
                <Dropdown
                    clearable
                    error={errorMonths}
                    name="sumnow"
                    value={sumnow}
                    selection
                    options={options}
                    onChange={this.handleChange}
                    // onFocus={this.handleFocus}
                    placeholder='Select Months'
                />
                <Dropdown
                    clearable
                    error={errorYear}
                    name="yearnow"
                    value={yearnow}
                    selection
                    options={DataYear}
                    onChange={this.handleChange}
                    // onFocus={this.handleFocus}
                    placeholder='Select Year'
                />

                <Button color='blue' onClick={() => this.OnloadData()}>
                    <Icon name='search' />
                    Search
                    </Button>
                <Button negative onClick={() => this.OnClaer()} >
                    <Icon name='close' />Cancel</Button>
                {/* <PDF /> */}
                <Divider />
                < Modal
                    open={openModel}
                    onClose={this.closeModel}
                >
                    <Header icon='archive' content='รบกวนตรวจสอบข้อมูล' />
                    <Modal.Content>
                        <p>{messageText} </p>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='green' onClick={() => this.setState({ openModel: false })}>
                            <Icon name='checkmark' /> Yes
      </Button>
                    </Modal.Actions>
                </Modal >
                {/* {this.renderListCar()} */}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = dispatch => ({
    searchment: (datas) => dispatch({ type: Action.SEARCH, text: "SEARCH Redux", data: datas }),
    clearment: () => dispatch({ type: Action.CLEAR, text: "CLEAR Redux" })
})

export default connect(mapStateToProps, mapDispatchToProps)(Search)
