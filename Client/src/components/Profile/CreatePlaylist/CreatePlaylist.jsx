import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import decode from "unescape";

import Input from '../../common/Input';
import InputFile from '../partials/InputFile';

import validationFunc from '../../../utils/validateForms';
import dataCollector from '../../../utils/dataCollector';
import fileCollector from '../../../utils/fileCollector';

import { successAction, errorAction } from '../../../actions/ajaxActions';
import { createPlaylistAction, getMusicTitleAction, uploadPlaylistImageAction } from '../../../actions/playlistActions';

class CreatePlaylist extends Component {
    constructor() {
        super();

        this.state = {
            title: 'empty',
            songUrl: 'https://soundcloud.com/edm/empty',
            tags: 'none'
        };

        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onSubmitHandler(event) {
        event.preventDefault();
        const payload = this.state;
        const validation = validationFunc(payload);

        let validData = true;
        const isValid = validation.validTitle().isValid
            && validation.validSongUrl().isValid && validation.validTags().isValid;

        for (const element of Object.values(payload).filter(e => e.hasOwnProperty("formData"))) {
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
                    payload.tags = payload.tags.startsWith('none') || !payload.tags ? '' : payload.tags;
                    payload.songTitle = songTitle;

                    this.props.createPlaylist(payload)
                        .then(response => {
                            if (response.status !== 200) {
                                throw Error();
                            }

                            this.props.uploadPlaylistImage(this.state.formData, response.data.id)
                                .then(() => {
                                    this.props.ajaxSuccess();
                                    this.props.history.push('/profile/manage-playlists');
                                });
                        });
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
                        <form onSubmit={this.onSubmitHandler} encType="multipart/form-data">
                            <Input
                                name="title"
                                placeholder="playlist title"
                                onChange={dataCollector.bind(this)}
                                validation={validation.validTitle()}
                            />
                            <InputFile
                                name="image"
                                formData={this.state.formData}
                                onChange={fileCollector.bind(this)}
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
        uploadPlaylistImage: (payload, id) => dispatch(uploadPlaylistImageAction(payload, id)),
        ajaxSuccess: () => dispatch(successAction()),
        ajaxError: () => dispatch(errorAction())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreatePlaylist));