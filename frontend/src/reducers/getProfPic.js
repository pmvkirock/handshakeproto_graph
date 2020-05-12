const getProfPic = (state = '', action) => {
  console.log(action);
  switch (action.type) {
    case 'getProfPic':
      return action.newState;
    default:
      return state;
  }
};

export default getProfPic;
