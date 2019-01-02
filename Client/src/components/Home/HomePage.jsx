import React, { Component } from 'react';
import { connect } from 'react-redux';

import LatestPlaylist from './partials/LatestPlaylists';
import { getPlaylistsAction } from '../../actions/playlistActions';

class HomePage extends Component {
    componentDidMount() {
        this.props.getPlaylists();
    }

    render() {
        const { playlists } = this.props;

        return (
            <div>

                <div className="heading">
                    <h1>Looking for music?</h1>
                    <h3>Start listening to the latest playlists.</h3>
                </div>
                <section className="playlist-container">
                    <LatestPlaylist playlists={playlists}/>
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
        getPlaylists: () => dispatch(getPlaylistsAction())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);