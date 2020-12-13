import axios from "axios";
import { FETCH_USER, FETCH_SURVEYS } from "./types";

export const fetchUser = () => {
  return async function (dispatch) {
    const res = await axios.get("/auth/current_user");
    dispatch({
      type: FETCH_USER,
      payload: res.data,
    });
  };
};

export const handleToken = (token) => async (dispatch) => {
  const res = await axios.post("/billing/stripe", token);
  dispatch({
    type: FETCH_USER,
    payload: res.data,
  });
};

export const fetchSurveys = () => async (dispatch) => {
  const res = await axios.get("/api/surveys");
  dispatch({
    type: FETCH_SURVEYS,
    payload: res.data,
  });
};
