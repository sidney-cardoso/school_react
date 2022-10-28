import * as types from "../types";

export const loginRequest = (payload) => {
  return {
    type: types.LOGIN_REQUEST,
    payload,
  };
};

export const loginSuccess = (payload) => {
  return {
    type: types.LOGIN_SUCCESS,
    payload,
  };
};

export const loginFailure = (payload) => {
  return {
    type: types.LOGIN_FAILURE,
    payload,
  };
};
