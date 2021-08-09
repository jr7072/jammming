import React from "react";
import "./SearchBar.css";

export class SearchBar extends React.Component {
    render() {

        return (
            <div className="SearchBar">
                <input placeHolder="Enter A Song, Album, or Artist"/>
                <button className="SearchButton">SEARCH</button>
            </div>
        )
    }
}
