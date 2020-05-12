import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import Desc from './description';
import Contact from './contact';
import { getCompanyQuery } from '../../../../../queries/quries';
import { graphql, compose } from 'react-apollo';

class Primary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    console.log(this.props.data);
    if (this.props.data.company) {
      let props = this.props.data.company;
      this.setState({
        data: props
      });
    }
  }

  componentDidUpdate(prevProps) {
    console.log(this.props.data);
    if (this.props.data !== prevProps.data) {
      let props = this.props.data.company;
      this.setState({
        data: props
      });
    }
  }

  render() {
    console.log(this.state.data);
    var pic = '/profile.png';
    return (
      <Container key={this.state.data._id}>
        <Row className={'padding-bottom-15 background'}>
          <Col xl={1}>
            <img
              src={pic}
              alt="user pic"
              style={{ width: 70 + 'px', marginTop: 20 + 'px' }}
            />
          </Col>
          <Col xl={11} style={{ width: 100 + '%' }}>
            <Container>
              <Row className="top-10 mleft-10">
                <Container>
                  <h3>{this.state.data.cname}</h3>
                </Container>
              </Row>
              <Row className="mleft-10">
                <Container>
                  <Col xl={7}>
                    <Row>
                      <h6 className="small-grey">{this.state.data.location}</h6>
                    </Row>
                    <Row>
                      <h6 className="small-grey">
                        {this.state.data.noofemp} Employees
                      </h6>
                    </Row>
                  </Col>
                  <Col xl={5}>
                    <Row>
                      <h6 className="small-grey">
                        {this.state.data.company_type}
                      </h6>
                    </Row>
                    <Row>
                      <h6 className="small-grey">
                        {this.state.data.owner_ship}
                      </h6>
                    </Row>
                  </Col>
                </Container>
              </Row>
            </Container>
          </Col>
        </Row>
        <Row className="top-10">
          <Col xl={8} style={{ paddingLeft: 0 + 'px', width: 100 + '%' }}>
            <Desc des={this.state.data.desc} />
          </Col>
          <Col xl={4} style={{ paddingRight: 0 + 'px', width: 100 + '%' }}>
            <Contact
              email={this.state.data.email}
              website={this.state.data.website}
              data={this.state.data}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default compose(
  graphql(getCompanyQuery, {
    options: {
      variables: { _id: localStorage.getItem('_id') }
    }
  })
)(Primary);
