import React from 'react';
import { Row, Form, Col, Container, Button } from 'react-bootstrap';

class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allJobs: true,
      PartTime: false,
      FullTime: false,
      Internship: false,
      OnCampus: false,
      MyJobs: false
    };
  }

  jobChange = e => {
    this.props.onChangeJob(e.target.value);
  };

  compChange = e => {
    this.props.onChangeCompany(e.target.value);
  };

  deactivateActive = () => {
    this.setState({
      allJobs: false,
      PartTime: false,
      FullTime: false,
      Internship: false,
      OnCampus: false,
      MyJobs: false
    });
  };

  render() {
    var myJobs = '';
    if (this.props.getType == 'Company') {
      myJobs = (
        <Button
          className="mleft-10"
          variant="outline-primary"
          onClick={() => {
            this.deactivateActive();
            this.setState({
              MyJobs: true
            });
          }}
          active={this.state.MyJobs}
        >
          My Jobs
        </Button>
      );
    }
    console.log(myJobs);
    return (
      <Row>
        <Container className="background top-10 padding-all box-shadow">
          <Form>
            <Row>
              <Col>
                <Form.Control
                  placeholder="Search for Job Titles"
                  onChange={this.jobChange}
                />
              </Col>
              <Col>
                <Form.Control
                  placeholder="Company"
                  onChange={this.compChange}
                />
              </Col>
            </Row>
          </Form>
        </Container>
      </Row>
    );
  }
}

export default Filter;
