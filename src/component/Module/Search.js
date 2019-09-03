import React, { Component } from 'react'
import { connect } from 'react-redux'
import Action from '../../actions';

import {
    Button,
    Dropdown,
    Input,
    Icon
} from 'semantic-ui-react/dist/commonjs'

// import PDF from './../PDF';

// import { webapi } from '../../config/index'

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

export class Search extends Component {

    state = {
        textinput: {
            search: '',
            sumnow: null,

        },
        active: false,
        messageIsOpen: true,
        messageText: '',
        // dropdownclear: false

    }

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
    // handleFocus = (event) => {
    //     this.setState({ textinput: { search: '', sumnow: null } });
    // }

    OnClaer() {
        this.setState({ data: null, textinput: { search: '', sumnow: null } })
        // this.handleFocus()
        this.props.clearment()
    }

    OnloadData() {
        let { textinput } = this.state
        this.setState({ active: true, data: null })
        if (textinput.sumnow === '01') {
            this.setState({ textinput: { ...this.state.textinput, sumold: '12' } })
        }

        if (textinput.search === '' || textinput.search.length === 0 || textinput.search === null || textinput.sumnow === null) {
            this.setState({ messageIsOpen: false, messageText: 'Please enter', textinput: { search: '' } }, this.focus)
        } else {
            this.props.searchment(textinput)

        }
    }


    CheckDatareturn(data) {

        if (data.length === 0) {
            this.setState({ messageIsOpen: false, messageText: 'Not Have Data', textinput: { search: '' } })

        }
        return data
    }

    render() {
        let { textinput: { search, sumnow } } = this.state
        return (
            <div>
                <Input
                    ref={this.handleRef}
                    required
                    value={search}
                    name="search"
                    placeholder='Search...'
                    onChange={this.handleChange} >
                    {/* <input /> */}
                </Input>
                <Dropdown
                    clearable
                    name="sumnow"
                    value={sumnow}
                    selection
                    options={options}
                    onChange={this.handleChange}
                    // onFocus={this.handleFocus}
                    placeholder='Select Months'
                />
                
                <Button color='blue' onClick={() => this.OnloadData()}>
                    <Icon name='search' />
                    Search
                    </Button>
                <Button negative onClick={() => this.OnClaer()} >
                <Icon name='close' />Cancel</Button>
                {/* <PDF /> */}
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
