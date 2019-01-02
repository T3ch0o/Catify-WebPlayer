import React, { Component } from "react";
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import AddForm from '../partials/AddForm'

import { getPlaylistsAction, deletePlaylist } from '../../../actions/playlistActions';
import MyPlaylists from '../partials/MyPlaylists';

class ManagePlaylists extends Component {
    componentDidMount() {
        this.props.getMyPlaylists();
    }

    deletePlaylist(id) {
        this.props.deletePlaylist(id)
            .then(() => {
                this.props.getMyPlaylists();
            })
    }

    render() {
        const { playlists} = this.props;
        const role = localStorage.getItem('role');

        return (
            <div>
                <div className="player-playlist">
                    <div className="heading">
                        <h1>Manage {role === 'Admin' ? 'All' : 'Your'} Playlists</h1>
                    </div>
                    <Route path="/profile/manage-playlists/create/:id" render={(props) => <AddForm {...props} playlists={playlists}/> }/>
                    <section className="playlist-container">
                        <MyPlaylists playlists={playlists} deletePlaylist={this.deletePlaylist.bind(this)}/>
                    </section>
                </div>
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
        getMyPlaylists: () => dispatch(getPlaylistsAction()),
        deletePlaylist: (id) => dispatch(deletePlaylist(id))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ManagePlaylists);