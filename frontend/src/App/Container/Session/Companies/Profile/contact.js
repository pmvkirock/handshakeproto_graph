import React from 'react';
import { Container, Row, Button } from 'react-bootstrap';
import EditDet from './edit_det';

class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: {}, setShow: false };
  }

  handleClose = () => {
    this.setState({ setShow: false });
  };
  handleShow = () => {
    this.setState({ setShow: true });
  };

  componentDidUpdate(prevProps) {
    if (this.props.data !== prevProps.data) {
      this.setState({
        data: this.props.data
      });
    }
  }

  render() {
    return (
      <Container className="background">
        <Row className="padding-all" style={{ paddingBottom: 0 + 'px' }}>
          Email:
          <br /> {this.props.email}
        </Row>
        <Row className="padding-all" style={{ paddingBottom: 0 + 'px' }}>
          Website:
          <br /> {this.props.website}
        </Row>
        <Row className="padding-all">
          <Button onClick={this.handleShow}>Edit Info</Button>
        </Row>
        <EditDet
          show={this.state.setShow}
          handleClose={this.handleClose}
          data={this.state.data}
        />
      </Container>
    );
  }
}

export default Contact;
