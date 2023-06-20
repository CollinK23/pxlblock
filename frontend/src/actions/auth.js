import axios from "axios";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT_FAIL,
  LOGOUT_SUCCESS,
  AUTHENTICATED_FAIL,
  AUTHENTICATED_SUCCESS,
  FOLLOW_FAIL,
  FOLLOW_SUCCESS,
} from "./types";
import Cookies from "js-cookie";

export const login = (username, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": Cookies.get("csrftoken"),
    },
  };

  const body = JSON.stringify({ username, password });

  try {
    const res = await axios.post(`/api/login`, body, config);

    if (res.data.success) {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          username: res.data.username,
          userImage: res.data.userImage,
        },
      });
    } else {
      dispatch({
        type: LOGIN_FAIL,
      });
    }
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

export const logout = () => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": Cookies.get("csrftoken"),
    },
  };

  const body = JSON.stringify({
    'withCredentials': true, //prettier-ignore
  });

  try {
    const res = await axios.post(`/api/logout`, body, config);

    if (res.data.success) {
      dispatch({
        type: LOGOUT_SUCCESS,
      });
    } else {
      dispatch({
        type: LOGOUT_FAIL,
      });
    }
  } catch (err) {
    dispatch({
      type: LOGOUT_FAIL,
    });
  }
};

export const register =
  (username, email, password, re_password) => async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
    };

    const body = JSON.stringify({ username, email, password, re_password });

    try {
      const res = await axios.post(`/api/register`, body, config);

      if (res.data.error) {
        dispatch({
          type: REGISTER_FAIL,
        });
      } else {
        dispatch({
          type: REGISTER_SUCCESS,
        });
      }
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
      });
    }
  };

export const checkAuth = () => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.get(`/api/authenticated`, config);
    if (res.data.error || res.data.isAuthenticated === "Error") {
      dispatch({
        type: AUTHENTICATED_FAIL,
      });
    } else if (res.data.isAuthenticated === "Success") {
      dispatch({
        type: AUTHENTICATED_SUCCESS,
        payload: {
          username: res.data.username,
          userImage: res.data.userImage,
          userId: res.data.userId,
        },
      });
    } else {
      dispatch({
        type: AUTHENTICATED_FAIL,
      });
    }
  } catch (err) {
    dispatch({
      type: AUTHENTICATED_FAIL,
    });
  }
};

export const handleFollow = (follow, username) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": Cookies.get("csrftoken"),
    },
  };

  const body = JSON.stringify({ action: follow });

  try {
    const res = await axios.post(`/api/${username}/follow`, body, config);
    if (res.data.error) {
      dispatch({
        type: FOLLOW_FAIL,
      });
    } else {
      dispatch({
        type: FOLLOW_SUCCESS,
      });
    }
  } catch (err) {
    dispatch({
      type: FOLLOW_FAIL,
    });
  }
};
