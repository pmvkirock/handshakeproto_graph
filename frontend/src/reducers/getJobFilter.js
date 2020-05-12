const getJobFilter = (state = '', action) => {
  switch (action.type) {
    case 'filterJobUpdate':
      return action.newState;
    default:
      return state;
  }
};

export default getJobFilter;
