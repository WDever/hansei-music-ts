import React from 'react';
import classNames from 'classnames/bind';
import styles from './MusicItem.scss';

const cx = classNames.bind(styles);

interface MusicItemProps {
  title: string;
  src: string;
  onClick(): void;
}

interface PlaylistItemProps {
  title: string;
  src: string;
  detail: string;
}

interface SearchItemProps {
  title: string;
  src: string;
  artist: string;
  onClick(): void;
}

const MusicItem: React.SFC<MusicItemProps> = ({ title, src, onClick }) => (
  <div
    className={cx('item')}
    onClick={onClick}
  >
    <img src={src} alt="success" />
    <div className={cx('title')}>{title}</div>
    <div className={cx('reservation')}>신청하기</div>
  </div>
);

export const PlaylistItem: React.SFC<PlaylistItemProps> = ({ title, src, detail }) => (
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

export const SearchItem: React.SFC<SearchItemProps> = ({ title, src, artist, onClick }) => (
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

PlaylistItem.defaultProps = {
  title: 'ERROR!',
  src: '',
  detail: 'none',
};

SearchItem.defaultProps = {
  title: 'ERROR!',
  src: '',
  artist: '',
  onClick: () => console.log('no onClick'),
};

MusicItem.defaultProps = {
  title: 'ERROR!',
  src: '',
  onClick: () => console.log('no onClick'),
};

export default MusicItem;
