import { produce } from 'immer';
import { MusicListActions } from '../actions';
import { MusicList } from '../models';

const initialState: MusicList = {
  list: [],
  loading: true,
  code: 0,
  check: true,
};

const musicListReducer = (state: MusicList = initialState, action: MusicListActions) =>
  produce(state, draft => {
    switch(action.type) {
      case 'SET_DATA':
        draft.list.push({
          id: action.payload.id,
          title: action.payload.title,
          imgSrc: action.payload.imgSrc,
          album: action.payload.album,
          artist: action.payload.artist,
          url: action.payload.url,
        });
        break;
      
      case 'LOADING':
        draft.loading = !state.loading;
        break;

      case 'CHECK':
        draft.code = action.payload.code;
        break;

      case 'RESET_LIST':
        draft.list = [];
        break;

      case 'CHECK_CODE':
        draft.check = !state.check;
        break;
      
      default:
        break;
    }
  });

export { musicListReducer };
