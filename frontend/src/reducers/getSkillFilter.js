const filterSkill = (state = '', action) => {
  switch (action.type) {
    case 'filterSkill':
      return action.newState;
    default:
      return state;
  }
};

export default filterSkill;
