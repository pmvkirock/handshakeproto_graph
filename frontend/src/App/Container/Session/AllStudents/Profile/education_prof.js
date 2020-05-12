import React from 'react';
import { Container } from 'react-bootstrap';
import { getStudentQuery } from '../../../../../queries/quries';
import { graphql, compose } from 'react-apollo';

class Education extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hideForm: 'HideForm',
      editSchoolForm: [],
      error: '',
      data: [],
      coll_name: [],
      degree: [],
      major: [],
      curr_CGPA: [],
      pass_year: [],
      fromMth: [],
      toMth: [],
      fromYr: [],
      toYr: [],
      idstudent_edu: [],
      i: null
    };
  }

  componentDidUpdate(prevProps) {
    console.log(this.props.id);
    if (this.props.data !== prevProps.data) {
      let props = this.props.data.student;
      props.school_info.map(
        ({
          name,
          degree,
          major,
          CGPA,
          yop,
          fromMonth,
          toMonth,
          fromYear,
          toYear,
          _id
        }) => {
          console.log(_id);
          this.setState(prevState => {
            return {
              editSchoolForm: prevState.editSchoolForm.concat('HideForm'),
              coll_name: prevState.coll_name.concat(name),
              degree: prevState.degree.concat(degree),
              major: prevState.major.concat(major),
              curr_CGPA: prevState.curr_CGPA.concat(CGPA),
              pass_year: prevState.pass_year.concat(yop),
              fromMth: prevState.fromMth.concat(fromMonth),
              toMth: prevState.toMth.concat(toMonth),
              fromYr: prevState.fromYr.concat(fromYear),
              toYr: prevState.toYr.concat(toYear),
              idstudent_edu: prevState.idstudent_edu.concat(_id)
            };
          });
        }
      );
      this.setState({
        data: props.school_info,
        i: props.school_info.length
      });
    }
  }

  render() {
    var i = -1,
      renderer;

    renderer = this.state.data.map(() => {
      i++;
      return (
        <div key={this.state.idstudent_edu[i]}>
          <div className="edu-details" style={{ paddingTop: 10 + 'px' }}>
            <h6>{this.state.coll_name[i]}</h6>
            <p>
              {this.state.degree[i]} - <span>{this.state.major[i]}</span>
            </p>
            <p>
              {this.state.fromMth[i]}/{this.state.fromYr[i]}-
              {this.state.toMth[i]}/{this.state.toYr[i]}
            </p>
            <p>Year of passing: {this.state.pass_year[i]}</p>
            <p>Current CGPA: {this.state.curr_CGPA[i]}</p>
          </div>
        </div>
      );
    });

    return (
      <Container className="background top-10 padding-all education">
        <div>
          <h5>Education</h5>
          {renderer}
        </div>
      </Container>
    );
  }
}

export default compose(
  graphql(getStudentQuery, {
    options: props => ({ variables: { _id: props.id } })
  })
)(Education);
