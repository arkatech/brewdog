import * as types from "../actions/ActionTypes"

const Card = (state = [], action) => {
  switch (action.type) {
    case types.SetCard:
      state = action.data;
      return state;
    default:
      return state
  }
};
export default Card
