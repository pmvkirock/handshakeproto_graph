import React from 'react';
import { Container } from 'react-bootstrap';
import { getStudentQuery } from '../../../../../queries/quries';
import { graphql, compose } from 'react-apollo';

class Primary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hideForm: 'HideForm',
      hideProfileForm: 'HideForm',
      firstName: '',
      lastName: '',
      dob: '',
      city: '',
      state: '',
      country: '',
      phone_num: '',
      email: '',
      coll_name: '',
      degree: '',
      data: [],
      prof_pic: ''
    };
  }

  componentDidUpdate(prevProps) {
    console.log('Allp' + this.props.id);
    if (this.props.data.student !== prevProps.data.student) {
      let props = this.props.data.student;
      this.setState({
        error: '',
        firstName: props.fname,
        lastName: props.lname,
        dob: props.dob,
        city: props.city,
        state: props.state,
        country: props.country,
        tfirstName: props.fname,
        tlastName: props.lname,
        tdob: props.dob,
        tcity: props.city,
        tstate: props.state,
        tcountry: props.country
      });
    }
  }

  render() {
    let picture = `/profile.png`;

    return (
      <Container className="background padding-all prof-info">
        <img
          src={picture}
          alt="user pic"
          style={{ width: 100 + 'px', borderRadius: 50 + '%' }}
        />
        <h4>{this.state.firstName + ' ' + this.state.lastName}</h4>
        <p>
          {this.state.city +
            ', ' +
            this.state.state +
            ', ' +
            this.state.country}
        </p>
      </Container>
    );
  }
}

export default compose(
  graphql(getStudentQuery, {
    options: props => ({ variables: { _id: props.id } })
  })
)(Primary);
