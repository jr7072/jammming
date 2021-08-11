import React from "react";
import "./Playlist.css"
import { TrackList } from "../TrackList/TrackList";

export class Playlist extends React.Component {
    constructor(props){
        super(props);

        this.handleNameChange = this.handleNameChange.bind(this);
        this.onSave = this.onSave.bind(this);
    }
    
    handleNameChange(e){
        let newName = e.target.value;
        this.props.onNameChange(newName);
    }

    onSave() {
        let name = this.props.playlistName;
        let trackArray = this.props.playlistTracks;
        this.props.onSave(name, trackArray);
    }

    render() {
        
        return (
           <div className="Playlist">
               <input value={this.props.playlistName} onChange={this.handleNameChange}/>
               <TrackList tracks={this.props.playlistTracks} 
                        onRemove={this.props.onRemove} 
                        isRemoval={true} />
               <button className="Playlist-save" onClick={this.onSave}>SAVE TO SPOTIFY</button>
           </div> 
        );
    }
}