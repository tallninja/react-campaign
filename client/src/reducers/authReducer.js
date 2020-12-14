import { FETCH_USER, SEND_SURVEY } from "../actions/types";

const authReducer = (state = null, action) => {
  switch (action.type) {
    case FETCH_USER:
      return action.payload || false;
    case SEND_SURVEY:
      return action.payload || false;
    default:
      return state;
  }
};

export default authReducer;
