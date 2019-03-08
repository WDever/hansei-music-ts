/* eslint-disable no-unused-expressions */
/* eslint-disable react/forbid-prop-types */
import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import SearchBar from '../components/SearchBar';
import SearchResults from '../components/SearchResults';
import SearchChanger from '../components/SearchChanger';
import * as api from '../lib/api';
import { SearchResultsItem, userInfo, searchActions, loginActions, musicListActions, AppState } from '../store';
import { Items } from './MusicListContainer';
import { ReactFacebookLoginInfo } from 'react-facebook-login';
import { RouteComponentProps } from 'react-router-dom';

export interface SearchBarProps {
  code: number;
  changer: React.ReactElement;
  availability: boolean
  onFocus(bool: boolean): void;
  onClick(input: string): void;
}

export interface SearchChangerProps {
  cat: number;
  changeResults(index: number): void;
  userInfo: userInfo;
  logout(): void;
  autoLogin: boolean | null;
  loginCallback(response: ReactFacebookLoginInfo): Promise<void>;
  changeFocus(bool: boolean): void;
}

interface SearchItems extends Items {
  song_id: string;
}

export interface SearchResultsProps {
  Tlist: SearchResultsItem[];
  Allist: SearchResultsItem[];
  Arlist: SearchResultsItem[];
  resultsOnClick(title: string, album: string, artist: string, id: number): void;
  loading: boolean;
  focus: boolean;
  flag: boolean;
  noResultsInput: string;
  cat: number;
}

interface SearchBarContainerProps extends SearchBarProps, SearchChangerProps, SearchResultsProps, RouteComponentProps {
  SearchActions: typeof searchActions;
  MusicListActions: typeof musicListActions;
  LoginActions: typeof loginActions;
}

class SearchBarContainer extends React.Component<SearchBarContainerProps> {
  componentDidMount = (): void => {
    const { LoginActions } = this.props;

    const userName = localStorage.getItem('userName');
    const userToken = localStorage.getItem('userToken');

    if (userName === null && userToken === null) {
      LoginActions.autoLogin(false);
    } else {
      LoginActions.setInfo(userName, '');
      LoginActions.autoLogin(true);
    }

    console.log(userName, userToken);
  };

  getCHECK = async (): Promise<void> => {
    const { MusicListActions } = this.props;
    try {
      const response = await api.getCHECK();
      const { code } = response.data;
      const NumberCode: number = Number(code);

      MusicListActions.check(NumberCode);
    } catch (e) {
      console.log(e);
    }
  };

  getALSearch = async (input: string): Promise<void> => {
    const { SearchActions } = this.props;
    try {
      const response = await api.getALSearch(input);

      await response.data.song_list_album.map((item: SearchItems) => {
        const { title, image_src: imgSrc, album, artist, song_id: id } = item;
        // console.log(id);
        const NumberId = Number(id);
        return SearchActions.alSearch(title, imgSrc, album, artist, NumberId);
      });
    } catch (e) {
      console.log(e);
    }
  };

  getTSearch = async (input: string): Promise<void> => {
    const { SearchActions } = this.props;
    try {
      const response = await api.getTSearch(input);

      response.data.song_list_title.map((item: SearchItems) => {
        const { title, image_src: imgSrc, album, artist, song_id: id } = item;
        // console.log(id);
        const NumberId = Number(id);
        return SearchActions.tSearch(title, imgSrc, album, artist, NumberId);
      });

      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };

  getARSearch = async (input: string): Promise<void> => {
    const { SearchActions } = this.props;
    try {
      const response = await api.getARSearch(input);

      response.data.song_list_artist.map((item : SearchItems) => {
        const { title, image_src: imgSrc, album, artist, song_id: id } = item;
        // console.log(id);
        const NumberId = Number(id);
        return SearchActions.arSearch(title, imgSrc, album, artist, NumberId);
      });
    } catch (e) {
      console.log(e);
    }
  };

  postApply = async (title: string, album: string, artist: string, id: number): Promise<void> => {
    try {
      const { userInfo } = this.props;
      const { keyToken } = userInfo;
      console.log(keyToken);
      const response = await api.postAPPLY(title, album, artist, id, keyToken);
      const { message, code } = response.data;
      console.log(id);
      alert(message);
      console.log(response);
    } catch (e) {
      console.log(e);
      alert('로그인 후 다시 시도해주세요.');
    }
  };

  postAccessToken = async (accessToken: string): Promise<void> => {
    const { LoginActions } = this.props;

    try {
      const response = await api.postAccessToken(accessToken);

      const { key } = response.data;

      await LoginActions.keyToken(key);

      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };

  // verify JWT token
  // postVerify = async JWTtoken => {
  //   try {
  //     const response = await api.postVerify(JWTtoken);

  //     const { token } = response.data;

  //     console.log(`verify`);
  //     console.log(response);
  //     console.log(token);

  //     return token;
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  // handleStarter = (hour: ) => {
  //   const { SearchActions } = this.props;
  //   this.starter =
  //     hour >= 12
  //       ? SearchActions.end()
  //       : // : setInterval(() => this.TimeHandler(), 1000);
  //         null;
  // };

  // reIssued = () => {
  //   const { LoginActions, count, userInfo } = this.props;
  //   LoginActions.count();
  //   console.log(count);
  //   if (count === 18000) {
  //     this.postAccessToken(userInfo.accessToken);
  //     LoginActions.countReset();
  //   }
  // };

  // handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
  //   const { value } = e.target;
  //   const { SearchActions } = this.props;

  //   SearchActions.input(value);
  // };

  handleSearch = async (text: string): Promise<void> => {
    const { SearchActions } = this.props;

    // e.preventDefault();

    // console.log(e.target);

    SearchActions.resetResults();

    await this.handleLoading();

    this.handleFocus(true);

    await this.getTSearch(text);

    SearchActions.noResults(text);

    SearchActions.flag(true);

    await this.handleLoading();

    this.getALSearch(text);
    this.getARSearch(text);
  };

  // handleKeyPress = (e: React.KeyboardEvent): void => {
  //   if (e.key === 'Enter') {
  //     this.handleSearch();
  //   }
  // };

  // handleKeyDown = (e: React.KeyboardEvent): void => {
  //   if (e.key === 'Escape') {
  //     this.handleFocus(false);
  //   }
  // };

  changeResults = async (index: number): Promise<void> => {
    const { SearchActions } = this.props;

    // console.log(Tlist);
    // console.log(Allist);
    // console.log(Arlist);
    await this.handleLoading();
    await SearchActions.cat(index);
    await this.handleFocus(true);
    await this.handleLoading();
  };

  handleLoading = (): void => {
    const { SearchActions } = this.props;

    SearchActions.searchLoading();
  };

  handleFocus = (bool: boolean): void => {
    const { SearchActions } = this.props;

    SearchActions.focus(bool);
  };

  loginCallback = async (response: ReactFacebookLoginInfo): Promise<void> => {
    console.log('callback');
    const { LoginActions, history, userInfo } = this.props;

    const res = await response;

    const { accessToken, name } = res;

    console.log(typeof accessToken);

    await LoginActions.setInfo(name, accessToken);

    localStorage.setItem('userName', name);
    localStorage.setItem('userToken', accessToken);

    history.push("/");

    console.log(res);
    this.postAccessToken(accessToken);

    console.log(userInfo);

    // LoginActions.isLoaded();
    userInfo.accessToken !== undefined
      ? LoginActions.autoLogin(true)
      : null;
  };

  logout = (): void => {
    const { LoginActions } = this.props;
    localStorage.clear();
    window.FB.logout();
    LoginActions.autoLogin(false);
    LoginActions.reset();
  };

  render() {
    const {
      availability,
      Tlist,
      Allist,
      Arlist,
      flag,
      cat,
      loading,
      focus,
      userInfo,
      noResultsInput,
      autoLogin,
      code,
    } = this.props;
    const {
      // handleChange,
      handleSearch,
      postApply,
      changeResults,
      // handleKeyPress,
      handleFocus,
      // handleKeyDown,
      loginCallback,
      logout,
    } = this;
    return (
      <>
        <SearchBar
          onClick={handleSearch}
          availability={availability}
          changer={(
            <SearchChanger
              changeResults={changeResults}
              cat={cat}
              changeFocus={handleFocus}
              loginCallback={loginCallback}
              userInfo={userInfo}
              logout={logout}
              autoLogin={autoLogin}
            />
)}
          onFocus={handleFocus}
          code={code}
        />
        <SearchResults
          Tlist={Tlist}
          Allist={Allist}
          Arlist={Arlist}
          cat={cat}
          flag={flag}
          resultsOnClick={postApply}
          loading={loading}
          focus={focus}
          noResultsInput={noResultsInput}
        />
      </>
    );
  }
}

const mapStateToProps = ({ search, musicList, login }: AppState) => ({
  availability: search.availability,
  code: musicList.code,
  flag: search.flag,
  cat: search.cat,
  Tlist: search.Tlist,
  Allist: search.Allist,
  Arlist: search.Arlist,
  loading: search.loading,
  focus: search.focus,
  userInfo: login.userInfo,
  noResultsInput: search.noResultsInput,
  autoLogin: login.autoLogin,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  SearchActions: bindActionCreators(searchActions, dispatch),
  MusicListActions: bindActionCreators(musicListActions, dispatch),
  LoginActions: bindActionCreators(loginActions, dispatch),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(SearchBarContainer),
);
