import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Education from './education_prof';
import Experience from './job_prof';
import Primary from './primary';
import { updateContact } from '../../../../../mutation/mutations';
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

  updatePers = async e => {
    e.preventDefault();
    console.log(this.state);
    let mutationResponse = await this.props.updateContact({
      variables: {
        user_id: localStorage.getItem('_id'),
        phone: String(this.state.tphone_num),
        email: this.state.temail,
        obj: this.state.tcareer_obj
      }
    });
    let response = mutationResponse.data.updateContact;
    if (response) {
      if (response.status === '200') {
        alert('Successfully Updated');
        graphql(getStudentQuery, {
          options: {
            variables: { _id: localStorage.getItem('_id') }
          }
        });
      } else {
        console.log('unsuccessful');
      }
    }
  };

  editinfo = () => {
    if (this.state.hideForm == 'ShowForm') {
      this.setState({
        hideForm: 'HideForm'
      });
    } else {
      this.setState({
        hideForm: 'ShowForm'
      });
    }
  };

  editpersonalinfo = () => {
    if (this.state.hideProfileForm == 'ShowForm') {
      this.setState({
        hideProfileForm: 'HideForm'
      });
    } else {
      this.setState({
        hideProfileForm: 'ShowForm'
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
              <Primary />
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
                <div className="school-button">
                  <Button onClick={this.editinfo}>Edit Contact Info</Button>
                </div>
                <div
                  className={this.state.hideForm}
                  style={{ marginTop: 10 + 'px' }}
                >
                  <Form>
                    <Form.Group controlId="formPhone">
                      <Form.Label>Phone No</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Phone No"
                        value={this.state.tphone_num}
                        onChange={this.phoneChange}
                      />
                    </Form.Group>
                    <Form.Group controlId="formEmail">
                      <Form.Label>Email ID</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Email"
                        value={this.state.temail}
                        onChange={this.emailChange}
                      />
                    </Form.Group>
                    <Button variant="primary" onClick={this.updatePers}>
                      Update
                    </Button>
                  </Form>
                </div>
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
                    <Button
                      variant="primary"
                      onClick={this.editobj}
                      style={{ marginTop: 10 + 'px' }}
                    >
                      Update Journey
                    </Button>
                    <div className={this.state.hideObj + ' top-10'}>
                      <Form.Control
                        as="textarea"
                        rows="3"
                        value={this.state.tcareer_obj}
                        onChange={this.career_objChange}
                      />
                      <Button
                        variant="primary"
                        onClick={this.updatePers}
                        style={{ marginTop: 10 + 'px' }}
                      >
                        Submit
                      </Button>
                    </div>
                  </Form.Group>
                </Form>
              </Container>
            </Row>
            <Row>
              <Education />
            </Row>
            <Row>
              <Experience />
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default compose(
  graphql(getStudentQuery, {
    options: {
      variables: { _id: localStorage.getItem('_id') }
    }
  }),
  graphql(updateContact, { name: 'updateContact' })
)(Stud_Profile);
