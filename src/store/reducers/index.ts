import { combineReducers } from 'redux';
import { loginReducer } from './login.reducer';
import { musicListReducer } from './musicList.reducer';
import { searchReducer } from './search.reducer';

const reducer = combineReducers({
  login: loginReducer,
  musicList: musicListReducer,
  search: searchReducer,
});

export { reducer };
