import * as types from "../actions/ActionTypes"

const ShowUp = (state = false, action) => {
  switch (action.type) {
    case types.ShowUp:

      state = action.data;
      return state;


    default:
      return state
  }
};
export default ShowUp
