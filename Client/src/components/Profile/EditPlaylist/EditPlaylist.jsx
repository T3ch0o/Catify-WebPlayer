import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Input from './Input';
import validationFunc from '../../../utils/validateForms';
import dataCollector from '../../../utils/dataCollector';
import { editPlaylistAction, uploadPlaylistImageAction } from '../../../actions/playlistActions';
import { successAction, errorAction } from '../../../actions/ajaxActions';
import fileCollector from '../../../utils/fileCollector';
import InputFile from '../partials/InputFile';

class EditPlaylist extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            tags: ''
        };

        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    componentWillMount() {
        const id = this.props.match.params.id;
        const playlistTitle = id.replace(/-+/g, ' ');
        const currentPlaylist = Object.assign({}, this.props.playlists.find(p => p.title === playlistTitle));

        if (!currentPlaylist.hasOwnProperty('id')) {
            this.props.history.push('/profile/manage-playlists');
            return;
        }

        const { title, tags } = currentPlaylist;

        this.setState({title, tags});
    }

    onSubmitHandler(event) {
        event.preventDefault();
        const payload = this.state;
        const validation = validationFunc(payload);
        const isValid = validation.validTitle().isValid && validation.validTags().isValid;

        if (isValid) {
            const id = this.props.match.params.id;
            const playlistTitle = id.replace(/-+/g, ' ');
            const currentPlaylist = Object.assign({}, this.props.playlists.find(p => p.title === playlistTitle));
            currentPlaylist.title = payload.title;

            this.props.editPlaylist(currentPlaylist, id)
                .then(() => {
                    this.props.uploadPlaylistImage(this.state.formData, currentPlaylist.id)
                        .then(() => {
                            this.props.ajaxSuccess();
                            this.props.history.push('/profile/manage-playlists');
                        });
                });
        }
    }

    render() {
        const { title, tags } = this.state;
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
                        <h1 className="form-heading">Edit Playlist</h1>
                        <div className="line"/>
                        <form onSubmit={this.onSubmitHandler} encType="multipart/form-data">
                            <Input
                                name="title"
                                placeholder="playlist title"
                                onChange={dataCollector.bind(this)}
                                validation={validation.validTitle()}
                                value={title}
                            />
                            <InputFile
                                name="image"
                                formData={this.state.formData}
                                onChange={fileCollector.bind(this)}
                            />
                            <Input
                                name="tags"
                                placeholder="Playlist Tags [not required]"
                                onChange={dataCollector.bind(this)}
                                validation={validation.validTags()}
                                value={tags}
                            />
                            <div className="submit">
                                <input className="submitForm" type="submit" value="Edit"/>
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
        playlists: state.playlists
    }
}

function mapDispatchToProps(dispatch) {
    return {
        editPlaylist: (payload, id) => dispatch(editPlaylistAction(payload, id)),
        uploadPlaylistImage: (payload, id) => dispatch(uploadPlaylistImageAction(payload, id)),
        ajaxSuccess: () => dispatch(successAction()),
        ajaxError: () => dispatch(errorAction())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditPlaylist));