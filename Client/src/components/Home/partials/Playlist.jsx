import React from 'react';
import { Link } from 'react-router-dom';
import Reveal from 'react-reveal/Reveal'

const Playlist = function(props) {
    const { image, title, creator } = props;

    const imagePath = `https://localhost:44336/${image}`;

    return (
        <Reveal>
            <li className="playlist">
                <Link className="current-playlist" to={`/web-player/playlist/${title.replaceWhiteSpaceWithLine()}?song=1`}>
                    <img src={imagePath} className="image" alt="error"/>
                    <div className="middle">
                        <h2>{title}</h2>
                        <h4>{creator}</h4>
                        <p className="playBtn">Play Now</p>
                    </div>
                </Link>
            </li>
        </Reveal>
    );
};

export default Playlist;