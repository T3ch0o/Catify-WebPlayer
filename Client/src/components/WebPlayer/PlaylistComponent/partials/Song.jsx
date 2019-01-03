import React from 'react';
import { Link } from 'react-router-dom';

const SongsList = function(props) {
    const { songName, creator ,id, index, songId, choseSong, deleteSong } = props;
    const isTrue = index === songId;
    const user = localStorage.getItem('user');
    const role = localStorage.getItem('role');

    return (
        <li>
            <Link to={`/web-player/playlist/${id}?song=${index + 1}`} className={isTrue ? 'active' : ''}><i className={isTrue ? `fa fa-play` : `fa fa-music`} aria-hidden="true" onClick={() => choseSong()}/> {songName}</Link>
            {creator === user || role === 'Admin' ? <button className="song-delete" onClick={() => deleteSong(songName)}><i className="fa fa-minus" aria-hidden="true"/> </button> : null}
        </li>
    );
};

export default SongsList;