import React, { Component } from 'react';
import { connect } from 'react-redux';
import Fade from 'react-reveal/Fade';
import querystring from 'query-string';

import { getPlaylistAction, removeSongFromPlaylistAction } from '../../../actions/playlistActions';
import SongsList from './partials/SongsList';
import formatData from "../../../utils/formatData";

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
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        const query = querystring.parse(this.props.location.search);
        this.props.playlist.song = query.song - 1;
        this.props.getPlaylist(id);
    }

    componentWillReceiveProps(nextProp) {
        const query = querystring.parse(nextProp.location.search);
        this.props.playlist.song = query.song - 1;
        if (localStorage.getItem('user')) {
            // if (nextProp.playlist.likes.includes(user)) {
            //    this.setState({liked: true});
            // }

            if (nextProp.playlist.isFavoritePlaylist) {
                this.setState({favorite: true});
            }
        }
    }

    like() {
        this.type = 'likes';
        this.currentState = 'liked';
        const format = formatData.bind(this);
        format();
    }

    addToFavorites() {
        this.type = 'favorites';
        this.currentState = 'favorite';
        const format = formatData.bind(this);
        format();
    }

    deleteSong() {
        const id = this.props.match.params.id;

        this.props.removeSong(id)
            .then(() => this.props.getPlaylist(id));
    }

    render() {
        const { id ,songs, title, imageUrl, creator, likes, favorites } = this.props.playlist;
        return (
            <div className="playlist-playing">
                <section className="playlist-view">
                    <Fade big>
                        <div>
                            <img className="player-img" src={imageUrl} alt=""/>
                            <p className="playlist-title">{title}</p>
                            <p className="playlist-creator">{creator}</p>
                            <p className="playlist-information">{songs ? songs.length : 0} songs - {likes ? likes.length : 0} likes - {favorites ? favorites.length : 0} favorites</p>
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
                    <SongsList songs={songs} id={id} songId={this.props.playlist.song} creator={creator} deleteSong={this.deleteSong}/>
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
        removeSong: (id) => dispatch(removeSongFromPlaylistAction(id))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(PlaylistComponent);