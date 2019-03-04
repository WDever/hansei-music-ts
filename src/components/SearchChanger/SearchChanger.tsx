import * as React from 'react';
import { TiSocialFacebookCircular } from 'react-icons/ti';
import FacebookLogin from 'react-facebook-login';
import classNames from 'classnames/bind';
import styles from './SearchChanger.scss';

const cx = classNames.bind(styles);

interface SearchChangerProps {
  cat: number;
  changeResults(cat: number): void;
  // userInfo: userInfo;
  logout(): void;
  autoLogin: boolean;
  loginCallback(): void;
}

class SearchChanger extends React.Component<SearchChangerProps> {
  shouldComponentUpdate = (nextProps: SearchChangerProps): boolean => {
    const { cat, autoLogin } = this.props;
    return cat !== nextProps.cat || autoLogin !== nextProps.autoLogin;
  };

  render() {
    const {
      cat,
      changeResults,
      userInfo,
      logout,
      autoLogin,
      loginCallback,
    } = this.props;

    if (autoLogin) {
      return (
        <div className={cx('change-template')}>
          <div className={cx('change-wrapper')}>
            <div
              className={cx('change', { active: cat === 1 })}
              onClick={() => changeResults(1)}
            >
              제목
            </div>
            <div
              className={cx('change', { active: cat === 2 })}
              onClick={() => changeResults(2)}
            >
              가수
            </div>
            <div
              className={cx('change', { active: cat === 3 })}
              onClick={() => changeResults(3)}
            >
              앨범
            </div>
          </div>
          <div className={cx('userInfo')}>
            <span>{userInfo.name} 님</span>
            <span className={cx('logout')} onClick={logout}>
              로그아웃
            </span>
            <FacebookLogin
              appId="254473261900602"
              autoLoad
              fields="name,email,picture"
              callback={loginCallback}
              cssClass="fbnone"
              textButton="FACEBOOK ID로 로그인 하기"
              isMobile
            />
          </div>
        </div>
      );
    }

    if (autoLogin === false) {
      return (
        <div className={cx('change-template')}>
          <div className={cx('change-wrapper')}>
            <div
              className={cx('change', { active: cat === 1 })}
              onClick={() => changeResults(1)}
            >
              제목
            </div>
            <div
              className={cx('change', { active: cat === 2 })}
              onClick={() => changeResults(2)}
            >
              가수
            </div>
            <div
              className={cx('change', { active: cat === 3 })}
              onClick={() => changeResults(3)}
            >
              앨범
            </div>
          </div>
          <FacebookLogin
            appId="254473261900602"
            // autoLoad
            fields="name,email,picture"
            callback={loginCallback}
            cssClass="fb"
            icon={<TiSocialFacebookCircular />}
            textButton="FACEBOOK ID로 로그인 하기"
            isMobile
          />
        </div>
      );
    }

    return <div />;
  }
}

export default SearchChanger;
