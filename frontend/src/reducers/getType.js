const getType = (state = 'Student', action) => {
  switch (action.type) {
    case 'CompanyType':
      return 'Company';
    case 'StudentType':
      return 'Student';
    default:
      return state;
  }
};

export default getType;
