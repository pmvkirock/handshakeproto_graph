export const CompanyType = () => {
  return {
    type: 'CompanyType'
  };
};

export const StudentType = () => {
  return {
    type: 'StudentType'
  };
};

export const PartTime = () => {
  return {
    type: 'PartTime'
  };
};

export const FullTime = () => {
  return {
    type: 'FullTime'
  };
};

export const Internship = () => {
  return {
    type: 'Internship'
  };
};

export const OnCampus = () => {
  return {
    type: 'OnCampus'
  };
};

export const Logout = () => {
  return {
    type: 'Logout'
  };
};

export const pending = () => {
  return {
    type: 'Pending'
  };
};

export const reviewed = () => {
  return {
    type: 'Reviewed'
  };
};

export const declined = () => {
  return {
    type: 'Declined'
  };
};

export const updateJobFilter = x => {
  return {
    type: 'filterJobUpdate',
    newState: x
  };
};

export const updateEventsFilter = x => {
  return {
    type: 'filterEventsUpdate',
    newState: x
  };
};

export const updateCityFilter = x => {
  return {
    type: 'filterCityUpdate',
    newState: x
  };
};

export const updateStudName = x => {
  return {
    type: 'filterStudName',
    newState: x
  };
};

export const updateSchoolName = x => {
  return {
    type: 'filterSchoolName',
    newState: x
  };
};

export const updateMajor = x => {
  return {
    type: 'filterMajor',
    newState: x
  };
};

export const updateSkill = x => {
  return {
    type: 'filterSkill',
    newState: x
  };
};

export const getMyJobs = () => {
  return {
    type: 'filterMyJobs'
  };
};

export const getAppliedEvents = () => {
  return {
    type: 'filterAppliedEvents'
  };
};

export const getMyEvents = () => {
  return {
    type: 'filterMyEvents'
  };
};

export const getProfPic = x => {
  return {
    type: 'getProfPic',
    newState: x
  };
};

export const getMajor = x => {
  return {
    type: 'getMajor',
    newState: x
  };
};

export const getFName = x => {
  return {
    type: 'getFName',
    newState: x
  };
};
