import * as types from "./ActionTypes"

//-----------------------------------------------------------------------------
const SetCard = data => ({
  type : types.SetCard,
    data
});

export const _SetCard = (data) => dispatch => {
  dispatch(SetCard(data))
};
//-----------------------------------------------------------------------------

//-----------------------------------------------------------------------------
const ShowUp = data => ({
  type : types.ShowUp,
    data
});

export const _ShowUp = (data) => dispatch => {
  dispatch(ShowUp(data))
};
//-----------------------------------------------------------------------------
