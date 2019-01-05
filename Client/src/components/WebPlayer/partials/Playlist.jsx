import React from 'react';
import { Link } from 'react-router-dom';
import Reveal from 'react-reveal/Reveal'

const Playlist = function(props) {
    const { image, title } = props;

    const imagePath = `https://localhost:44336/${image}`;

    return (
        <Reveal>
            <li className="playlist">
                <Link className="current-playlist" to={`/web-player/playlist/${title.replaceWhiteSpaceWithLine()}?song=1`}>
                    <img src={imagePath} className="image" alt=""/>
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