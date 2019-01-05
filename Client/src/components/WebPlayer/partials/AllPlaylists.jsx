import React from 'react';

import Playlist from './Playlist';

const AllPlaylists = function(props) {
    const { playlists } = props;

    return (
        <ul>
            {playlists.map(p =>
                <Playlist
                    key={p.id}
                    image={p.imagePath}
                    title={p.title}
                />
            )}
        </ul>
    );
};

export default AllPlaylists;