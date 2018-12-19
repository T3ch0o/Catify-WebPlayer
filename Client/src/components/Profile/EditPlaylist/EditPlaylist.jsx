import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Input from './Input';
import validationFunc from '../../../utils/validateForms';
import dataCollector from '../../../utils/dataCollector';
import { editPlaylistAction } from '../../../actions/playlistActions';

class EditPlaylist extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            imageUrl: '',
            tags: ''
        };

        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    componentWillMount() {
        const id = this.props.match.params.id;
        const currentPlaylist = Object.assign({}, this.props.playlists.find(p => p._id === id));

        if (!currentPlaylist.hasOwnProperty('_id')) {
            this.props.history.push('/profile/manage-playlists');
            return;
        }

        const {title, imageUrl, tags} = Object.assign({}, this.props.playlists.find(p => p._id === id));

        this.setState({title, imageUrl, tags});
    }

    onSubmitHandler(event) {
        event.preventDefault();
        const payload = this.state;
        const validation = validationFunc(payload);
        const isValid = validation.validTitle().isValid && validation.validImageUrl().isValid && validation.validTags().isValid;

        if (isValid) {
            const id = this.props.match.params.id;
            const tags = payload.tags.join(',');
            const currentPlaylist = Object.assign({}, this.props.playlists.find(p => p._id === id));
            currentPlaylist.title = payload.title;
            currentPlaylist.imageUrl = payload.imageUrl;
            currentPlaylist.tags = !tags ? [] : tags.split(',').filter(tag => tag !== '');

            this.props.editPlaylist(currentPlaylist, id)
                .then(() => this.props.history.push('/profile/manage-playlists'));
        }
    }

    render() {
        const { title, imageUrl, tags } = this.state;
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
                        <form onSubmit={this.onSubmitHandler}>
                            <Input
                                name="title"
                                placeholder="playlist title"
                                onChange={dataCollector.bind(this)}
                                validation={validation.validTitle()}
                                value={title}
                            />
                            <Input
                                name="imageUrl"
                                placeholder="playlist image URL"
                                onChange={dataCollector.bind(this)}
                                validation={validation.validImageUrl()}
                                value={imageUrl}
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
        editPlaylist: (payload, id) => dispatch(editPlaylistAction(payload, id))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditPlaylist));