import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { addStudentMutation } from '../../../../mutation/mutations';
import { graphql, compose } from 'react-apollo';

class signupform extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: '',
      lname: '',
      email: '',
      pass: '',
      sname: '',
      error: '',
      auth: true
    };
  }

  fnameEventHandler = e => {
    this.setState({
      fname: e.target.value
    });
  };

  lnameEventHandler = e => {
    this.setState({
      lname: e.target.value
    });
  };

  passEventHandler = e => {
    this.setState({
      pass: e.target.value
    });
  };

  snameEventHandler = e => {
    this.setState({
      sname: e.target.value
    });
  };

  emailEventHandler = e => {
    this.setState({
      email: e.target.value
    });
  };

  submitForm = async e => {
    //prevent page from refresh
    e.preventDefault();
    let mutationResponse = await this.props.addStudentMutation({
      variables: {
        fname: this.state.fname,
        lname: this.state.lname,
        sname: this.state.sname,
        email: this.state.email,
        password: this.state.pass
      }
    });
    let response = mutationResponse.data.addStudent;
    if (response) {
      if (response.status === '200') {
        console.log('Successfully added');
      } else {
        console.log('unsuccessful');
      }
    }
  };

  render() {
    return (
      <div className=" container form-cont">
        <Form className="signup-form">
          <h2>Create New Account</h2>
          <p>
            For companies please click the link{' '}
            <Link to="/companysignup">here</Link>{' '}
          </p>

          <Form.Group controlId="formGridFName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              onChange={this.fnameEventHandler}
              type="text"
              placeholder="Enter First Name"
            />
          </Form.Group>

          <Form.Group controlId="formGridLName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              onChange={this.lnameEventHandler}
              type="text"
              placeholder="Enter Last Name"
            />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              onChange={this.emailEventHandler}
              type="email"
              placeholder="Enter Email"
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              onChange={this.passEventHandler}
              type="password"
              placeholder="Enter Password"
            />
          </Form.Group>

          <Form.Group controlId="formGridSLName">
            <Form.Label>School Name</Form.Label>
            <Form.Control
              onChange={this.snameEventHandler}
              type="text"
              placeholder="Enter School Name"
            />
          </Form.Group>

          <Form.Group controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Terms and Conditions" />
          </Form.Group>

          <Button variant="primary" onClick={this.submitForm}>
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

export default compose(
  graphql(addStudentMutation, { name: 'addStudentMutation' })
)(signupform);
