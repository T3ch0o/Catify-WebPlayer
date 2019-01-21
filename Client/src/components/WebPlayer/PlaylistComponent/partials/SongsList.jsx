import React from 'react';
import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar'

import Song from './Song';

const SongsList = function(props) {
    const { playlistTitle, songs, creator, id, songId, choseSong, deleteSong } = props;

    return (
        <PerfectScrollbar>
            <ul className="songs-list">
                {songs ? songs.map((s, i) =>
                    <Song
                        key={i}
                        index={i}
                        id={id}
                        playlistTitle={playlistTitle}
                        creator={creator}
                        songId={songId}
                        songName={s.title}
                        choseSong={choseSong}
                        deleteSong={deleteSong}
                    />
                ) : ''}
            </ul>
        </PerfectScrollbar>
    );
};

export default SongsList;