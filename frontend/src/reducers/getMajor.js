const getMajor = (state = '', action) => {
  switch (action.type) {
    case 'getMajor':
      return action.newState;
    default:
      return state;
  }
};

export default getMajor;
