import React from 'react';
import { Container } from 'react-bootstrap';

class Description extends React.Component {
  render() {
    return (
      <Container className="background padding-all">
        <h4>About</h4>
        <p>{this.props.des}</p>
      </Container>
    );
  }
}

export default Description;
