import * as React from 'react';
// import { Redirect } from 'react-router-dom';
import MusicListContainer from './container/MusicListContainer';
import PageTemplate from './components/PageTemplate';
import SearchBarContainer from './container/SearchBarContainer';
import './App.scss';

// interface Props {
//   list: React.ReactElement;
//   search: React.ReactElement;
// }

class App extends React.Component {
  render() {
    return (
      <PageTemplate
        list={<MusicListContainer />}
        search={<SearchBarContainer />}
      />
    );
  }
}

export default App;
