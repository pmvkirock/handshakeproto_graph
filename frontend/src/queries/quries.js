import { gql } from 'apollo-boost';

const getStudentQuery = gql`
  query($_id: ID) {
    student(_id: $_id) {
      fname
      lname
      dob
      city
      state
      country
      phone
      obj
      email
      school_info {
        _id
        name
        location
        degree
        major
        yop
        CGPA
        fromMonth
        fromYear
        toMonth
        toYear
      }
      work_exp {
        _id
        name
        title
        location
        work_des
        fromMonth
        fromYear
        toMonth
        toYear
      }
    }
  }
`;

const getCompanyQuery = gql`
  query($_id: ID) {
    company(_id: $_id) {
      cname
      location
      website
      desc
      noofemp
      owner_ship
      company_type
      email
    }
  }
`;

const getAllStudentQuery = gql`
  query($name: String) {
    allStudent(name: $name) {
      _id
      fname
      lname
      school_info {
        _id
        name
        degree
        major
        yop
      }
    }
  }
`;

const getAllJobsQuery = gql`
  query($name: String) {
    allJobs(name: $name) {
      _id
      title
      deadline
      location
      salary
      desc
      paid
      job_cat
      company_name
      email
      comp_id
    }
  }
`;

const getApplied = gql`
  query($idjob: String) {
    applied(idjob: $idjob) {
      idstudent
      fname
      lname
    }
  }
`;

export {
  getStudentQuery,
  getAllStudentQuery,
  getCompanyQuery,
  getAllJobsQuery,
  getApplied
};
