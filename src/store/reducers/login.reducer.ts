import { produce } from 'immer';
import { LoginActions } from '../actions';
import { Login } from '../models';

const initialState: Login = {
  userInfo: {
    name: '',
    accessToken: '',
    keyToken: ''
  },
  autoLogin: null
};

const loginReducer = (state: Login = initialState, action: LoginActions) =>
  produce(state, draft => {
    switch(action.type) {
      case 'SET_INFO':
        draft.userInfo.name = action.payload.name;
        draft.userInfo.accessToken = action.payload.accessToken;
        break;

      case 'KEY_TOKEN':
        draft.userInfo.keyToken = action.payload.token;
        break;

      case 'AUTOLOGIN':
        draft.autoLogin = action.payload.bool;
        break;

      case 'RESET_USER':
        draft.userInfo.name = '';
        draft.userInfo.accessToken = '';
        draft.userInfo.keyToken = '';
        break;

      default:
        break;
    }
  });

export { loginReducer };
