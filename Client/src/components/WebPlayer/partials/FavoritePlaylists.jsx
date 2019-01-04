import React from 'react';
import { Link } from 'react-router-dom';

import Playlist from './Playlist';

const FavoritePlaylists = function(props) {
    const { playlists } = props;
    const favoritePlaylists = playlists.filter(p => p.isFavoritePlaylist);

    return (
        <ul>
            {favoritePlaylists.length !== 0 ? favoritePlaylists.map(p =>
                <Playlist
                    key={p.id}
                    id={p.id}
                    image={p.imagePath}
                    title={p.title}
                />
            ) : <p className="playlist-message" >You don't have any favourites go and <Link to="/web-player/playlists">add some</Link>.</p>}
        </ul>
    );
};

export default FavoritePlaylists;