import { produce } from "immer";
import { handleActions, createAction } from "redux-actions";

const INPUT = 'search/INPUT';
const SET_TIME = 'search/SET_TIME';
const START = 'search/START';
const END = 'search/END';
const T_SEARCH = 'search/T_SEARCH';
const AL_SEARCH = 'search/AL_SEARCH';
const AR_SEARCH = 'search/AR_SEARCH';
const CAT = 'search/CAT';
const SEARCH_LOADING = 'search/SEARCH_LOADING';
const RESET = 'search/RESET';
const FOCUS = 'search/FOCUS';
const FLAG = 'search/FLAG';
const NO_RESULTS = 'search/NO_RESULTS';

export const input = createAction(INPUT, text => text);
export const setTime = createAction(SET_TIME, (hour, min, sec) => ({ hour, min, sec}));
export const start = createAction(START);
export const end = createAction(END);
// eslint-disable-next-line no-plusplus
export const Tsearch = createAction(T_SEARCH, (title, imgSrc, album, artist, id) => ({title, imgSrc, album, artist, id}));
// eslint-disable-next-line no-plusplus
export const Alsearch = createAction(AL_SEARCH, (title, imgSrc, album, artist, id) => ({title, imgSrc, album, artist, id}));
// eslint-disable-next-line no-plusplus
export const Arsearch = createAction(AR_SEARCH, (title, imgSrc, album, artist, id) => ({title, imgSrc, album, artist, id}));
export const cat = createAction(CAT, index => index);
export const searchLoading = createAction(SEARCH_LOADING);
export const reset = createAction(RESET);
export const focus = createAction(FOCUS, bool => bool);
export const flag = createAction(FLAG, bool => bool);
export const noResultsInput = createAction(NO_RESULTS, text => text);

const initialState = {
  input: '', // search input
  noResultsInput: '',
  canReservation: true, // 
  cat: 1, // search category
  Tlist: [], // title search list
  Allist: [], // album search list
  Arlist: [], // artist search list
  loading: false, // search loading
  focus: false, // isFocus
  flag: false, // reun search
};

export default handleActions(
  {
    [INPUT]: (state, action) =>
      produce(state, draft => {
        draft.input = action.payload
      }),
    [START]: (state, action) =>
      produce(state, draft => {
        draft.canReservation = !state.canReservation;
      }),
    [T_SEARCH]: (state, action) =>
      produce(state, draft =>{
        draft.Tlist.push({
          id: action.payload.id,
          title: action.payload.title,
          imgSrc: action.payload.imgSrc,
          album: action.payload.album,
          artist: action.payload.artist
        });
      }),
    [AL_SEARCH]: (state, action) =>
      produce(state, draft => {
        draft.Allist.push({
          id: action.payload.id,
          title: action.payload.title,
          imgSrc: action.payload.imgSrc,
          album: action.payload.album,
          artist: action.payload.artist
        });
      }),
    [AR_SEARCH]: (state, action) =>
      produce(state, draft => {
        draft.Arlist.push({
          id: action.payload.id,
          title: action.payload.title,
          imgSrc: action.payload.imgSrc,
          album: action.payload.album,
          artist: action.payload.artist
        });
      }),
    [CAT]: (state, action) =>
      produce(state, draft => {
        draft.cat = action.payload
      }),
    [SEARCH_LOADING]: (state, action) =>
      produce(state, draft => {
        draft.loading = !state.loading
      }),
    [RESET]: (state, action) =>
      produce(state, draft => {
        draft.Tlist = [];
        draft.Allist = [];
        draft.Arlist = [];
      }),
    [FOCUS]: (state, action) =>
      produce(state, draft => {
        draft.focus = action.payload
      }),
    [FLAG]: (state, action) =>
      produce(state, draft => {
        draft.flag = action.payload
      }),
    [NO_RESULTS]: (state, action) =>
      produce(state, draft => {
        draft.noResultsInput = action.payload
      }),
  },
  initialState
);
