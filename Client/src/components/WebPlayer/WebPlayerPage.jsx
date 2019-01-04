import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import ViewComponent from "./ViewComponent";
import MusicPlayer from './partials/MusicPlayer';
import querystring from 'query-string';

class WebPlayerPage extends Component {
    constructor() {
        super();

        this.state = {
            songs: [{
                url: ""
            }]
        };

        this.interval = null;
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            if (this.props.playlist.hasOwnProperty("songs")) {
                let { songs } = this.props.playlist;
                this.setState({ songs });
            }
        }, 0);
    }

    componentWillReceiveProps(nextProp) {
        const query = querystring.parse(nextProp.location.search);
        if (query.song) {
            this.props.playlist.song = query.song - 1;
        }

        if (this.props.playlist.hasOwnProperty("songs")) {
            let { songs } = this.props.playlist;
            this.setState({ songs });
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return (
            <div className="web-player">
                <section className="side-nav">
                    <nav>
                        <ul>
                            <li>
                                <NavLink to="/web-player/search"><i className="fa fa-search" aria-hidden="true"/> search</NavLink>
                            </li>
                            <li>
                                <NavLink to="/web-player/playlists"><i className="fa fa-play" aria-hidden="true"/> all playlists</NavLink>
                            </li>
                            <li>
                                {localStorage.getItem('user') && <NavLink to="/web-player/your-library"><i className="fa fa-book" aria-hidden="true"/> your library</NavLink>}
                            </li>
                        </ul>
                    </nav>
                </section>
                <section className="content-container">
                    <ViewComponent/>
                </section>
                <MusicPlayer playlist={this.state.songs} currentSong={this.props.playlist.song}/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        playlist: state.playlist
    }
}

export default connect(mapStateToProps)(WebPlayerPage);