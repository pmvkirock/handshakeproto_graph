import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { addCompanyMutation } from '../../../../mutation/mutations';
import { graphql, compose } from 'react-apollo';

class signupform extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cname: '',
      location: '',
      email: '',
      pass: '',
      error: '',
      auth: true
    };
  }

  cnameEventHandler = e => {
    this.setState({
      cname: e.target.value
    });
  };

  locationEventHandler = e => {
    this.setState({
      location: e.target.value
    });
  };

  passEventHandler = e => {
    this.setState({
      pass: e.target.value
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
    let mutationResponse = await this.props.addCompanyMutation({
      variables: {
        cname: this.state.cname,
        location: this.state.location,
        email: this.state.email,
        password: this.state.pass
      }
    });
    let response = mutationResponse.data.addCompany;
    if (response) {
      if (response.status === '200') {
        alert('Successfully added');
      } else {
        alert('unsuccessful');
      }
    }
  };

  render() {
    return (
      <div className=" container form-cont">
        <Form className="signup-form">
          <h2>Create New Account</h2>
          <p>
            For students please click the link <Link to="/signup">here</Link>
          </p>

          <Form.Group controlId="formGridCName">
            <Form.Label>Company Name</Form.Label>
            <Form.Control
              type="text"
              onChange={this.cnameEventHandler}
              placeholder="Enter Company Name"
            />
          </Form.Group>

          <Form.Group controlId="formGridLocation">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              onChange={this.locationEventHandler}
              placeholder="Enter Location"
            />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              onChange={this.emailEventHandler}
              placeholder="Enter Email"
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              onChange={this.passEventHandler}
              placeholder="Enter Password"
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
  graphql(addCompanyMutation, { name: 'addCompanyMutation' })
)(signupform);
