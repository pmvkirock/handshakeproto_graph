/* eslint react/prop-types: 0 */

import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import NewJob from './edit_det';

import Job from './job';
import JobDes from './job_des';
import { getAllJobsQuery } from '../../../../queries/quries';
import { graphql, compose } from 'react-apollo';

class JobCont extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      activeJob: '',
      activeComp: '',
      setShow: false,
      i: 0
    };
  }

  handleJob = (job_id, comp_id) => {
    this.setState({
      activeJob: job_id,
      activeComp: comp_id
    });
  };

  handleClose = () => this.setState({ setShow: false });
  handleShow = () => {
    this.setState({ setShow: true });
  };

  componentDidMount() {
    //console.log('All' + this.props.data.allStudent[0]._id);
    if (this.props.data.allJobs) {
      let props = this.props.data.allJobs;
      this.setState({
        data: props,
        activeJob: props[0]._id,
        activeComp: props[0]._id
      });
    }
  }

  componentDidUpdate(prevProps) {
    //console.log('All' + this.props.data.allStudent[0]._id);
    if (this.props.data !== prevProps.data) {
      let props = this.props.data.allJobs;
      this.setState({
        data: props,
        activeJob: props[0]._id,
        activeComp: props[0]._id
      });
    }
    if (this.props.getJobFilterPartFull !== prevProps.getJobFilterPartFull)
      this.setState({ activeJob: '' });
  }

  render() {
    var add = '';
    if (localStorage.getItem('type') == 'Company') {
      add = (
        <Button
          style={{
            float: 'right',
            borderRadius: 100 + '%',
            right: 40,
            bottom: 30,
            position: 'fixed',
            width: 60 + 'px',
            height: 60 + 'px',
            fontSize: 20 + 'px'
          }}
          onClick={this.handleShow}
        >
          +
        </Button>
      );
    }
    var printJobs = this.state.data.map(
      ({
        _id,
        title,
        deadline,
        location,
        salary,
        desc,
        job_cat,
        paid,
        company_name,
        email,
        comp_id
      }) => {
        let showJob = 'ShowForm';
        let regexJob = new RegExp(this.props.getJobFilter, 'gi');
        if (title.match(regexJob) == null) showJob = 'HideForm';
        let regexCity = new RegExp(this.props.getCityFilter, 'gi');
        if (company_name.match(regexCity) == null) showJob = 'HideForm';
        if (localStorage.getItem('type') === 'Company')
          if (comp_id !== localStorage.getItem('_id')) showJob = 'HideForm';
        return (
          <a
            indexkey={_id}
            onClick={() => this.handleJob(_id, comp_id)}
            className="jobCont"
            key={_id}
            href={'#'}
          >
            <Job
              data-key={_id}
              job_title={title}
              deadline={deadline}
              location={location}
              salary={salary}
              job_des={desc}
              job_cat={job_cat}
              paid={paid}
              company_name={company_name}
              email={email}
              show={showJob}
            />
          </a>
        );
      }
    );
    return (
      <Row className="background top-10">
        <Col xl={4} style={{ overflowY: 'scroll', height: 70 + 'vh' }}>
          <Row>
            <Container className="job-listing">
              <h6>Job Listing</h6>
            </Container>
          </Row>
          {printJobs}
        </Col>
        <Col xl={8} style={{ overflowY: 'scroll', height: 70 + 'vh' }}>
          <JobDes
            idjob={this.state.activeJob}
            idcompany={this.state.activeComp}
          />
        </Col>
        {add}
        <NewJob
          show={this.state.setShow}
          handleClose={this.handleClose}
          getInfo={this.getInfo}
        />
      </Row>
    );
  }
}

export default compose(
  graphql(getAllJobsQuery, {
    options: {
      variables: { name: '' }
    }
  })
)(JobCont);
