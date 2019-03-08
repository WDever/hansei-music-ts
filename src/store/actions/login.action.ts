import { createAction } from 'typesafe-actions';
import { Action } from 'redux';

export const SET_INFO = 'SET_INFO';
export type SET_INFO = {
  name: string | null | undefined;
  accessToken: string;
};
export class SetInfo implements Action {
  readonly type = SET_INFO;
  constructor(
    public payload: SET_INFO
  ){}
};

export const KEY_TOKEN = 'KEY_TOKEN';
export type KEY_TOKEN = {
  token: string;
};
export class KeyToken implements Action {
  readonly type = KEY_TOKEN;
  constructor(
    public payload: KEY_TOKEN
  ){}
};

export const AUTOLOGIN = 'AUTOLOGIN';
export type AUTOLOGIN = {
  bool: boolean;
};
export class AutoLogin implements Action {
  readonly type = AUTOLOGIN;
  constructor(
    public payload: AUTOLOGIN
  ){}
};

export const RESET_USER = 'RESET_USER';
export type RESET_USER = {};
export class ResetUser implements Action {
  readonly type = RESET_USER;
};

export const loginActions = {
  setInfo: createAction(SET_INFO, action => (name: string | null | undefined, accessToken: string) => action({ name, accessToken })),
  keyToken: createAction(KEY_TOKEN, action => (token: string) => action({ token })),
  autoLogin: createAction(AUTOLOGIN, action => (bool: boolean) => action({ bool })),
  reset: createAction(RESET_USER),
};

export type LoginActions =
  | SetInfo
  | KeyToken
  | AutoLogin
  | ResetUser;
