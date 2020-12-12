import axios from "axios";
import { FETCH_USER, LOGOUT_USER } from "./types";

export const fetchUser = () => {
  return async function (dispatch) {
    const res = await axios.get("/api/current_user");
    dispatch({
      type: FETCH_USER,
      payload: res.data,
    });
  };
};
