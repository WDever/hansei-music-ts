import { produce } from 'immer';
import { handleActions, createAction } from 'redux-actions';

const SET_DATA = 'musicList/SET_DATA';
const LOADING = 'musicList/LOADING';
const CHECK = 'musicList/CHECK';
const RESET = 'musicList/RESET';
const CHECK_CODE = 'musicList/CHECK_CODE';

// eslint-disable-next-line no-plusplus
export const setData = createAction(SET_DATA, (title, imgSrc, album, artist, id, url) => ({ title, imgSrc, album, artist, id, url}));
export const loading = createAction(LOADING);
export const check = createAction(CHECK, code => ({ code }));
export const reset = createAction(RESET);
export const checkCode = createAction(CHECK_CODE);

const iniitalState = {
  list: [],
  loading: true,
  code: 0,
  check: true
};

export default handleActions(
  {
    [SET_DATA]: (state, action) =>
      produce(state, draft => {
        draft.list.push({
          id: action.payload.id,
          title: action.payload.title,
          imgSrc: action.payload.imgSrc,
          album: action.payload.album,
          artist: action.payload.artist,
          url: action.payload.url
        });
      }),
    [LOADING]: (state, action) =>
      produce(state, draft => {
        draft.loading = !state.loading
      }),
    [CHECK]: (state, action) =>
      produce(state, draft => {
        draft.code = action.payload.code
      }),
    [RESET]: (state, action) =>
      produce(state, draft => {
        draft.list = []
      }),
    [CHECK_CODE]: (state, action) =>
      produce(state, draft => {
        draft.check = !state.check
      })
  },
  iniitalState,
);
