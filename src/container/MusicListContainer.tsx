import * as React from 'react';
import moment from 'moment';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as musicListActions from '../store/modules/musicList';
import * as searchActions from '../store/modules/search';
import * as loginActions from '../store/modules/login';
import MusicList from '../components/MusicList';
import * as api from '../lib/api';

interface MusicListContainerProps {
  // list: list
  loading: boolean;
  flag: boolean;
  check: boolean;
  code: number;
  // MusicListActions: typeof musicListActions
  // SearchActions: typeof searchActions
  // LoginActions: typeof loginActions
}

class MusicListContainer extends React.Component<MusicListContainerProps> {
  componentDidMount = async (): Promise<void> => {
    await this.getCHECK();

    const hour: number = Number(moment().format('H'));

    const { code } = this.props;

    code === 423 || hour >= 12 ? this.getPLAYLIST(true) : this.getTOP();
    // this.getTOP();
  };

  handleClick = async (title: string, album: string, artist: string, id: number): Promise<void> => {
    await this.postAPPLY(title, album, artist, id);
    await this.getCHECK();
    const { code } = this.props;
    console.log(code)
    code === 423 ? this.getPLAYLIST(false) : null;
  }

  getTOP = async (): Promise<void> => {
    const { MusicListActions } = this.props;

    try {
      const response = await api.getTOP();

      response.data.map(item => {
        const { title, image_src: imgSrc, album, artist, song_id: id } = item;
        console.log(id);
        return MusicListActions.setData(title, imgSrc, album, artist, id);
      });

      console.log(response.data);

      MusicListActions.loading();
    } catch (e) {
      console.log(e);
    }
  };

  postAPPLY = async (title: string, album: string, artist: string, id: number) => {
    try {
      const { userInfo } = this.props;
      const { keyToken } = userInfo;
      const response = await api.postAPPLY(title, album, artist, id, keyToken);
      const { message } = response.data;
      console.log(id);
      alert(message);
      console.log(response);
    } catch (e) {
      console.log(e);
      alert('로그인 후 다시 시도해주세요.')
    }
  }

 getCHECK = async () => {
    const { MusicListActions } = this.props;
    try {
      const response = await api.getCHECK();
      const { code } = response.data;

      MusicListActions.check(code);
    } catch (e) {
      console.log(e);
    }
  }

  getPLAYLIST = async (bool: boolean) => {
    const { MusicListActions, check } = this.props;

    try {
      const response = await api.getPLAYLIST();

      // console.log(response);

      const titleCheck = check ? MusicListActions.checkCode() : null;

      const afterCheck = bool ? null : MusicListActions.reset();

      let id = 0;

      // eslint-disable-next-line array-callback-return
      response.data.results.map(item => {
        const { title, image_src: imgSrc, album, artist, music_info_url: url } = item;
        
        console.log(id);
        // eslint-disable-next-line no-plusplus
        return MusicListActions.setData(title, imgSrc, album, artist, id++, url);
      });
      
      bool ? MusicListActions.loading() : null;
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    const { list, loading, check, flag } = this.props;
    const { handleClick } = this;
    return <MusicList list={list} loading={loading} onClick={handleClick} check={check} flag={flag} />;
  }
}

const mapStateToProps = ({ musicList, search, login }) => ({
  list: musicList.list,
  loading: musicList.loading,
  code: musicList.code,
  check: musicList.check,
  flag: search.flag,
  userInfo: login.userInfo,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  MusicListActions: bindActionCreators(musicListActions, dispatch),
  SearchActions: bindActionCreators(searchActions, dispatch),
  LoginActions: bindActionCreators(loginActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MusicListContainer);
