import React from 'react'
import { Container, Header, Segment, List } from 'semantic-ui-react/dist/commonjs'

const UpdateNew = () => {
    return (
        <div>
            <Container style={{ marginTop: '2em' }}>
                <Segment color="red">
                    <Header as='h3'>UpdateNew</Header>
                    <List>
                        <List.Item>
                            <List.Icon name='arrow right' />
                            <List.Content ><p style={{color: "blue"}}>เพิ่มเติมส่วนของการคัณหาข้อมูลย้อนหลัง</p></List.Content>
                        </List.Item>
                        {/* <List.Item>
                            <List.Icon name='arrow right' />
                            <List.Content>ปุ่ม บันทึก (Save) ในหน้าการบันทึกข้อมูลการใช้งานรถ (Information VH3) จะช่วยให้บันทึกข้อมูลก่อนบันทึกข้อมูลจริงเข้าสู่ระบบ เพื่อช่วยให้กรอกข้อมูลได้ต่อเนื่อง (ขอปิดการใช้งานส่วนนี้ก่อน เนื่องจากมี บัคในระบบ)</List.Content>
                        </List.Item> */}
                    </List>
                    <Header as='h3'>Coming Soon UpData...</Header>
                    <List>
                        {/* <List.Item>
                            <List.Icon name='arrow right' />
                            <List.Content>หน้า Summary Car เพิ่มส่วนที่เกี่ยวข้องกับ Admin BU ในการค้ณหารถใน BU ตัวเองได้ง่ายขึ้น (22-11-2019)</List.Content>
                        </List.Item> */}
                        {/* <List.Item>
                            <List.Icon name='arrow right' /> */}
                        {/* <List.Content>ปุ่ม บันทึก (Save) ในหน้าการบันทึกข้อมูลการใช้งานรถ (Information VH3) จะช่วยให้บันทึกข้อมูลก่อนบันทึกข้อมูลจริงเข้าสู่ระบบ เพื่อช่วยให้กรอกข้อมูลได้ต่อเนื่อง</List.Content> */}
                        {/* </List.Item> */}
                    </List>
                    <Header as='h3'>หากติดปัญหาติดต่อได้ที่ Patcharakit_Pha@truecorp.co.th (ต้อง) Tel. 083-925-8135</Header>
                </Segment>
            </Container>
        </div>
    )
}

export default UpdateNew
