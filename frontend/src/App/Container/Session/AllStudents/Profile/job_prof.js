import React from 'react';
import { Container } from 'react-bootstrap';
import { getStudentQuery } from '../../../../../queries/quries';
import { graphql, compose } from 'react-apollo';

class Education extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hideForm: 'HideForm',
      editJobForm: [],
      error: '',
      data: [],
      company_name: [],
      title: [],
      location: [],
      fromMth: [],
      toMth: [],
      fromYr: [],
      toYr: [],
      idstudent_exp: [],
      desc: [],
      i: null
    };
  }

  addSchool = () => {
    if (this.state.hideForm == 'ShowForm') {
      this.setState({
        hideForm: 'HideForm'
      });
    } else {
      this.setState({
        hideForm: 'ShowForm'
      });
    }
  };

  componentDidUpdate(prevProps) {
    //console.log(this.props.data);
    if (this.props.data !== prevProps.data) {
      let props = this.props.data.student;
      props.work_exp.map(
        ({
          name,
          title,
          location,
          fromMonth,
          toMonth,
          fromYear,
          toYear,
          _id,
          work_des
        }) => {
          this.setState(prevState => {
            return {
              editJobForm: prevState.editJobForm.concat('HideForm'),
              company_name: prevState.company_name.concat(name),
              title: prevState.title.concat(title),
              location: prevState.location.concat(location),
              fromMth: prevState.fromMth.concat(fromMonth),
              toMth: prevState.toMth.concat(toMonth),
              fromYr: prevState.fromYr.concat(fromYear),
              toYr: prevState.toYr.concat(toYear),
              idstudent_exp: prevState.idstudent_exp.concat(_id),
              desc: prevState.desc.concat(work_des)
            };
          });
        }
      );
      this.setState({
        data: props.work_exp,
        i: props.school_info.length
      });
    }
  }

  render() {
    var i = -1;
    var renderDet = this.state.data.map(() => {
      i++;
      return (
        <div key={this.state.idstudent_exp[i]}>
          <div className="edu-details" style={{ paddingTop: 10 + 'px' }}>
            <h6>{this.state.company_name[i]}</h6>
            <p>{this.state.title[i]}</p>
            <p>{this.state.location[i]}</p>
            <p>
              {this.state.fromMth[i]}/{this.state.fromYr[i]}-
              {this.state.toMth[i]}/{this.state.toYr[i]}
            </p>
            <p>{this.state.desc[i]}</p>
          </div>
        </div>
      );
    });

    return (
      <Container className="background top-10 padding-all education">
        <div className="edu-details">
          <h5>Job Details</h5>
          {renderDet}
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
