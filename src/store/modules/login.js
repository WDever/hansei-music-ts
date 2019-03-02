import { produce } from 'immer';
import { handleActions, createAction } from 'redux-actions';

const IS_LOGIN = 'login/IS_LOGIN';
const SET_INFO = 'login/SET_INFO'
const KEY_TOKEN = 'login/KEY_TOKEN';
const COUNT = 'login/COUNT';
const COUNT_RESET= 'login/COUNT_RESET';
const IS_LOADED = 'login/IS_LOADED';
const AUTOLOGIN = 'login/AUTOLOGIN';
const RESET = 'login/RESET';

export const isLogin = createAction(IS_LOGIN, bool => bool);
export const setInfo = createAction(SET_INFO, (name, accessToken) => ({ name, accessToken }));
export const keyToken = createAction(KEY_TOKEN, token => token);
export const count = createAction(COUNT);
export const countReset = createAction(COUNT_RESET);
export const isLoaded = createAction(IS_LOADED);
export const autoLogin = createAction(AUTOLOGIN, bool => bool);
export const reset = createAction(RESET);

const initialState = {
  isLogin: false,
  isLoaded: false,
  userInfo: {
    name: '',
    accessToken: '',
    keyToken: '',
  },
  count: 0,
  autoLogin: null,
};

export default handleActions(
  {
    [IS_LOGIN]: (state, action) =>
      produce(state, draft => {
        draft.isLogin = action.payload
      }),
    [SET_INFO]: (state, action) =>
      produce(state, draft => {
        draft.userInfo.name = action.payload.name;
        draft.userInfo.accessToken = action.payload.accessToken;
      }),
    [KEY_TOKEN]: (state, action) =>
      produce(state, draft => {
        draft.userInfo.keyToken = action.payload
      }),
    [COUNT]: (state) =>
      produce(state, draft => {
        draft.count += 1
      }),
    [COUNT_RESET]: (state) =>
      produce(state, draft => {
        draft.count = 0
      }),
    [IS_LOADED]: (state) =>
      produce(state, draft => {
        draft.isLoaded = !state.isLoded
      }),
    [AUTOLOGIN]: (state, action) =>
      produce(state, draft => {
        draft.autoLogin = action.payload
      }),
    [RESET]: (state) =>
      produce(state, draft => {
        draft.userInfo.name = '';
        draft.userInfo.accessToken = '';
      }),
  },
  initialState
);
