import React, { Component } from 'react';
import { connect } from 'react-redux';
import Fade from 'react-reveal/Fade';

import dataCollector from '../../../utils/dataCollector';
import SearchedPlaylists from '../partials/SearchedPlaylists';

class Search extends Component {
    constructor() {
        super();

        this.state = {
            search: ''
        }
    }

    render() {
        const search = this.state.search;
        const playlists = this.props.playlists;

        return (
            <div className="player-playlist">
                <div className="search">
                    <label htmlFor="search">Search for a Playlist</label>
                    <input onChange={dataCollector.bind(this)} type="text" name="search" id="search" placeholder="Start typing..."/>
                </div>
                {search && <Fade top>
                    <div className="heading">
                        <h1>All Searches for {search}</h1>
                    </div>
                </Fade>}
                <section className="playlist-container">
                    <SearchedPlaylists playlists={playlists} search={search}/>
                </section>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        playlists: state.playlists
    }
}

function mapDispatchToProps(dispatch) {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);