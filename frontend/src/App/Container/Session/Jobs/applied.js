import React from 'react';
import { Modal, Button, Container, Row, Col, Form } from 'react-bootstrap';
import axios from 'axios';
import cookie from 'react-cookies';
import { Link } from 'react-router-dom';
import { getApplied } from '../../../../queries/quries';
import { graphql, compose } from 'react-apollo';

class apply extends React.Component {
  state = { setShow: false, tprof_pic: '', data: [] };

  handleClose = () => {
    this.props.handleClose();
    this.setState({ setShow: false });
  };
  handleShow = () => this.setState({ setShow: true });

  applyJob = () => {
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios
      .get(
        'http://localhost:8000/getApplied?idcompany=' +
          cookie.load('cookie') +
          '&idjob=' +
          this.props.idjob
      )
      .then(response => {
        console.log('Status Code : ', response.status);
        if (response.status === 200) {
          this.setState({
            error: '',
            authFlag: true,
            data: response.data
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
    if (this.props.data.applied) {
      let props = this.props.data.applied;
      console.log(props);
      this.setState({
        data: props
      });
    }
    this.setState({
      setShow: this.props.show
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.data !== prevProps.data) {
      let props = this.props.data.applied;
      console.log(props);
      this.setState({
        data: props
      });
    }
    if (prevProps.show != this.props.show) {
      this.setState({
        setShow: this.props.show
      });
    }
  }

  render() {
    var printJobs = this.state.data.map(({ idstudent, fname, lname }) => {
      return (
        <Row key={idstudent} className={'border-tb top-3'}>
          <Col xl={9}>
            <Container>
              <Link to={`/student_prof/` + idstudent}>
                <h5 className="mbottom-5">{fname + ' ' + lname}</h5>
              </Link>
            </Container>
          </Col>
        </Row>
      );
    });
    return (
      <Modal show={this.state.setShow} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Apply Now</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ overflowY: 'scroll' }}>{printJobs}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default compose(
  graphql(getApplied, {
    options: props => {
      console.log(props);
      return { variables: { idjob: props.idjob } };
    }
  })
)(apply);
