import React from "react";
import "./Sample.css";

export class Sample extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            Sample: new Audio()
        }
        this.handleClick = this.handleClick.bind(this);
        this.renderButton = this.renderButton.bind(this);
    }
    
    handleClick(){

        this.props.playSample(this.props.trackId, this.state.Sample);

    }

    renderButton() {

        if (!this.props.isPlaying){
           return <div className="play"></div>
        }else{
            return <div className="pause"></div>
        }
    }
    
    render(){

        return(

            <div className="sample">
                <button className="play-button" onClick={this.handleClick}> 
                    {this.renderButton()}
                </button>
            </div>
        )
    }
}