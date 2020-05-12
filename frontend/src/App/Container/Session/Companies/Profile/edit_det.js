import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { updateCompanyProfile } from '../../../../../mutation/mutations';
import { graphql, compose } from 'react-apollo';

class edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      setShow: false,
      tprof_pic: '',
      comp_name: '',
      location: '',
      des: '',
      type: '',
      no: '',
      web: '',
      email: '',
      owner: ''
    };
  }

  updatePers = async e => {
    e.preventDefault();
    let mutationResponse = await this.props.updateCompanyProfile({
      variables: {
        cname: this.state.comp_name,
        location: this.state.location,
        desc: this.state.des,
        type: this.state.type,
        noofemp: this.state.no,
        website: this.state.web,
        email: this.state.email,
        owner_ship: this.state.owner,
        _id: localStorage.getItem('_id')
      }
    });
    let response = mutationResponse.data.updateCompanyProfile;
    if (response) {
      if (response.status === '200') {
        alert('Successfully Updated');
        this.handleClose();
      } else {
        console.log('unsuccessful');
      }
    }
  };
  compName = e => {
    this.setState({
      comp_name: e.target.value
    });
  };

  location = e => {
    this.setState({
      location: e.target.value
    });
  };

  desc = e => {
    this.setState({
      des: e.target.value
    });
  };

  type = e => {
    this.setState({
      type: e.target.value
    });
  };

  noofemp = e => {
    this.setState({
      no: e.target.value
    });
  };

  website = e => {
    this.setState({
      web: e.target.value
    });
  };

  owner = e => {
    this.setState({
      owner: e.target.value
    });
  };

  email = e => {
    this.setState({
      email: e.target.value
    });
  };

  handleClose = () => {
    this.props.handleClose();
    this.setState({ setShow: false });
  };
  handleShow = () => this.setState({ setShow: true });

  componentDidUpdate(prevProps) {
    if (prevProps.show !== this.props.show)
      this.setState({
        setShow: this.props.show,
        comp_name: this.props.data.cname,
        location: this.props.data.location,
        des: this.props.data.desc,
        type: this.props.data.company_type,
        no: this.props.data.noofemp,
        web: this.props.data.website,
        email: this.props.data.email,
        owner: this.props.data.owner_ship
      });
  }

  render() {
    console.log(this.state.data);
    return (
      <Modal show={this.state.setShow} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ overflowY: 'scroll' }}>
          <Form classname="top-10">
            <Form.Group controlId="formCompanyName">
              <Form.Label>Company Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Company Name"
                value={this.state.comp_name}
                onChange={this.compName}
              />
            </Form.Group>
            <Form.Group controlId="formLocation">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Location"
                value={this.state.location}
                onChange={this.location}
              />
            </Form.Group>
            <Form.Group controlId="formType">
              <Form.Label>Company Type</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Type"
                value={this.state.type}
                onChange={this.type}
              />
            </Form.Group>
            <Form.Group controlId="formCnt">
              <Form.Label>No of Employees </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Employee Count"
                value={this.state.no}
                onChange={this.noofemp}
              />
            </Form.Group>
            <Form.Group controlId="formOwnership">
              <Form.Label>Ownership Type </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Ownership Type"
                value={this.state.owner}
                onChange={this.owner}
              />
            </Form.Group>
            <Form.Group controlId="formWebsite">
              <Form.Label>Website</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Website"
                value={this.state.web}
                onChange={this.website}
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={this.state.email}
                onChange={this.email}
              />
            </Form.Group>
            <Form.Group controlId="formWebsite">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows="3"
                value={this.state.des}
                onChange={this.desc}
              />
            </Form.Group>
            <Form.Group controlId="formFile">
              <Form.Control
                name="resume"
                type="file"
                onChange={this.handleFileUpload}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={this.updatePers}>
            Apply
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default compose(
  graphql(updateCompanyProfile, { name: 'updateCompanyProfile' })
)(edit);
