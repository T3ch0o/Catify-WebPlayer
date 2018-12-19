import React, { Component } from 'react';
import { connect } from 'react-redux';

import MyPlaylists from '../partials/MyPlaylists';
import FavoritePlaylists from "../partials/FavoritePlaylists";

class YourLibrary extends Component {
    render() {
        const playlists = this.props.playlists;

        return (
            <div className="player-playlist">
                <div className="heading">
                    <h1>Your Playlists</h1>
                </div>
                <section className="playlist-container">
                    <MyPlaylists playlists={playlists}/>
                </section>
                <div className="heading">
                    <h1>Your Favourite Playlists</h1>
                </div>
                <section className="playlist-container">
                    <FavoritePlaylists playlists={playlists}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(YourLibrary);