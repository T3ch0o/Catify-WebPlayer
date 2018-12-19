import React from 'react';
import { Link } from 'react-router-dom';
import Fade from 'react-reveal/Fade';

const Playlist = function(props) {
    const { id, image, title, deletePlaylist } = props;

    return (
        <Fade>
            <li className="playlist">
                <img src={image} className="image" alt=""/>
                <div className="middle">
                    <div className="edit-playlist">
                        <Link to={`/profile/manage-playlists/create/${id}`}><i className="fa fa-plus" aria-hidden="true"/> </Link>
                        <Link to={`/profile/edit-playlist/${id}`}><i className="fa fa-pencil" aria-hidden="true"/> </Link>
                        <button onClick={() => deletePlaylist(id, title)}><i className="fa fa-trash" aria-hidden="true"/> </button>
                    </div>
                </div>
                <Link to={`/web-player/playlist/${id}?song=1`} className="playlist-info">{title}</Link>
            </li>
        </Fade>
    );
};

export default Playlist;