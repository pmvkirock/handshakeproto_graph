import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import StudList from './studentlist';
import Filter from './filter';

class StudCont extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      getStudFilter: '',
      getSchoolFilter: ''
    };
  }

  changeStudFilter = name => {
    this.setState({
      getStudFilter: name
    });
  };

  changeSchoolFilter = name => {
    this.setState({
      getSchoolFilter: name
    });
  };

  render() {
    return (
      <Container>
        <Row>
          <Col xl={3} style={{ marginTop: '20px' }}>
            <Filter
              changeStudFilter={this.changeStudFilter}
              changeSchoolFilter={this.changeSchoolFilter}
            />
          </Col>
          <Col xl={9}>
            <StudList
              getStudFilter={this.state.getStudFilter}
              getSchoolFilter={this.state.getSchoolFilter}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default StudCont;
