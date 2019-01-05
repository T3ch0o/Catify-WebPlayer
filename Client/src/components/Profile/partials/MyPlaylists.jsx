import React from 'react';
import { Link } from 'react-router-dom';

import Playlist from './Playlist';

const MyPlaylists = function(props) {
    const { playlists, deletePlaylist } = props;
    const user = localStorage.getItem('user');
    const role = localStorage.getItem('role');
    const myPlaylists = role === 'User' ? playlists.filter(p => p.creator === user) : playlists;

    return (
        <ul>
            {myPlaylists.length !== 0 ? myPlaylists.map(p =>
                <Playlist
                    key={p.id}
                    image={p.imagePath}
                    title={p.title}
                    deletePlaylist={deletePlaylist}
                />
            ) : <p className="playlist-message" >You have no playlists go and <Link to="/profile/create-playlist">create some</Link>.</p>}
        </ul>
    );
};

export default MyPlaylists;