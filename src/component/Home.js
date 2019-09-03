import React from 'react'
import { Container, Header, Segment, Icon, List } from 'semantic-ui-react/dist/commonjs'
import { Link } from "react-router-dom";


export default () => (
    <div>
        <Container style={{ marginTop: '5em' }}>
            <Header size="huge">VEHICLE EXPENSES FORM ( VH 3 )</Header>
        </Container>
        <Container style={{ marginTop: '2em', marginBottom: '30em' }}>
            <Segment color="red">

                <List size='big' divided animated verticalAlign='middle'>
                    <List.Item>
                        <Icon name='car' />
                        <List.Content>
                            <List.Header><Link to="/vh3information">Information VH3</Link></List.Header>
                            <List.Description>
                                หน้ากรอกข้อมูลการใช้งานรถยนต์ (VH3 Information)
        </List.Description>
                        </List.Content>
                    </List.Item>
                    <List.Item>
                        <Icon name='chart area' />
                        <List.Content>
                            <List.Header><Link to="/summerycar">SummeryCar</Link></List.Header>
                            <List.Description>
                                หน้า SummeryCar ข้อมูลการใช้งานรถยนต์ (SummeryCar)
        </List.Description>
                        </List.Content>
                    </List.Item>
                </List>
                {/* <ModuleHeader /> */}
            </Segment>
        </Container>
        <Segment inverted vertical style={{ padding: '5em 0em' }}>
            <Container>
        Power by W&W Team  (version 1.0.5)

            </Container>
        </Segment>
        {/* <BodyTest /> */}
    </div>
)
