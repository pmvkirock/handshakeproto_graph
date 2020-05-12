const filterSchoolName = (state = '', action) => {
  switch (action.type) {
    case 'filterSchoolName':
      return action.newState;
    default:
      return state;
  }
};

export default filterSchoolName;
