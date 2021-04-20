import * as ActionList from "./ActionsList";
// import API from "../../API/API";
// import jwtdecode from "jwt-decode";
import { toast } from "react-toastify";

const SUCCESS = (msg) => {
  return toast.success(msg, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

const ERROR = (msg) => {
  return toast.error(msg, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export const IS_LOGGED_IN = () => ({
  type: ActionList.IS_LOGGED_IN,
});

export const IS_LOGGED_OUT = () => ({
  type: ActionList.IS_LOGGED_OUT,
});

export const TOKEN = (payload) => ({
  type: ActionList.TOKEN,
  payload,
});

export const USER = (data) => {
  return async (dispatch) => {
    await window.localStorage.setItem("Token", data);
    API.defaults.headers.common["x-auth-token"] = data;
    dispatch(TOKEN(jwtdecode(data)));
    dispatch(IS_LOGGED_IN());
  };
};

export const USER_STATUS_IN = () => {
  return async (dispatch) => {
    const token = await window.localStorage.getItem("Token");
    if (token !== null) {
      dispatch(TOKEN(jwtdecode(token)));
      dispatch(IS_LOGGED_IN());
    }
  };
};

export const USER_STATUS_OUT = () => {
  return async (dispatch) => {
    await window.localStorage.removeItem("Token");
    dispatch(IS_LOGGED_OUT());
  };
};

// export const LOGIN = (data, callback, errorCb) => {
//   return async (dispatch) => {
//     await API.post("/auth/adminLogin", data)
//       .then((res) => {
//         SUCCESS("Your are Logged In!");
//         dispatch(USER(res.data));
//         callback();
//       })
//       .catch((error) => {
//         if (error.response) {
//           ERROR(error.response.data);
//         } else if (error.request) {
//           ERROR(error.request.data);
//         } else {
//           ERROR(error.message);
//         }
//         errorCb();
//       });
//   };
// };
