import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import decode from "unescape";

import Input from '../../common/Input';
import validationFunc from '../../../utils/validateForms';
import dataCollector from '../../../utils/dataCollector';
import { successAction, errorAction } from '../../../actions/ajaxActions';
import { createPlaylistAction, getMusicTitleAction } from '../../../actions/playlistActions';

class CreatePlaylist extends Component {
    constructor() {
        super();

        this.state = {
            title: 'empty',
            imageUrl: 'https://empty.jpg',
            songUrl: 'https://soundcloud.com/edm/empty',
            tags: 'none,'
        };

        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onSubmitHandler(event) {
        event.preventDefault();
        const payload = this.state;
        const validation = validationFunc(payload);
        let validData = true;
        const isValid = validation.validTitle().isValid && validation.validImageUrl().isValid
            && validation.validSongUrl().isValid && validation.validTags().isValid;

        for (const element of Object.values(payload)) {
            if (element.includes('empty')) {
                validData = false;
                break;
            }
        }

        if (isValid && validData) {
            this.props.getMusicTitle(this.state.songUrl)
                .then((html) => {
                    const regex = RegExp(
                        /<title>(.*?)<\/title>/
                    );
                    const songTitle = decode(regex.exec(html)[1].split('|')[0]);
                    payload.tags = payload.tags.startsWith('none') || !payload.tags ? [] : payload.tags.split(',').filter(tag => tag !== '');
                    payload.creator = localStorage.getItem('user');
                    payload.songs = [{ songTitle, songUrl: payload.songUrl }];
                    payload.likes = [];
                    payload.favorites = [];
                    delete payload.songUrl;

                    this.props.createPlaylist(payload)
                        .then(res => {
                            this.props.ajaxSuccess();
                            this.props.history.push('/profile/manage-playlists');
                        })
                        .catch(error => this.props.ajaxError());
                });
        }
    }

    render() {
        const { begin } = this.props;
        const validation = validationFunc(this.state);

        return (
            <div className="grad-background-create-playlist">
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
                        <h1 className="form-heading">Create Playlist</h1>
                        <div className="line"/>
                        <form onSubmit={this.onSubmitHandler}>
                            <Input
                                name="title"
                                placeholder="playlist title"
                                onChange={dataCollector.bind(this)}
                                validation={validation.validTitle()}
                            />
                            <Input
                                name="imageUrl"
                                placeholder="playlist image URL"
                                onChange={dataCollector.bind(this)}
                                validation={validation.validImageUrl()}
                            />
                            <Input
                                name="songUrl"
                                placeholder="playlist song URL"
                                onChange={dataCollector.bind(this)}
                                validation={validation.validSongUrl()}
                            />
                            <Input
                                name="tags"
                                placeholder="Playlist Tags [not required]"
                                onChange={dataCollector.bind(this)}
                                validation={validation.validTags()}
                            />
                            <div className="submit">
                                <input className="submitForm" type="submit" value="Create"/>
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
        error: state.ajax.error
    }
}

function mapDispatchToProps(dispatch) {
    return {
        createPlaylist: (payload) => dispatch(createPlaylistAction(payload)),
        getMusicTitle: (link) => dispatch(getMusicTitleAction(link)),
        ajaxSuccess: () => dispatch(successAction()),
        ajaxError: () => dispatch(errorAction())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreatePlaylist));