import React from 'react';
import { Link } from 'react-router-dom';

import Playlist from './Playlist';

const FavoritePlaylists = function(props) {
    const { playlists } = props;
    const user = localStorage.getItem('user');
    const favoritePlaylists = playlists.filter(p => p.favorites.includes(user));

    return (
        <ul>
            {favoritePlaylists.length !== 0 ? favoritePlaylists.map(p =>
                <Playlist
                    key={p._id}
                    id={p._id}
                    image={p.imageUrl}
                    title={p.title}
                />
            ) : <p className="playlist-message" >You don't have any favourites go and <Link to="/web-player/playlists">add some</Link>.</p>}
        </ul>
    );
};

export default FavoritePlaylists;