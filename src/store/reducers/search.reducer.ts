import { produce } from 'immer';
import { SearchActions } from '../actions';
import { Search } from '../models';

const initiaState: Search = {
  Tlist: [],
  Allist: [],
  Arlist: [],
  cat: 1,
  loading: false,
  focus: false,
  flag: false,
  noResultsInput: '',
  availability: true,
};

const searchReducer = (state: Search = initiaState, action: SearchActions) =>
  produce(state, draft => {
    switch (action.type) {
      case 'T_SEARCH':
        draft.Tlist.push({
          id: action.payload.id,
          title: action.payload.title,
          imgSrc: action.payload.imgSrc,
          album: action.payload.album,
          artist: action.payload.artist,
        });
        break;

      case 'AL_SEARCH':
        draft.Allist.push({
          id: action.payload.id,
          title: action.payload.title,
          imgSrc: action.payload.imgSrc,
          album: action.payload.album,
          artist: action.payload.artist,
        });
        break;

      case 'AR_SEARCH':
        draft.Arlist.push({
          id: action.payload.id,
          title: action.payload.title,
          imgSrc: action.payload.imgSrc,
          album: action.payload.album,
          artist: action.payload.artist,
        });
        break;

      case 'CAT':
        draft.cat = action.payload.idx;
        break;

      case 'SEARCH_LOADING':
        draft.loading = !state.loading;
        break;

      case 'RESET_RESULTS':
        draft.Tlist = [];
        draft.Allist = [];
        draft.Arlist = [];
        break;
      
      case 'FOCUS':
        draft.focus = action.payload.bool;
        break;

      case 'FLAG':
        draft.flag = action.payload.bool;
        break;

      case 'NO_RESULTS':
        draft.noResultsInput = action.payload.text;
        break;
      
      default:
        break;
    }
  });

export { searchReducer };
