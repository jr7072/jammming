import React from 'react';
import "./Track.css";
import {Sample} from "../Sample/Sample"
import Spotify from "../../util/Spotify"

export class Track extends React.Component {
    constructor(props){

        super(props);

        this.state = {
            isPlaying: false
        }

        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
        this.playSample = this.playSample.bind(this);
    }
    addTrack() {

        this.props.onAdd(this.props.track);
    }
    removeTrack() {
        this.props.onRemove(this.props.track)
    }
    
    renderAction() {

        if (this.props.isRemoval) {
            return (
                <button className="Track-action" onClick={this.removeTrack}>-</button>
            );
        }

        return (
            <button className="Track-action" onClick={this.addTrack}>+</button>
        );
    }

    playSample(trackId, Sample) {

        let isPlaying = this.state.isPlaying;

        Spotify.getSample(trackId)
        .then(sampleUrl => {
    
            Sample.src= sampleUrl;
            if(isPlaying){
                
                Sample.pause();
               
            }else{
                Sample.play();
            }

            isPlaying ? isPlaying = false: isPlaying = true;

            this.setState({isPlaying: isPlaying});
        });



        
    }
    render() {
        return (
            <div className="Track">
                <div className="Track-information">
                    <h3>{this.props.track.name}</h3>
                    <p>{this.props.track.artist} | {this.props.track.album}</p>
                    
                </div>
                <Sample playSample={this.playSample}  trackId={this.props.track.id} isPlaying={this.state.isPlaying}/>
                {this.renderAction()}
            </div>
        )
    }
}