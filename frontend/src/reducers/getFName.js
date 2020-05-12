const getFName = (state = '', action) => {
  console.log(action);
  switch (action.type) {
    case 'getFName':
      return action.newState;
    default:
      return state;
  }
};

export default getFName;
