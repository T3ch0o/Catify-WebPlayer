import React from 'react';
import { Link } from 'react-router-dom';

import Playlist from './Playlist';

const MyPlaylists = function(props) {
    const { playlists } = props;
    const user = localStorage.getItem('user');

    const myPlaylists = playlists.filter(p => p.creator === user);

    return (
        <ul>
            {myPlaylists.length !== 0 ? myPlaylists.map(p =>
                <Playlist
                    key={p.id}
                    id={p.id}
                    image={p.imagePath}
                    title={p.title}
                />
            ) : <p className="playlist-message" >You have no playlists go and <Link to="/profile/create-playlist">create some</Link>.</p>}
        </ul>
    );
};

export default MyPlaylists;