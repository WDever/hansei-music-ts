import { Login, userInfo } from './login.model';
import { MusicList, MusicListItem } from './musicList.model';
import { Search, SearchResultsItem } from './search.model';

interface AppState {
  login: Login;
  musicList: MusicList;
  search: Search
};

export { AppState, Login, userInfo, MusicList, MusicListItem, Search, SearchResultsItem };
