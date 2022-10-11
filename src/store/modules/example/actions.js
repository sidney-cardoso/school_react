import * as types from "../types";

export const requestClickedButton = () => {
  return {
    type: types.CLICKED_BUTTON_REQUEST,
  };
};

export const successClickedButton = () => {
  return {
    type: types.CLICKED_BUTTON_SUCCESS,
  };
};

export const failureClickedButton = () => {
  return {
    type: types.CLICKED_BUTTON_FAILURE,
  };
};
