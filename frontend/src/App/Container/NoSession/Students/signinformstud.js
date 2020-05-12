import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import { loginMutation } from '../../../../mutation/mutations';
import { graphql, compose } from 'react-apollo';

class signupform extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      authFlag: false,
      error: ''
    };
    this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
    this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
  }
  usernameChangeHandler = e => {
    this.setState({
      username: e.target.value
    });
  };
  passwordChangeHandler = e => {
    this.setState({
      password: e.target.value
    });
  };
  submitLogin = async e => {
    //prevent page from refresh
    e.preventDefault();
    console.log(this.state);
    let mutationResponse = await this.props.loginMutation({
      variables: {
        email: this.state.username,
        password: this.state.password
      }
    });
    console.log(mutationResponse);
    let response = mutationResponse.data.login;
    if (response) {
      if (response.status === '200') {
        console.log(response.message);
        localStorage.setItem('_id', response.message);
        localStorage.setItem('type', 'Student');
        localStorage.setItem('LogFlag', true);
        this.setState({
          authFlag: true
        });
      } else {
        this.setState({
          authFlag: false
        });
      }
    }
  };

  render() {
    let redirectVar = null;
    if (this.state.authFlag) redirectVar = <Redirect to="/stud_prof" />;
    else redirectVar = <Redirect to="/login" />;
    return (
      <div>
        {redirectVar}
        <div className=" container signin-form-cont">
          <Form className="signup-form">
            <h2>Student Log In</h2>
            <p style={{ color: 'red' }}>{this.state.error}</p>
            <p>
              For companies please click the link{' '}
              <Link to="/companylogin">here</Link>
            </p>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email"
                onChange={this.usernameChangeHandler}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password"
                onChange={this.passwordChangeHandler}
              />
            </Form.Group>

            <Button variant="primary" onClick={this.submitLogin}>
              Submit
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}

export default compose(graphql(loginMutation, { name: 'loginMutation' }))(
  signupform
);
