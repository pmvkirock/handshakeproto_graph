import React from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { updateProfile } from '../../../../../mutation/mutations';
import { getStudentQuery } from '../../../../../queries/quries';
import { graphql, compose } from 'react-apollo';

class Primary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hideForm: 'HideForm',
      hideProfileForm: 'HideForm',

      firstName: '',
      lastName: '',
      dob: '',
      city: '',
      state: '',
      country: '',
      phone_num: '',
      email: '',
      coll_name: '',
      degree: '',
      data: [],
      tfirstName: '',
      tlastName: '',
      tdob: '',
      tcity: '',
      tstate: '',
      tcountry: '',
      tphone_num: '',
      temail: '',
      tcoll_name: '',
      tdegree: '',
      prof_pic: ''
    };
  }

  updatePers = async e => {
    e.preventDefault();
    let mutationResponse = await this.props.updateProfile({
      variables: {
        fname: this.state.tfirstName,
        lname: this.state.tlastName,
        dob: this.state.tdob,
        city: this.state.tcity,
        state: this.state.tstate,
        country: this.state.tcountry,
        user_id: localStorage.getItem('_id')
      }
    });
    let response = mutationResponse.data.updateProfile;
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

  firstNameChange = e => {
    this.setState({ tfirstName: e.target.value });
  };

  lastNameChange = e => {
    this.setState({ tlastName: e.target.value });
  };

  dobChange = e => {
    this.setState({ tdob: e.target.value });
  };

  cityChange = e => {
    this.setState({ tcity: e.target.value });
  };

  stateChange = e => {
    this.setState({ tstate: e.target.value });
  };

  countryChange = e => {
    this.setState({ tcountry: e.target.value });
  };

  handleFileUpload = event => {
    let data = new FormData();
    console.log(event.target.files[0]);
    data.append('file', event.target.files[0]);
    data.append('name', 'Prof_Pic');
    axios
      .post('http://localhost:8000/files', data)
      .then(response => {
        console.log(response);
        this.setState({
          tprof_pic: response.data
        });
      })
      .catch(error => console.log('error ' + error));
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
        firstName: props.fname,
        lastName: props.lname,
        dob: props.dob,
        city: props.city,
        state: props.state,
        country: props.country,
        tfirstName: props.fname,
        tlastName: props.lname,
        tdob: props.dob,
        tcity: props.city,
        tstate: props.state,
        tcountry: props.country
      });
    }
  }

  render() {
    var prof_pic = '/profile.png';
    if (
      this.state.prof_pic != '' &&
      this.state.prof_pic != null &&
      this.state.prof_pic != undefined
    ) {
      prof_pic =
        `http://localhost:8000/prof_pic/` +
        this.state.prof_pic.replace('Prof_Pic', 'file') +
        `.jpeg`;
    }
    return (
      <Container className="background padding-all prof-info">
        <img
          src={prof_pic}
          alt="user pic"
          style={{ width: 100 + 'px', borderRadius: 50 + '%' }}
        />
        <h4>{this.state.firstName + ' ' + this.state.lastName}</h4>
        <p>{this.state.coll_name}</p>
        <p>{this.state.degree}</p>
        <p>
          {this.state.city +
            ', ' +
            this.state.state +
            ', ' +
            this.state.country}
        </p>
        <Button onClick={this.editpersonalinfo}>Edit Personal Info</Button>
        <div className={this.state.hideProfileForm + ' personal-form top-10'}>
          <Form classname="top-10">
            <Form.Group controlId="formFName">
              <Form.Control
                type="text"
                value={this.state.tfirstName}
                placeholder="Enter First Name"
                onChange={this.firstNameChange}
              />
            </Form.Group>
            <Form.Group controlId="formLName">
              <Form.Control
                type="text"
                value={this.state.tlastName}
                placeholder="Enter Last Name"
                onChange={this.lastNameChange}
              />
            </Form.Group>
            <Form.Group controlId="formCity">
              <Form.Control
                type="text"
                value={this.state.tcity}
                placeholder="Enter City"
                onChange={this.cityChange}
              />
            </Form.Group>
            <Form.Group controlId="formState">
              <Form.Control
                type="text"
                value={this.state.tstate}
                placeholder="Enter State"
                onChange={this.stateChange}
              />
            </Form.Group>
            <Form.Group controlId="formCountry">
              <Form.Control
                type="text"
                value={this.state.tcountry}
                placeholder="Enter Country"
                onChange={this.countryChange}
              />
            </Form.Group>
            <Form.Group controlId="formDOB">
              <Form.Control
                type="text"
                value={this.state.tdob}
                placeholder="Date of Birth"
                onChange={this.dobChange}
              />
            </Form.Group>
            <Form.Group controlId="formFile">
              <Form.Control
                name="prof_pic"
                type="file"
                onChange={this.handleFileUpload}
              />
            </Form.Group>
            <Button variant="primary" onClick={this.updatePers}>
              Update
            </Button>
          </Form>
        </div>
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
  graphql(updateProfile, { name: 'updateProfile' })
)(Primary);
