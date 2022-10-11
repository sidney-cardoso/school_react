import * as types from "../types";
const initialState = {
  clickedButton: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.CLICKED_BUTTON_SUCCESS: {
      console.log("Sucesso");
      const newState = { ...state };
      newState.clickedButton = !newState.clickedButton;
      return newState;
    }

    case types.CLICKED_BUTTON_REQUEST: {
      console.log("Requisição sendo feita");
      return state;
    }

    case types.CLICKED_BUTTON_FAILURE: {
      console.log("Erro");
      return state;
    }

    default:
      return state;
  }
};
