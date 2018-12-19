import React, { Component } from "react";
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import AddForm from '../partials/AddForm'

import { requestPlaylistsAction, deletePlaylist } from '../../../actions/playlistActions';
import MyPlaylists from '../partials/MyPlaylists';
import {updateUserAction, userAction} from '../../../actions/authActions';

class ManagePlaylists extends Component {
    componentDidMount() {
        this.props.getMyPlaylists();
    }

    deletePlaylist(id, title) {
        this.props.deletePlaylist(id)
            .then(res => {
                this.props.getUser()
                    .then(data => {
                        const { favorites, roles, tags, email, _id } = data;

                        if (favorites.includes(title)) {
                            const index = favorites.indexOf(title);
                            favorites.splice(index, 1)
                        }

                        const payload = {
                            email,
                            roles,
                            favorites,
                            tags
                        };

                        this.props.updateUser(payload, _id);
                        this.props.getMyPlaylists();
                    });
            });
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
        getMyPlaylists: () => dispatch(requestPlaylistsAction()),
        deletePlaylist: (id) => dispatch(deletePlaylist(id)),
        getUser: () => dispatch(userAction()),
        updateUser: (payload, id) => dispatch(updateUserAction(payload, id))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ManagePlaylists);