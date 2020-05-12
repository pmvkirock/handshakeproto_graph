import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { updateExpMutation } from '../../../../../mutation/mutations';
import { getStudentQuery } from '../../../../../queries/quries';
import { graphql, compose } from 'react-apollo';

class Education extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hideForm: 'HideForm',
      editJobForm: [],
      error: '',
      data: [],
      company_name: [],
      title: [],
      location: [],
      fromMth: [],
      toMth: [],
      fromYr: [],
      toYr: [],
      idstudent_exp: [],
      desc: [],
      i: null
    };
  }

  ncompanyChange = e => {
    this.setState({ ncompany_name: e.target.value });
  };

  ntitleChange = e => {
    this.setState({ ntitle: e.target.value });
  };

  nlocationChange = e => {
    this.setState({ nlocation: e.target.value });
  };

  ndescChange = e => {
    this.setState({ ndesc: e.target.value });
  };

  nfromMthChange = e => {
    this.setState({ nfromMth: e.target.value });
  };

  ntoMthChange = e => {
    this.setState({ ntoMth: e.target.value });
  };

  nfromYrChange = e => {
    this.setState({ nfromYr: e.target.value });
  };

  ntoYrChange = e => {
    this.setState({ ntoYr: e.target.value });
  };

  companyChange = e => {
    var x = this.state.company_name;
    x[e.target.getAttribute('name')] = e.target.value;
    this.setState({ company_name: x });
  };

  titleChange = e => {
    var x = this.state.title;
    x[e.target.getAttribute('name')] = e.target.value;
    this.setState({ title: x });
  };

  locationChange = e => {
    var x = this.state.location;
    x[e.target.getAttribute('name')] = e.target.value;
    this.setState({ location: x });
  };

  descChange = e => {
    var x = this.state.desc;
    x[e.target.getAttribute('name')] = e.target.value;
    this.setState({ desc: x });
  };

  fromMthChange = e => {
    var x = this.state.fromMth;
    x[e.target.getAttribute('name')] = e.target.value;
    this.setState({ fromMth: x });
  };

  toMthChange = e => {
    var x = this.state.toMth;
    x[e.target.getAttribute('name')] = e.target.value;
    this.setState({ toMth: x });
  };

  fromYrChange = e => {
    var x = this.state.fromYr;
    x[e.target.getAttribute('name')] = e.target.value;
    this.setState({ fromYr: x });
  };

  toYrChange = e => {
    var x = this.state.toYr;
    x[e.target.getAttribute('name')] = e.target.value;
    this.setState({ toYr: x });
  };

  updatePers = async e => {
    e.preventDefault();
    let mutationResponse = await this.props.updateExpMutation({
      variables: {
        user_id: localStorage.getItem('_id'),
        name: this.state.company_name[e.target.value],
        title: this.state.title[e.target.value],
        location: this.state.location[e.target.value],
        work_des: this.state.desc[e.target.value],
        fromMonth: this.state.fromMth[e.target.value],
        toMonth: this.state.toMth[e.target.value],
        fromYear: this.state.fromYr[e.target.value],
        toYear: this.state.toYr[e.target.value],
        _id: e.target.getAttribute('name')
      }
    });
    let response = mutationResponse.data.updateExpMutation;
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

  addSchool = () => {
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

  editFormJob = e => {
    if (this.state.editJobForm[e.target.value] == 'ShowForm') {
      var x = this.state.editJobForm;
      x[e.target.value] = 'HideForm';
      this.setState({
        i: e.target.value,
        editJobForm: x
      });
    } else {
      x = this.state.editJobForm;
      x[e.target.value] = 'ShowForm';
      this.setState({
        i: e.target.value,
        editJobForm: x
      });
    }
  };

  componentDidUpdate(prevProps) {
    //console.log(this.props.data);
    if (this.props.data !== prevProps.data) {
      let props = this.props.data.student;
      props.work_exp.map(
        ({
          name,
          title,
          location,
          fromMonth,
          toMonth,
          fromYear,
          toYear,
          _id,
          work_des
        }) => {
          this.setState(prevState => {
            return {
              editJobForm: prevState.editJobForm.concat('HideForm'),
              company_name: prevState.company_name.concat(name),
              title: prevState.title.concat(title),
              location: prevState.location.concat(location),
              fromMth: prevState.fromMth.concat(fromMonth),
              toMth: prevState.toMth.concat(toMonth),
              fromYr: prevState.fromYr.concat(fromYear),
              toYr: prevState.toYr.concat(toYear),
              idstudent_exp: prevState.idstudent_exp.concat(_id),
              desc: prevState.desc.concat(work_des)
            };
          });
        }
      );
      this.setState({
        data: props.work_exp,
        i: props.school_info.length
      });
    }
  }

  render() {
    var i = -1;
    console.log(this.state);
    var renderDet = this.state.data.map(() => {
      i++;
      return (
        <div key={this.state.idstudent_exp[i]}>
          <div className="edu-details" style={{ paddingTop: 10 + 'px' }}>
            <h6>{this.state.company_name[i]}</h6>
            <p>{this.state.title[i]}</p>
            <p>{this.state.location[i]}</p>
            <p>
              {this.state.fromMth[i]}/{this.state.fromYr[i]}-
              {this.state.toMth[i]}/{this.state.toYr[i]}
            </p>
            <p>{this.state.desc[i]}</p>
            <div className="button">
              <Button id={i + 'edit'} onClick={this.editFormJob} value={i}>
                Edit school
              </Button>
            </div>
            <div className={this.state.editJobForm[i] + ' edu-form'}>
              <Form>
                <Form.Group controlId="formCompName">
                  <Form.Label>Company Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Company Name"
                    value={this.state.company_name[i]}
                    onChange={this.companyChange}
                    name={i}
                  />
                </Form.Group>
                <Form.Group controlId="formTitle">
                  <Form.Label>Job Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Title"
                    value={this.state.title[i]}
                    onChange={this.titleChange}
                    name={i}
                  />
                </Form.Group>
                <Form.Group controlId="formLocation">
                  <Form.Label>Location</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Location"
                    value={this.state.location[i]}
                    onChange={this.locationChange}
                    name={i}
                  />
                </Form.Group>
                <Form.Group controlId="formDescription">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows="3"
                    value={this.state.desc[i]}
                    onChange={this.descChange}
                    name={i}
                  />
                </Form.Group>
                <Row className="top-10">
                  <Col>
                    <Form.Label>Start Month</Form.Label>
                    <Form.Control
                      placeholder="Month"
                      value={this.state.fromMth[i]}
                      onChange={this.fromMthChange}
                      name={i}
                    />
                  </Col>
                  <Col>
                    <Form.Label>Start Year</Form.Label>
                    <Form.Control
                      placeholder="Year"
                      value={this.state.fromYr[i]}
                      onChange={this.fromYrChange}
                      name={i}
                    />
                  </Col>
                  <Col>
                    <Form.Label>To Month</Form.Label>
                    <Form.Control
                      placeholder="Month"
                      value={this.state.toMth[i]}
                      onChange={this.toMthChange}
                      name={i}
                    />
                  </Col>
                  <Col>
                    <Form.Label>Start Year</Form.Label>
                    <Form.Control
                      placeholder="Year"
                      value={this.state.toYr[i]}
                      onChange={this.toYrChange}
                      name={i}
                    />
                  </Col>
                </Row>
                <Button
                  className="top-10"
                  value={i}
                  name={this.state.idstudent_exp[i]}
                  onClick={this.updatePers}
                >
                  Add Experience
                </Button>
              </Form>
            </div>
          </div>
        </div>
      );
    });

    return (
      <Container className="background top-10 padding-all education">
        <div className="edu-details">
          <h5>Job Details</h5>
          {renderDet}
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
  graphql(updateExpMutation, { name: 'updateExpMutation' })
)(Education);
