import {
  LOAD_USER_PROFILE_FAIL,
  LOAD_USER_PROFILE_SUCCESS,
} from "../actions/types";

const initialState = {
  username: "",
  first_name: "",
  last_name: "",
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOAD_USER_PROFILE_SUCCESS:
      return {
        ...state,
        username: payload.username,
      };
    case LOAD_USER_PROFILE_FAIL:
      return {
        ...state,
        username: "",
      };
    default:
      return state;
  }
}
