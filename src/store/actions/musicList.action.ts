import { createAction } from 'typesafe-actions';
import { Action } from 'redux';

export const SET_DATA = 'SET_DATA';
export type SET_DATA = {
  title: string;
  imgSrc: string;
  album: string;
  artist: string;
  id: number;
  url: string;
};
export class SetData implements Action {
  readonly type = SET_DATA;
  constructor(
    public payload: SET_DATA
  ){}
};

export const LOADING = 'LOADING';
export type LOADING = {};
export class Loading implements Action {
  readonly type = LOADING;
};

export const CHECK = 'CHECK';
export type CHECK = {
  code: number;
};
export class Check implements Action {
  readonly type = CHECK;
  constructor(
    public payload: CHECK
  ){}
};

export const RESET_LIST = 'RESET_LIST';
export type RESET_LIST = {};
export class ResetList implements Action {
  readonly type = RESET_LIST;
};

export const CHECK_CODE = 'CHECK_CODE';
export type CHECK_CODE = {};
export class CheckCode implements Action {
  readonly type = CHECK_CODE;
};

export const musicListActions = {
  setData: createAction(SET_DATA, action => (title: string, imgSrc: string, album: string, artist: string, id: number, url: string) => action({ title, imgSrc, album, artist, id, url })),
  loading: createAction(LOADING),
  check: createAction(CHECK, action => (code: number) => action({ code })),
  reset: createAction(RESET_LIST),
  checkCode: createAction(CHECK_CODE),
};

export type MusicListActions =
  | SetData
  | Loading
  | Check
  | ResetList
  | CheckCode;
