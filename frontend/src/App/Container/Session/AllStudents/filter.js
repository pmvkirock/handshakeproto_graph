import React from 'react';
import { Container, Row, Form } from 'react-bootstrap';

class filter extends React.Component {
  constructor(props) {
    super(props);
  }

  nameChange = e => {
    this.props.changeStudFilter(e.target.value);
  };

  schoolChange = e => {
    this.props.changeSchoolFilter(e.target.value);
  };

  render() {
    return (
      <Container>
        <Row className="background padding-all">
          <Form>
            <h5
              style={{
                paddingTop: 20 + 'px',
                paddingBottom: 20 + 'px',
                borderBottom: 1 + 'px Solid #d6d6c2'
              }}
            >
              Filters
            </h5>
            <Form.Group controlId="Name" className="top-10">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter a name"
                onChange={this.nameChange}
              />
            </Form.Group>
            <Form.Group controlId="School" className="top-10">
              <Form.Label>School Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter a school"
                onChange={this.schoolChange}
              />
            </Form.Group>
          </Form>
        </Row>
      </Container>
    );
  }
}

export default filter;
