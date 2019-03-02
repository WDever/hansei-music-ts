/* eslint-disable no-unused-expressions */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SearchBar from '../components/SearchBar';
import SearchResults from '../components/SearchResults';
import SearchChanger from '../components/SearchChanger';
import * as api from '../lib/api';
import * as searchActions from '../store/modules/search';
import * as musicListActions from '../store/modules/musicList';
import * as loginActions from '../store/modules/login';

class SearchBarContainer extends React.Component {
  componentDidMount = () => {
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

  getCHECK = async () => {
    const { MusicListActions } = this.props;
    try {
      const response = await api.getCHECK();
      const { code } = response.data;

      MusicListActions.check(code);
    } catch (e) {
      console.log(e);
    }
  };

  getALSearch = async input => {
    const { SearchActions } = this.props;
    try {
      const response = await api.getALSearch(input);

      await response.data.song_list_album.map(item => {
        const { title, image_src: imgSrc, album, artist, song_id: id } = item;
        // console.log(id);
        return SearchActions.Alsearch(title, imgSrc, album, artist, id);
      });
    } catch (e) {
      console.log(e);
    }
  };

  getTSearch = async input => {
    const { SearchActions } = this.props;
    try {
      const response = await api.getTSearch(input);

      response.data.song_list_title.map(item => {
        const { title, image_src: imgSrc, album, artist, song_id: id } = item;
        // console.log(id);
        return SearchActions.Tsearch(title, imgSrc, album, artist, id);
      });

      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };

  getARSearch = async input => {
    const { SearchActions } = this.props;
    try {
      const response = await api.getARSearch(input);

      response.data.song_list_artist.map(item => {
        const { title, image_src: imgSrc, album, artist, song_id: id } = item;
        // console.log(id);
        return SearchActions.Arsearch(title, imgSrc, album, artist, id);
      });
    } catch (e) {
      console.log(e);
    }
  };

  postApply = async (title, album, artist, id) => {
    try {
      const { userInfo } = this.props;
      const { keyToken } = userInfo;
      console.log(keyToken);
      const response = await api.postAPPLY(title, album, artist, id, keyToken);
      const { message, code } = response.data;
      console.log(id);
      alert(message, code);
      console.log(response);
    } catch (e) {
      console.log(e);
      alert('로그인 후 다시 시도해주세요.');
    }
  };

  postAccessToken = async accessToken => {
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

  handleStarter = hour => {
    const { SearchActions } = this.props;
    this.starter =
      hour >= 12
        ? SearchActions.end()
        : // : setInterval(() => this.TimeHandler(), 1000);
          null;
  };

  // reIssued = () => {
  //   const { LoginActions, count, userInfo } = this.props;
  //   LoginActions.count();
  //   console.log(count);
  //   if (count === 18000) {
  //     this.postAccessToken(userInfo.accessToken);
  //     LoginActions.countReset();
  //   }
  // };

  handleChange = e => {
    const { value } = e.target;
    const { SearchActions } = this.props;

    SearchActions.input(value);
  };

  handleSearch = async text => {
    const { SearchActions } = this.props;

    // e.preventDefault();

    // console.log(e.target);

    SearchActions.reset();

    await this.handleLoading();

    this.handleFocus(true);

    await this.getTSearch(text);

    SearchActions.noResultsInput(text);

    SearchActions.flag(true);

    await this.handleLoading();

    this.getALSearch(text);
    this.getARSearch(text);
  };

  handleKeyPress = e => {
    if (e.key === 'Enter') {
      this.handleSearch();
    }
  };

  handleKeyDown = e => {
    if (e.key === 'Escape') {
      this.handleFocus(false);
    }
  };

  changeResults = async index => {
    const { SearchActions } = this.props;

    // console.log(Tlist);
    // console.log(Allist);
    // console.log(Arlist);
    await this.handleLoading();
    await SearchActions.cat(index);
    await this.handleFocus(true);
    await this.handleLoading();
  };

  handleLoading = () => {
    const { SearchActions } = this.props;

    SearchActions.searchLoading();
  };

  handleFocus = bool => {
    const { SearchActions } = this.props;

    SearchActions.focus(bool);
  };

  timeOutFocus = bool => {
    setTimeout(() => this.handleFocus(bool), 310);
  };

  loginCallback = async response => {
    console.log('callback');
    const { LoginActions, history } = this.props;

    const res = await response;

    const { accessToken, name } = res;

    console.log(typeof accessToken);

    await LoginActions.setInfo(name, accessToken);

    localStorage.setItem('userName', name);
    localStorage.setItem('userToken', accessToken);

    history.push("/");

    console.log(res);
    this.postAccessToken(accessToken);

    const { userInfo } = this.props;
    console.log(userInfo);

    // LoginActions.isLoaded();
    return userInfo.accessToken !== undefined
      ? LoginActions.autoLogin(true)
      : null;
  };

  logout = () => {
    const { LoginActions } = this.props;
    localStorage.clear();
    window.FB.logout();
    LoginActions.autoLogin(false);
    LoginActions.reset();
  };

  render() {
    const {
      input,
      placeholder,
      canReservation,
      Tlist,
      Allist,
      Arlist,
      flag,
      cat,
      loading,
      focus,
      isLogin,
      userInfo,
      noResultsInput,
      isLoaded,
      autoLogin,
      code,
    } = this.props;
    const {
      handleChange,
      handleSearch,
      postApply,
      changeResults,
      handleKeyPress,
      handleFocus,
      handleKeyDown,
      timeOutFocus,
      loginCallback,
      logout,
    } = this;
    return (
      <>
        <SearchBar
          value={input}
          onChange={handleChange}
          onClick={handleSearch}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          canReservation={canReservation}
          changer={(
            <SearchChanger
              changeResults={changeResults}
              cat={cat}
              changeFocus={handleFocus}
              loginCallback={loginCallback}
              isLogin={isLogin}
              userInfo={userInfo}
              logout={logout}
              isLoaded={isLoaded}
              autoLogin={autoLogin}
            />
)}
          onFocus={handleFocus}
          handleKeyDown={handleKeyDown}
          timeOutFocus={timeOutFocus}
          code={code}
        />
        <SearchResults
          Tlist={Tlist}
          Allist={Allist}
          Arlist={Arlist}
          cat={cat}
          flag={flag}
          onClick={postApply}
          loading={loading}
          focus={focus}
          noResultsInput={noResultsInput}
        />
      </>
    );
  }
}

const mapStateToProps = ({ search, musicList, login }) => ({
  input: search.input,
  hour: search.hour,
  min: search.min,
  sec: search.sec,
  placeholder: search.placeholder,
  canReservation: search.canReservation,
  code: musicList.code,
  list: search.list,
  flag: search.flag,
  cat: search.cat,
  Tlist: search.Tlist,
  Allist: search.Allist,
  Arlist: search.Arlist,
  loading: search.loading,
  focus: search.focus,
  isLogin: login.isLogin,
  userInfo: login.userInfo,
  count: login.count,
  noResultsInput: search.noResultsInput,
  isLoaded: login.isLoaded,
  autoLogin: login.autoLogin,
});

const mapDispatchToProps = dispatch => ({
  SearchActions: bindActionCreators(searchActions, dispatch),
  MusicListActions: bindActionCreators(musicListActions, dispatch),
  LoginActions: bindActionCreators(loginActions, dispatch),
});

SearchBarContainer.propTypes = {
  canReservation: PropTypes.bool,
  // hour: PropTypes.number,
  // min: PropTypes.number,
  // sec: PropTypes.number,
  input: PropTypes.string,
  placeholder: PropTypes.string,
  Tlist: PropTypes.array,
  Allist: PropTypes.array,
  Arlist: PropTypes.array,
};

SearchBarContainer.defaultProps = {
  canReservation: true,
  input: '',
  placeholder: '',
  Tlist: [],
  Allist: [],
  Arlist: [],
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(SearchBarContainer),
);
