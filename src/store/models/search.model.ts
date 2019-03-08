interface SearchResultsItem {
  title: string;
  imgSrc: string;
  album: string;
  artist: string;
  id: number;
}

interface Search {
  Tlist: SearchResultsItem[];
  Allist: SearchResultsItem[];
  Arlist: SearchResultsItem[];
  cat: number;
  loading: boolean;
  focus: boolean;
  flag: boolean;
  noResultsInput: string;
  availability: boolean;
};

export { Search, SearchResultsItem };
