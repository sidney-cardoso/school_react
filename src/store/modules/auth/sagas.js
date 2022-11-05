import { call, put, all, takeLatest } from "redux-saga/effects";
import { toast } from "react-toastify";

import * as actions from "./actions";
import * as types from "../types";
import axios from "../../../services/axios";
import history from "../../../services/history";
import { get } from "lodash";

function* loginRequest({ payload }) {
  try {
    const response = yield call(axios.post, "/tokens", payload);
    yield put(actions.loginSuccess({ ...response.data }));

    toast.success("Login realizado com sucesso");

    axios.defaults.headers.Authorization = `Bearer ${response.data.token}`;

    history.push(payload.prevPath);
  } catch (error) {
    toast.error("E-mail ou senha inválidos");

    yield put(actions.loginFailure());
  }
}

const persistRehydrate = ({ payload }) => {
  const token = get(payload, "auth.token", "");
  if (!token) return;
  axios.defaults.headers.Authorization = `Bearer ${token}`;
};
const registerRequest = ({payload}) => {
  const {id, name, email, password} = payload
  console.log("incompleto!");
}

export default all([
  takeLatest(types.LOGIN_REQUEST, loginRequest),
  takeLatest(types.PERSIST_REHYDRATE, persistRehydrate),
  takeLatest(types.REGISTER_REQUEST, registerRequest),
]);
