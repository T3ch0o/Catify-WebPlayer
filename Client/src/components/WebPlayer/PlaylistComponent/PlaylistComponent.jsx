import React, { Component } from 'react';
import { connect } from 'react-redux';
import Fade from 'react-reveal/Fade';
import querystring from 'query-string';

import {
    getPlaylistAction,
    removeSongFromPlaylistAction,
    updatePlaylistStatusAction
} from '../../../actions/playlistActions';
import SongsList from './partials/SongsList';
import formatData from "../../../utils/formatData";
import { serverUrl } from '../../../utils/StaticFilesServer';

class PlaylistComponent extends Component {
    constructor() {
        super();

        this.state = {
            liked: false,
            favorite: false
        };

        this.like = this.like.bind(this);
        this.addToFavorites = this.addToFavorites.bind(this);
        this.deleteSong = this.deleteSong.bind(this);
        this.choseSong = this.choseSong.bind(this);
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        const query = querystring.parse(this.props.location.search);
        this.props.playlist.song = query.song - 1;
        this.props.getPlaylist(id)
            .then(() => {
                this.setState({
                    liked: this.props.playlist.isLiked,
                    favorite: this.props.playlist.isFavorite
                });
            })
            .catch(() => {
                this.props.history.push('/');
            });
    }

    like() {
        this.type = 'likes';
        this.currentState = 'liked';
        formatData.bind(this)();
    }

    addToFavorites() {
        this.type = 'favorites';
        this.currentState = 'favorite';
        formatData.bind(this)();
    }

    choseSong() {
        const query = querystring.parse(this.props.location.search);
        this.props.playlist.song = query.song - 1;
    }

    deleteSong(id, songName) {
        const playlistId = this.props.match.params.id;

        if (this.props.playlist.songs.length > 1) {
            this.props.removeSong(id, songName.trim())
                .then(() => this.props.getPlaylist(playlistId));
        }
    }

    render() {
        const { id ,songs, title, imagePath, creator, likes, favorites } = this.props.playlist;
        return (
            <div className="playlist-playing">
                <section className="playlist-view">
                    <Fade big>
                        <div>
                            <img className="player-img" src={serverUrl + (imagePath ? imagePath : "PlaylistImages/default-cover.jpg")} alt=""/>
                            <p className="playlist-title">{title}</p>
                            <p className="playlist-creator">{creator}</p>
                            <p className="playlist-information">{songs ? songs.length : 0} songs - {likes} likes - {favorites} favorites</p>
                            <div className="playlist-buttons">
                                {localStorage.getItem('user') &&
                                <div>
                                    <i onClick={this.like} className={`fa fa-thumbs-up ${this.state.liked && 'liked'}`} aria-hidden="true"/>
                                    <i onClick={this.addToFavorites} className={`fa fa-heart ${this.state.favorite && 'favorite'}`} aria-hidden="true"/>
                                </div>
                                }
                            </div>
                        </div>
                    </Fade>
                    <SongsList songs={songs} playlistTitle={title} id={id} songId={this.props.playlist.song} creator={creator} choseSong={this.choseSong} deleteSong={this.deleteSong}/>
                </section>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        playlist: state.playlist
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getPlaylist: (id) => dispatch(getPlaylistAction(id)),
        updatePlaylistStatus: (payload, id) => dispatch(updatePlaylistStatusAction(payload, id)),
        removeSong: (id, title) => dispatch(removeSongFromPlaylistAction(id, title))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(PlaylistComponent);