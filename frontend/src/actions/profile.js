import Cookies from "js-cookie";
import axios from "axios";

export const loadUser = () => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const res = await axios.get(`/api/profile/${user}`);
};
