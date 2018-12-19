import React, { Component } from 'react';
import { connect } from 'react-redux';

import AllPlaylists from '../partials/AllPlaylists';
import { requestPlaylistsAction } from '../../../actions/playlistActions';

class Playlists extends Component {
    componentDidMount() {
        this.props.getPlaylists();
    }

    render() {
        return (
            <div className="player-playlist">
                <div className="heading">
                    <h1>All Catify Playlists</h1>
                </div>
                <section className="playlist-container">
                   <AllPlaylists playlists={this.props.playlists} />
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
        getPlaylists: () => dispatch(requestPlaylistsAction())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Playlists);