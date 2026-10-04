export const buildReducer = (reducers, initialState) => (state, action) => {
  return reducers[action.type] ? reducers[action.type](state, action) : initialState;
};
