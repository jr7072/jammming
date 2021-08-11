import './App.css';
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from "../SearchResults/SearchResults";
import { Playlist } from "../Playlist/Playlist";
import Spotify from "../../util/Spotify";
import "./App.css";
import React from 'react';

export class App extends React.Component{
  
  constructor(props){
    super(props);
    this.state = {
      searchResults: [],
      playlistName: "My Playlist",
      playlistTracks: [],
    }
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    if(this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)){
      return;
    }

    this.state.playlistTracks.push(track);

    this.setState({playlistTracks: this.state.playlistTracks});
  }
  removeTrack(track) {
    let tracks = this.state.playlistTracks;
    tracks.splice(track.id - 1, 1);
    
    this.setState({playlistTracks: tracks});
  }

  updatePlaylistName(name) {
    this.setState({playlistName: name});
  }

  savePlaylist(name, tracks){

    let uriArray = tracks.map(track => track.uri);
    Spotify.savePlaylist(name, uriArray);

    this.setState({playlistName: "My Playlist", playlistTracks: []});
    
  }

 
  search(term) {

    Spotify.search(term).then(results => {
      this.setState({searchResults: results});
    })

    
    
  }
  
  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} 
                            onAdd={this.addTrack}/>
            <Playlist playlistName={this.state.playlistName} 
                      playlistTracks={this.state.playlistTracks} 
                      onRemove={this.removeTrack} 
                      onNameChange={this.updatePlaylistName}
                      onSave={this.savePlaylist}/>
          </div>
        </div>
      </div>
    );
  }
}


