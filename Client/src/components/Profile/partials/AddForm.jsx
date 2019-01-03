import React, { Component } from 'react';
import { connect } from 'react-redux';
import decode from 'unescape';

import Input from '../../common/Input';
import dataCollector from '../../../utils/dataCollector';
import validationFunc from '../../../utils/validateForms';
import { addSongToPlaylistAction, getMusicTitleAction, getPlaylistAction } from '../../../actions/playlistActions';
import { errorAction } from '../../../actions/ajaxActions';

class AddForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            songUrl: 'https://soundcloud.com/edm/empty'
        };

        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onSubmitHandler(event) {
        event.preventDefault();
        const songUrl = this.state.songUrl;
        const validation = validationFunc(this.state);
        const isValid = !songUrl.includes('empty') && validation.validSongUrl().isValid;

        if (isValid) {
            const id = this.props.match.params.id;

            this.props.getMusicTitle(songUrl)
                .then((html) => {
                    const regex = RegExp(
                        /<title>(.*?)<\/title>/
                    );
                    const songTitle = decode(regex.exec(html)[1].split('|')[0]);
                    let isTrue = true;
                    this.props.getPlaylist(id)
                        .then(() => {
                            for (const currentSong of this.props.playlist.songs) {
                                if (currentSong.title === songTitle) {
                                    isTrue = false;
                                }
                            }

                            if (isTrue) {
                                let payload = {
                                    title: songTitle,
                                    url: songUrl
                                };

                                this.props.addSong(payload, id);
                            } else {
                                this.props.ajaxError();
                            }
                        });
                });
        }
    }

    render() {
        const validation = validationFunc(this.state);
        const { begin, error } = this.props;

        return (
            <div className="add-container">
                <section className="auth-forms">
                    <div className="catify-form">
                        {begin && <div className="overlay">
                            <div className="lds-ring">
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        </div>}
                        <h1 className="form-heading">Add Song</h1>
                        <div className="line"/>
                        <form onSubmit={this.onSubmitHandler} className="add-song-form">
                            {error && <div className="alert">
                                <p className="warning">This song is already in your playlist.</p>
                            </div>}
                            <Input
                                name="songUrl"
                                placeholder="playlist song URL"
                                onChange={dataCollector.bind(this)}
                                validation={validation.validSongUrl()}
                            />
                            <div className="submit">
                                <input className="submitForm" type="submit" value="Add"/>
                            </div>
                        </form>
                    </div>
                </section>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        begin: state.ajax.begin,
        error: state.ajax.error,
        playlist: state.playlist
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addSong: (payload, id) => dispatch(addSongToPlaylistAction(payload, id)),
        getPlaylist: (id) => dispatch(getPlaylistAction(id)),
        getMusicTitle: (link) => dispatch(getMusicTitleAction(link)),
        ajaxError: () => dispatch(errorAction()),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(AddForm);