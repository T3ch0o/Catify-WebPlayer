import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Seach from './Search/Search';
import Playlists from './Playlists/Playlists';
import YourLibrary from './YourLibrary/YourLibrary';
import PlaylistComponent from './PlaylistComponent/PlaylistComponent';
import ErrorPage from '../common/ErrorPage';

class ViewComponent extends Component {
    render() {
        return (
            <Switch>
                <Route path="/web-player/search" component={Seach} />
                <Route path="/web-player/playlists" component={Playlists} />
                <Route path="/web-player/your-library" component={YourLibrary} />
                <Route path="/web-player/playlist/:id" component={PlaylistComponent} />
                <Route path="*" component={ErrorPage} />
            </Switch>
        );
    }
}

export default ViewComponent;