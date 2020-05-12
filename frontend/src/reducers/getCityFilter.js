const getCityFilter = (state = '', action) => {
  switch (action.type) {
    case 'filterCityUpdate':
      return action.newState;
    default:
      return state;
  }
};

export default getCityFilter;
