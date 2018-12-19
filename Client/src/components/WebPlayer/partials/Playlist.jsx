import React from 'react';
import { Link } from 'react-router-dom';
import Reveal from 'react-reveal/Reveal'

const Playlist = function(props) {
    const { id, image, title } = props;

    return (
        <Reveal>
            <li className="playlist">
                <Link className="current-playlist" to={`/web-player/playlist/${id}?song=1`}>
                    <img src={image} className="image" alt=""/>
                    <div className="middle">
                        <p className="playlistBtn"><i className="fa fa-play" aria-hidden="true"/></p>
                    </div>
                    <p className="playlist-info">{title}</p>
                </Link>
            </li>
        </Reveal>
    );
};

export default Playlist;