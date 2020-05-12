const getStudFilter = (state = '', action) => {
  switch (action.type) {
    case 'filterStudName':
      return action.newState;
    default:
      return state;
  }
};

export default getStudFilter;
