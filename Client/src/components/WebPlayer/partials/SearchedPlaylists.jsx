import React from 'react';

import Playlist from './Playlist';

const SearchedPlaylists = function(props) {
    const { playlists, search } = props;
    let searchedPlaylists = [];

    if (search) {
        searchedPlaylists = playlists.filter(p => p.title.toLowerCase().startsWith(search));
    }

    return (
        <ul>
            {searchedPlaylists.map(p =>
                <Playlist
                    key={p._id}
                    id={p._id}
                    image={p.imagePath}
                    title={p.title}
                />
            )}
        </ul>
    );
};

export default SearchedPlaylists;