import { FETCH_SURVEYS } from "../actions/types";

const surveyReducer = (state = null, action) => {
  switch (action.type) {
    case FETCH_SURVEYS:
      return action.payload || false;
    default:
      return state;
  }
};

export default surveyReducer;
