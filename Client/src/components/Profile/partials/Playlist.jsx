import React from 'react';
import { Link } from 'react-router-dom';
import Fade from 'react-reveal/Fade';
import { serverUrl } from '../../../utils/StaticFilesServer';

const Playlist = function(props) {
    const { image, title, deletePlaylist } = props;

    const imagePath = serverUrl + image;
    const replacedTitle = title.replaceWhitespaceWithLine();

    return (
        <Fade>
            <li className="playlist">
                <img src={imagePath} className="image" alt=""/>
                <div className="middle">
                    <div className="edit-playlist">
                        <Link to={`/profile/manage-playlists/add-song/${replacedTitle}`}><i className="fa fa-plus" aria-hidden="true"/> </Link>
                        <Link to={`/profile/edit-playlist/${replacedTitle}`}><i className="fa fa-pencil" aria-hidden="true"/> </Link>
                        <button onClick={() => deletePlaylist(replacedTitle)}><i className="fa fa-trash" aria-hidden="true"/> </button>
                    </div>
                </div>
                <Link to={`/web-player/playlist/${replacedTitle}?song=1`} className="playlist-info">{title}</Link>
            </li>
        </Fade>
    );
};

export default Playlist;