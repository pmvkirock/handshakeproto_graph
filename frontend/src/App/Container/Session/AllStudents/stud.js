import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class Stud extends React.Component {
  render() {
    let x = 'profile.png';
    if (this.props.prof_pic != '' && this.props.prof_pic != undefined) {
      x = this.props.prof_pic;
    }
    return (
      <Row
        key={this.props.id}
        className={'top-10 background job-listing ' + this.props.showJob}
      >
        <Col xl={2}>
          <img
            src={x}
            alt="user pic"
            style={{ width: 70 + 'px', borderRadius: 50 + '%' }}
          />
        </Col>
        <Col xl={10}>
          <Container>
            <Link to={`/student_prof/` + this.props.id}>
              <h5 className="mbottom-5">
                {this.props.First_Name + ' ' + this.props.Last_Name}
              </h5>
            </Link>
            <h6 className="mbottom-5">{this.props.coll_name}</h6>
            <Row className="mleft-1 small-font" style={{ paddingBottom: 0 }}>
              <Col xl={6}>
                <Row>
                  <p className="mbottom-5">
                    {this.props.degree}, {this.props.pass_year}
                  </p>
                </Row>
              </Col>
              <Col xl={6}>
                <Row>
                  <p className="mbottom-5">{this.props.major}</p>
                </Row>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    );
  }
}

export default Stud;
