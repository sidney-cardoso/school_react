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
function* registerRequest ({payload}){
  const {id, name, email, password} = payload

  try {
    if(id) {
      yield call(axios.put, '/users', {
        email,
        name,
        password: password || undefined
      })
      toast.success('Usuário editado com sucesso!')
      yield put(actions.registerUpdatedSuccess({ name, email, password }))
    } else {
      yield call(axios.post, '/users', {
        email,
        name,
        password
      })
      toast.success('Cadastro realizado com sucesso!')
      yield put(actions.registerCreatedSuccess({ name, email, password }))
      history.push('/login')
    }
  } catch (error) {
    const errors = get(error, 'response.data.errors', [])
    const status = get(error, 'response.status', 0)

    if (status == 401) {
      toast.error('Faça login com seus dados atualizados!')
      yield put(actions.loginFailure())
      return history.push('/login')
    }

    if(errors.length > 0) {
      errors.map(err => toast.error(err))
    } else {
      toast.error("Erro desconhecido")
    }

    yield put(actions.registerFailure())
  }
}

export default all([
  takeLatest(types.LOGIN_REQUEST, loginRequest),
  takeLatest(types.PERSIST_REHYDRATE, persistRehydrate),
  takeLatest(types.REGISTER_REQUEST, registerRequest),
]);
