const getEventsFilter = (state = '', action) => {
  switch (action.type) {
    case 'filterEventsUpdate':
      return action.newState;
    default:
      return state;
  }
};

export default getEventsFilter;
