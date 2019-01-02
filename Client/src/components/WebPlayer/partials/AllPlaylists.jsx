import React from 'react';

import Playlist from './Playlist';

const AllPlaylists = function(props) {
    const { playlists } = props;

    return (
        <ul>
            {playlists.map(p =>
                <Playlist
                    key={p.id}
                    id={p.id}
                    image={p.imageUrl}
                    title={p.title}
                />
            )}
        </ul>
    );
};

export default AllPlaylists;