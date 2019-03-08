interface MusicListItem {
  id: number;
  title: string;
  imgSrc: string;
  album: string;
  artist: string;
  url: string;
};

interface MusicList {
  list: MusicListItem[];
  loading: boolean;
  code: number;
  check: boolean
};

export { MusicList, MusicListItem };
