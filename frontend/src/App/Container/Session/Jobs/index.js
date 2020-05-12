import React from 'react';
import { Container } from 'react-bootstrap';
import JobCont from './job_cont';
import Filter from './filter';

class JobList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      job: '',
      company: ''
    };
  }

  onChangeJob = x => {
    this.setState({
      job: x
    });
  };

  onChangeCompany = x => {
    this.setState({
      company: x
    });
  };

  render() {
    return (
      <Container>
        <Filter
          onChangeCompany={this.onChangeCompany}
          onChangeJob={this.onChangeJob}
        />
        <JobCont
          getCityFilter={this.state.company}
          getJobFilter={this.state.job}
        />
      </Container>
    );
  }
}

export default JobList;
