import React from 'react'
import { Segment, Container } from 'semantic-ui-react/dist/commonjs'

const NotFound = () => (
  <div>
    <Segment piled>
      <Container text style={{ marginTop: '5em' }}>
        <h1>404 Not Found!!!!!!</h1>
      </Container>
    </Segment>
  </div>
)

export default NotFound