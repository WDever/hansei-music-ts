import { combineReducers } from "redux";
import musicList from './musicList';
import search from './search';
import login from './login';

export default combineReducers({
  musicList,
  search,
  login,
});
