const filterMajor = (state = '', action) => {
  switch (action.type) {
    case 'filterMajor':
      return action.newState;
    default:
      return state;
  }
};

export default filterMajor;
