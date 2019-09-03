import React, { Component } from 'react'
import { Container, Divider, Segment } from 'semantic-ui-react/dist/commonjs'
import ModuleSearch from './Module/Search'
import ModuleDataTable from './Module/DataTable'

export class EditData extends Component {
    render() {
        return (
            <div>
                <Container style={{ marginTop: '5em' }}>
                    {/* <Header size="huge">VEHICLE EXPENSES FORM ( VH 3 )</Header> */}
                </Container>
                <Container style={{ marginTop: '2em', marginBottom: '2em' }}>
                    <Segment color="red">
                        <ModuleSearch />
                    </Segment>
                </Container>
                <ModuleDataTable />
                <Divider />
            </div>
        )
    }
}

export default EditData
