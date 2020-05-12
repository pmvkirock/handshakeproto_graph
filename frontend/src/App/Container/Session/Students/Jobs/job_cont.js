/* eslint react/prop-types: 0 */

import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import cookie from 'react-cookies';

import Job from './job';
import JobDes from './job_des';

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

  getInfo = () => {
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios
      .get(
        'http://localhost:8000/getAppliedJobs?idstudent=' +
          cookie.load('cookie')
      )
      .then(response => {
        if (response.status === 200) {
          this.setState({
            error: '',
            data: response.data
          });
          console.log(this.state.data);
          this.setState({
            activeJob: this.state.data[0].idjob,
            activeComp: this.state.data[0].idcompany
          });
        } else {
          this.setState({
            error:
              '<p style={{color: red}}>Please enter correct credentials</p>',
            authFlag: false
          });
        }
      })
      .catch(e => {
        this.setState({
          error: 'Please enter correct credentials' + e
        });
      });
  };

  componentDidMount() {
    this.getInfo();
  }

  componentDidUpdate(prevProps) {
    if (this.props.getJobFilterPartFull !== prevProps.getJobFilterPartFull)
      this.setState({ activeJob: '' });
  }

  render() {
    var printJobs = this.state.data.map(
      ({
        idjob,
        job_title,
        deadline,
        location,
        salary,
        job_des,
        job_cat,
        paid,
        company_name,
        email,
        idcompany,
        status
      }) => {
        let showJob = 'ShowForm';
        return (
          <a
            indexkey={idjob}
            onClick={() => this.handleJob(idjob, idcompany)}
            className="jobCont"
            key={idjob}
            href={'#'}
          >
            <Job
              data-key={idjob}
              job_title={job_title}
              deadline={deadline}
              location={location}
              salary={salary}
              job_des={job_des}
              job_cat={job_cat}
              paid={paid}
              company_name={company_name}
              email={email}
              show={showJob}
              status={status}
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
      </Row>
    );
  }
}

export default JobCont;
