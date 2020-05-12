import { gql } from 'apollo-boost';

const addStudentMutation = gql`
  mutation AddStudent(
    $fname: String
    $lname: String
    $sname: String
    $email: String
    $password: String
  ) {
    addStudent(
      fname: $fname
      lname: $lname
      sname: $sname
      email: $email
      password: $password
    ) {
      message
      status
    }
  }
`;

const loginMutation = gql`
  mutation login($email: String, $password: String) {
    login(email: $email, password: $password) {
      message
      status
    }
  }
`;

const updateEduMutation = gql`
  mutation updateEduMutation(
    $name: String
    $degree: String
    $major: String
    $CGPA: String
    $yop: String
    $fromMonth: String
    $toMonth: String
    $fromYear: String
    $toYear: String
    $_id: String
    $user_id: String
  ) {
    updateEduMutation(
      name: $name
      degree: $degree
      major: $major
      CGPA: $CGPA
      yop: $yop
      fromMonth: $fromMonth
      toMonth: $toMonth
      fromYear: $fromYear
      toYear: $toYear
      _id: $_id
      user_id: $user_id
    ) {
      message
      status
    }
  }
`;

const updateExpMutation = gql`
  mutation updateExpMutation(
    $user_id: String
    $_id: String
    $name: String
    $title: String
    $location: String
    $work_des: String
    $fromMonth: String
    $fromYear: String
    $toMonth: String
    $toYear: String
  ) {
    updateExpMutation(
      user_id: $user_id
      _id: $_id
      name: $name
      title: $title
      location: $location
      work_des: $work_des
      fromMonth: $fromMonth
      fromYear: $fromYear
      toMonth: $toMonth
      toYear: $toYear
    ) {
      message
      status
    }
  }
`;

const updateContact = gql`
  mutation updateContact(
    $user_id: String
    $phone: String
    $email: String
    $obj: String
  ) {
    updateContact(user_id: $user_id, phone: $phone, email: $email, obj: $obj) {
      message
      status
    }
  }
`;

const updateProfile = gql`
  mutation updateProfile(
    $user_id: String
    $fname: String
    $lname: String
    $dob: String
    $city: String
    $state: String
    $country: String
  ) {
    updateProfile(
      user_id: $user_id
      fname: $fname
      lname: $lname
      dob: $dob
      city: $city
      state: $state
      country: $country
    ) {
      message
      status
    }
  }
`;

const addCompanyMutation = gql`
  mutation addCompany(
    $cname: String
    $location: String
    $email: String
    $password: String
  ) {
    addCompany(
      cname: $cname
      location: $location
      email: $email
      password: $password
    ) {
      message
      status
    }
  }
`;

const compLoginMutation = gql`
  mutation compLogin($email: String, $password: String) {
    compLogin(email: $email, password: $password) {
      message
      status
    }
  }
`;

const updateCompanyProfile = gql`
  mutation updateCompanyProfile(
    $_id: String
    $cname: String
    $location: String
    $email: String
    $password: String
    $website: String
    $desc: String
    $noofemp: String
    $owner_ship: String
    $company_type: String
  ) {
    updateCompanyProfile(
      _id: $_id
      cname: $cname
      location: $location
      email: $email
      password: $password
      website: $website
      desc: $desc
      noofemp: $noofemp
      owner_ship: $owner_ship
      company_type: $company_type
    ) {
      message
      status
    }
  }
`;

const addJobs = gql`
  mutation addJob(
    $title: String
    $deadline: String
    $location: String
    $salary: String
    $desc: String
    $paid: String
    $job_cat: String
    $comp_id: String
  ) {
    addJob(
      title: $title
      deadline: $deadline
      location: $location
      salary: $salary
      desc: $desc
      paid: $paid
      job_cat: $job_cat
      comp_id: $comp_id
    ) {
      message
      status
    }
  }
`;

const apply = gql`
  mutation apply($idcompany: String, $idstudent: String, $idjob: String) {
    apply(idcompany: $idcompany, idstudent: $idstudent, idjob: $idjob) {
      message
      status
    }
  }
`;

export {
  addStudentMutation,
  loginMutation,
  updateEduMutation,
  updateExpMutation,
  updateContact,
  updateProfile,
  addCompanyMutation,
  compLoginMutation,
  updateCompanyProfile,
  addJobs,
  apply
};
