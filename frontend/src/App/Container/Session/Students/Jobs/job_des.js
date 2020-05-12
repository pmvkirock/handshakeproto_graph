import React from 'react';
import { Container } from 'react-bootstrap';

import axios from 'axios';

class JobDes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      error: '',
      setShow: false,
      setShowApplied: false,
      type: 'Student'
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

  getInfo = () => {
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    console.log('Hello' + this.props.idjob);
    if (this.props.idjob == '') {
      this.setState({ data: '' });
    } else {
      axios
        .get('http://localhost:8000/getJobs?idjob=' + this.props.idjob)
        .then(response => {
          if (response.status === 200) {
            this.setState({
              error: '',
              data: response.data
            });
            console.log(this.state.data);
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
    }
  };

  componentDidMount() {
    this.getInfo();
  }

  componentDidUpdate(prevProps) {
    if (this.props.idjob !== prevProps.idjob) this.getInfo();
  }

  render() {
    if (this.state.data[0] == undefined)
      return (
        <div>
          Loading... <br />
          Select Job for Info
        </div>
      );
    return (
      <Container className="padding-all">
        <h4>{this.state.data[0].job_title}</h4>
        <p className="margin-b-2">{this.state.data[0].company_name}</p>
        <p className="intern-type margin-b-2">{this.state.data[0].job_cat}</p>
        <p className="intern-type margin-b-2">
          {this.state.data[0].location}, CA
        </p>
        <p className="intern-type">{this.state.data[0].paid}</p>
        <div
          className="border-all padding-all"
          style={{ paddingTop: 10 + 'px' }}
        >
          <p className="margin-b-2">
            <span style={{ marginTop: 10 + 'px' }}>
              Application Closes on {this.state.data[0].deadline}
            </span>{' '}
          </p>
        </div>
        <p style={{ marginTop: 10 + 'px' }}>{this.state.data[0].job_des}</p>
      </Container>
    );
  }
}

export default JobDes;
