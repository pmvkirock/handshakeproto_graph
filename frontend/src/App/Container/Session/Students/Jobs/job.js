import React from 'react';
import { Container, Row } from 'react-bootstrap';

class Job extends React.Component {
  render() {
    return (
      <Row>
        <Container className={'job-listing left-10 ' + this.props.show}>
          <h6>{this.props.job_title}</h6>
          <p>
            {this.props.company_name} - {this.props.location}, CA
          </p>
          <p className="intern-type">
            {this.props.job_cat} - {this.props.paid}
          </p>
          <p className="intern-type">Status: {this.props.status}</p>
        </Container>
      </Row>
    );
  }
}

export default Job;
