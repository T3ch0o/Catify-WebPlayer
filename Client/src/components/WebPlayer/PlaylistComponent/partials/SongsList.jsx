import React from 'react';

import Song from './Song';

const SongsList = function(props) {
    const { songs, creator, id, songId, deleteSong } = props;

    return (
        <ul className="songs-list">
            {songs ? songs.map((s, i) =>
                <Song
                    key={i}
                    index={i}
                    id={id}
                    creator={creator}
                    songId={songId}
                    songName={s.songTitle}
                    deleteSong={deleteSong}
                />
            ) : ''}
        </ul>
    );
};

export default SongsList;