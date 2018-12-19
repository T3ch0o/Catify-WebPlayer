import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import UserInfo from './UserInfo/UserInfo';
import CreatePlaylist from './CreatePlaylist/CreatePlaylist';
import EditPlaylist from './EditPlaylist/EditPlaylist';
import ManagePlaylists from './ManagePlaylists/ManagePlaylists';
import ErrorPage from '../common/ErrorPage';

class ViewComponent extends Component {
    render() {
        return (
            <Switch>
                <Route path="/profile/user" component={UserInfo} />
                <Route path="/profile/create-playlist" component={CreatePlaylist} />
                <Route path="/profile/edit-playlist/:id" component={EditPlaylist} />
                <Route path="/profile/manage-playlists" component={ManagePlaylists} />
                <Route path="*" component={ErrorPage} />
            </Switch>
        );
    }
}

export default ViewComponent;