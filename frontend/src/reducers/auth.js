import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT_FAIL,
  LOGOUT_SUCCESS,
  AUTHENTICATED_FAIL,
  AUTHENTICATED_SUCCESS,
  FOLLOW_FAIL,
  FOLLOW_SUCCESS,
  LIKE_SUCCESS,
  LIKE_FAIL,
} from "../actions/types";

const initialState = {
  isAuthenticated: null,
  username: "",
  userImage: "",
  userId: "",
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case FOLLOW_SUCCESS:
      return {
        ...state,
      };
    case LIKE_SUCCESS:
      return {
        ...state,
      };
    case AUTHENTICATED_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        username: payload.username,
        userImage: payload.userImage,
        userId: payload.userId,
      };
    case AUTHENTICATED_FAIL:
      return {
        ...state,
        isAuthenticated: false,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        username: payload,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        username: "",
      };
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case LOGOUT_FAIL:
    case FOLLOW_FAIL:
    case LIKE_FAIL:
      return state;
    default:
      return state;
  }
}
