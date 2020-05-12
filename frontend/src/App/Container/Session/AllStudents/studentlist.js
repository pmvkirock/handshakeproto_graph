import React from 'react';
import { Container } from 'react-bootstrap';
import Stud from './stud';
import { getAllStudentQuery } from '../../../../queries/quries';
import { graphql, compose } from 'react-apollo';

class studlist extends React.Component {
  state = {
    data: []
  };

  componentDidUpdate(prevProps) {
    console.log('All' + this.props.data.allStudent[0]._id);
    if (this.props.data !== prevProps.data) {
      let props = this.props.data.allStudent;
      this.setState({
        data: props
      });
    }
  }

  render() {
    var profile = this.state.data.map(({ _id, fname, lname, school_info }) => {
      let showJob = 'ShowForm';

      let regexfName = new RegExp(this.props.getStudFilter, 'gi');
      let regexlName = new RegExp(this.props.getStudFilter, 'gi');

      if (fname.match(regexfName) == null && lname.match(regexlName) == null)
        showJob = 'HideForm';

      let regexsName = new RegExp(this.props.getSchoolFilter, 'gi');

      if (school_info[0].name.match(regexsName) == null) showJob = 'HideForm';

      return (
        <Stud
          key={_id}
          id={_id}
          First_Name={fname}
          Last_Name={lname}
          coll_name={school_info[0].name}
          degree={school_info[0].degree}
          major={school_info[0].major}
          pass_year={school_info[0].pass_year}
          showJob={showJob}
        />
      );
    });
    return <Container>{profile}</Container>;
  }
}
export default compose(
  graphql(getAllStudentQuery, {
    options: {
      variables: { name: '' }
    }
  })
)(studlist);
