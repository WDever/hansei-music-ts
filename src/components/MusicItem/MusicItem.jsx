import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './MusicItem.scss';

const cx = classNames.bind(styles);

const MusicItem = ({ title, src, onClick }) => (
  <div
    className={cx('item')}
    onClick={onClick}
  >
    <img src={src} alt="success" />
    <div className={cx('title')}>{title}</div>
    <div className={cx('reservation')}>신청하기</div>
  </div>
);

export const PlaylistItem = ({ title, src, detail }) => (
  <a
    className={cx('item')}
    href={detail}
    target="_blank"
    rel="noopener noreferrer" 
  >
    <img src={src} alt="success" />
    <div className={cx('title')}>{title}</div>
    <div className={cx('reservation')}>정보보기</div>
  </a>
);

export const SearchItem = ({ title, src, artist, onClick }) => (
  <div className={cx('search-item')}>
    <div className={cx('search-data')}>
      <img className={cx('search-img')} src={src} alt="album art" />
      <div className={cx('search-info')}>
        <div className={cx('search-title')}>{title}</div>
        <div className={cx('search-artist')}>{artist}</div>
      </div>
    </div>
    <div className={cx('search-reservation')} onMouseDown={onClick}>
        신청하기
    </div>
  </div>
  );

PlaylistItem.propTypes = {
  title: PropTypes.string,
  src: PropTypes.string,
  detail: PropTypes.string,
};

PlaylistItem.defaultProps = {
  title: 'ERROR!',
  src: null,
  detail: 'none',
};

SearchItem.propTypes = {
  title: PropTypes.string,
  src: PropTypes.string,
  artist: PropTypes.string,
  onClick: PropTypes.func,
};

SearchItem.defaultProps = {
  title: 'ERROR!',
  src: null,
  artist: '',
  onClick: () => console.log('no onClick'),
};

MusicItem.propTypes = {
  title: PropTypes.string,
  src: PropTypes.string,
  onClick: PropTypes.func,
};

MusicItem.defaultProps = {
  title: 'ERROR!',
  src: null,
  onClick: () => console.log('no onClick'),
};

export default MusicItem;
