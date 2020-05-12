import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Education from './education_prof';
import Experience from './job_prof';
import Primary from './primary';
import { getStudentQuery } from '../../../../../queries/quries';
import { graphql, compose } from 'react-apollo';

class Stud_Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hideForm: 'HideForm',
      hideProfileForm: 'HideForm',
      hideObj: 'HideForm',
      phone_num: '',
      email: '',
      career_obj: '',
      tphone_num: '',
      temail: '',
      tcareer_obj: ''
    };
  }

  career_objChange = e => {
    this.setState({ tcareer_obj: e.target.value });
  };

  phoneChange = e => {
    this.setState({ tphone_num: e.target.value });
  };

  emailChange = e => {
    this.setState({ temail: e.target.value });
  };

  editobj = () => {
    if (this.state.hideObj == 'ShowForm') {
      this.setState({
        hideObj: 'HideForm'
      });
    } else {
      this.setState({
        hideObj: 'ShowForm'
      });
    }
  };

  componentDidUpdate(prevProps) {
    //console.log(this.props.data);
    if (this.props.data !== prevProps.data) {
      let props = this.props.data.student;
      this.setState({
        error: '',
        phone_num: props.phone,
        email: props.email,
        career_obj: props.obj,
        tphone_num: props.phone,
        temail: props.email,
        tcareer_obj: props.obj
      });
    }
  }

  render() {
    return (
      <Container style={{ width: 80 + '%' }}>
        <Row>
          <Col xl={4}>
            <Row
              className="all-row"
              style={{ textAlign: 'center', marginTop: 10 + 'px' }}
            >
              <Primary id={this.props.match.params.id} />
            </Row>
            <Row className="all-row">
              <Container className="background top-10 padding-all skills">
                <h5>Contact Info</h5>
                <p>
                  Mobile No: <span>{this.state.phone_num}</span>
                </p>
                <p>
                  Email: <span>{this.state.email}</span>
                </p>
              </Container>
            </Row>
          </Col>
          <Col
            xl={8}
            className="height-200 left-10"
            style={{ marginTop: 10 + 'px', width: 95 + '%' }}
          >
            <Row>
              <Container className="background padding-all">
                <h5>My Journey</h5>
                <Form>
                  <Form.Group controlId="exampleForm.ControlTextarea1">
                    <p>{this.state.career_obj}</p>
                  </Form.Group>
                </Form>
              </Container>
            </Row>
            <Row>
              <Education id={this.props.match.params.id} />
            </Row>
            <Row>
              <Experience id={this.props.match.params.id} />
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default compose(
  graphql(getStudentQuery, {
    options: props => ({ variables: { _id: props.match.params.id } })
  })
)(Stud_Profile);
