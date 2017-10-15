import _ from 'lodash';
import React, {Component} from 'react';
import ReactDom from 'react-dom';
import YTSearch from 'youtube-api-search';
// own made imports
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

const API_KEY = 'AIzaSyAUAc7b3X1e6t2qWf8hvnbA7fRXfVwjICQ';

// Create a new component. This component should produce some html
class App extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      videos: [],
      selectedVideo: null
     };

     this.videoSearch('Black Clover');
  }

  videoSearch(term) {
    YTSearch({key: API_KEY, term: term}, (videos) => {
      this.setState({ 
        videos: videos,
        selectedVideo: videos[0]
       });
      // this.setState({ videos: videos});
    });
  }

  render() {
    const videoSearch = _.debounce((term) => { this.videoSearch(term)}, 150);

    return (
    <div>
      <SearchBar onSearchTermChange={videoSearch} />
      <VideoDetail video={this.state.selectedVideo} />
      <VideoList
       onVideoSelect={selectedVideo => this.setState({selectedVideo}) }
       videos={this.state.videos} />
 
    </div>
    );
  }
}

// Put the component into the DOM
ReactDom.render(<App />, document.querySelector('.container'));