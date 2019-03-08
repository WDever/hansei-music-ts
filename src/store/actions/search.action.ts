import { createAction, action } from 'typesafe-actions';
import { Action } from 'redux';
import { create } from 'domain';

export type SEARCH = {
  title: string;
  imgSrc: string;
  album: string;
  artist: string;
  id: number;
};

export const T_SEARCH = 'T_SEARCH';
export class Tsearch implements Action {
  readonly type = T_SEARCH;
  constructor(public payload: SEARCH){}
};

export const AL_SEARCH = 'AL_SEARCH';
export class Alsearch implements Action {
  readonly type = AL_SEARCH;
  constructor(public payload: SEARCH){}
};

export const AR_SEARCH = 'AR_SEARCH';
export class Arsearch implements Action {
  readonly type = AR_SEARCH;
  constructor(public payload: SEARCH){}
};

export const CAT = 'CAT';
export type CAT = {
  idx: number;
};
export class Cat implements Action {
  readonly type = CAT;
  constructor(public payload: CAT){}
};

export const SEARCH_LOADING = 'SEARCH_LOADING';
export type SEARCH_LOADING = {};
export class SearchLoading implements Action {
  readonly type = SEARCH_LOADING;
  constructor(public payload: SEARCH_LOADING){}
};

export const RESET_RESULTS = 'RESET_RESULTS';
export type RESET_RESULTS = {};
export class ResetResults implements Action {
  readonly type = RESET_RESULTS;
};

export const FOCUS = 'FOCUS';
export type FOCUS = {
  bool: boolean;
};
export class Focus implements Action {
  readonly type = FOCUS;
  constructor(public payload: FOCUS){}
};

export const FLAG = 'FLAG';
export type FLAG = {
  bool: boolean;
};
export class Flag implements Action {
  readonly type = FLAG;
  constructor(public payload: FLAG){}
};

export const NO_RESULTS = 'NO_RESULTS';
export type NO_RESULTS = {
  text: string;
};
export class NoResults implements Action {
  readonly type = NO_RESULTS;
  constructor(public payload: NO_RESULTS){}
};

export const  AVAILABILITY = 'AVAILABILITY';
export type AVAILABILITY = {};
export class Availability implements Action {
  readonly type = AVAILABILITY;
};

export const searchActions = {
  tSearch: createAction(T_SEARCH, action => (title: string, imgSrc: string, album: string, artist: string, id: number) => action({ title, imgSrc, album, artist, id})),
  alSearch: createAction(AL_SEARCH, action => (title: string, imgSrc: string, album: string, artist: string, id: number) => action({ title, imgSrc, album, artist, id})),
  arSearch: createAction(AR_SEARCH, action => (title: string, imgSrc: string, album: string, artist: string, id: number) => action({ title, imgSrc, album, artist, id})),
  cat: createAction(CAT, action => (idx: number) => action({ idx })),
  searchLoading: createAction(SEARCH_LOADING),
  resetResults: createAction(RESET_RESULTS),
  focus: createAction(FOCUS, action => (bool: boolean) => action({ bool })),
  flag: createAction(FLAG, action => (bool: boolean) => action({ bool })),
  noResults: createAction(NO_RESULTS, action => (text: string) => action({ text })),
  availability: createAction(AVAILABILITY),
};

export type SearchActions =
  | Tsearch
  | Alsearch
  | Arsearch
  | Cat
  | SearchLoading
  | ResetResults
  | Focus
  | Flag
  | NoResults
  | Availability;
