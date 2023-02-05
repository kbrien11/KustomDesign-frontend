import * as apiConstants from "../commons/apiConstants";

import fetch from "isomorphic-fetch";

import { json } from "react-router";
import { async } from "@firebase/util";

export const LOGIN_FORM = "LOGIN_FORM";
export const REGISTER_FAILURE = "REGISTER_FAILURE";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const RESET_REGISTER_FAILURE = "RESET_REGISTER_FAILURE";

export const loginForm = (data) => ({
  type: LOGIN_FORM,
  payload: data,
});

export const registerSuccess = (data) => ({
  type: REGISTER_SUCCESS,
  payload: data,
});
export const registerFailure = (data) => ({
  type: REGISTER_FAILURE,
  payload: data,
});

const resetRegisterFailure = () => ({
  type: RESET_REGISTER_FAILURE,
});

export const loginServices = {
  login: (paramters) => (dispatch) => {
    const { email, password } = paramters;

    const endpoint = apiConstants.LOGIN;

    const data = {
      email: email,
      password: password,
    };
    const configs = {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    return fetch(endpoint, configs)
      .then((response) => {
        if (response.status != 200) throw response;
        return response.json();
      })
      .then((response) => {
        console.log(response);
        if (!response.Error) {
          dispatch(loginForm(response));
          sessionStorage.setItem("loggedInPK", response.id);
        } else {
          dispatch(registerFailure(response.Error));
          console.log("error");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },

  register: (paramaters) => async (dispatch) => {
    console.log(paramaters);
    const {
      email,
      password,
      first_name,
      last_name,
      profile_img,
      user_type,
      username,
    } = paramaters;
    const endpoint = apiConstants.REGISTER;
    const data = {
      email: email,
      password: password,
      user_type: user_type,
      first_name: first_name,
      last_name: last_name,
      username: username,
      profile_image: profile_img,
    };
    console.log(data);
    const configs = {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    const response = await fetch(endpoint, configs);
    const res = await response.json();
    console.log(res);
    if (res) {
      console.log(res);
      dispatch(registerSuccess());
    } else {
      dispatch(registerFailure());
    }
  },

  resetRegisterFailure: () => (dispatch) => {
    dispatch(resetRegisterFailure());
  },
};
