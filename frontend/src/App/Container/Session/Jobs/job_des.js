import React from 'react';
import { Container, Button, Alert } from 'react-bootstrap';
import Applyjobs from './applyjobs';
import Applied from './applied';
import { getAllJobsQuery } from '../../../../queries/quries';
import { graphql, compose } from 'react-apollo';
import { apply } from '../../../../mutation/mutations';

class JobDes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      error: '',
      setShow: false,
      setShowApplied: false,
      type: 'student',
      show: true,
      i: 0
    };
  }

  handleClose = () => this.setState({ setShow: false });
  handleShow = () => {
    this.setState({ setShow: true });
  };

  handleCloseApplied = () => this.setState({ setShowApplied: false });
  handleShowApplied = () => {
    this.setState({ setShowApplied: true });
  };

  componentDidUpdate(prevProps) {
    if (this.props.idjob !== prevProps.idjob) {
      if (this.props.data !== prevProps.data) {
        let props = this.props.data.allJobs;
        for (let i = 0; i < props.length; i++)
          if (props[i]._id === this.props.idjob)
            this.setState({
              data: props[i],
              activeJob: props[i]._id,
              activeComp: props[i].comp_id,
              i: i
            });
      }
    }
  }

  apply = async e => {
    e.preventDefault();
    let mutationResponse = await this.props.apply({
      variables: {
        idcompany: this.state.activeComp,
        idstudent: localStorage.getItem('_id'),
        idjob: this.state.activeJob
      }
    });
    let response = mutationResponse.data.apply;
    console.log(mutationResponse);
    if (response) {
      if (response.status === '200') {
        alert(response.message);
      } else {
        console.log('unsuccessful');
      }
    }
  };

  render() {
    var x;
    if (this.state.i == 0) return <div>Please click on job...</div>;
    if (localStorage.getItem('type') == 'Company') {
      if (this.props.idcompany == localStorage.getItem('_id')) {
        x = (
          <Button
            style={{ float: 'right', padding: 5 + 'px' }}
            onClick={this.handleShowApplied}
          >
            Applied Candidates
          </Button>
        );
      } else {
        x = '';
      }
    } else {
      x = (
        <Button
          style={{ float: 'right', padding: 5 + 'px' }}
          onClick={this.apply}
        >
          Apply Now
        </Button>
      );
    }
    return (
      <Container className="padding-all">
        <h4>{this.state.data.title}</h4>
        <p className="margin-b-2">{this.state.data.company_name}</p>
        <p className="intern-type margin-b-2">{this.state.data.job_cat}</p>
        <p className="intern-type margin-b-2">{this.state.data.location}, CA</p>
        <p className="intern-type">{this.state.data.paid}</p>
        <div
          className="border-all padding-all"
          style={{ paddingTop: 10 + 'px' }}
        >
          <p className="margin-b-2">
            <span style={{ marginTop: 10 + 'px' }}>
              Application Closes on {this.state.data.deadline}
            </span>{' '}
            {x}
          </p>
        </div>
        <p style={{ marginTop: 10 + 'px' }}>{this.state.data.desc}</p>
        <Applyjobs
          show={this.state.setShow}
          handleClose={this.handleClose}
          idcompany={this.state.data.comp_id}
          idjob={this.props.idjob}
        />
        <Applied
          show={this.state.setShowApplied}
          handleClose={this.handleCloseApplied}
          idcompany={this.state.data.comp_id}
          idjob={this.props.idjob}
        />
      </Container>
    );
  }
}

export default compose(
  graphql(getAllJobsQuery, {
    options: {
      variables: { name: '' }
    }
  }),
  graphql(apply, { name: 'apply' })
)(JobDes);
