export default function() {
    const id = this.props.playlist.id;
    const type = this.type;
    const payload = {
        likes: this.props.playlist['likes'],
        favorites: this.props.playlist['favorites'],
    };

    if (!this.state.liked && type !== 'favorites') {
        payload[type] += 1;
        this.setState({[this.currentState]: true});
    }
    else if (!this.state.favorite && type !== 'likes') {
        payload[type] += 1;
        this.setState({[this.currentState]: true});
    }
    else {
        payload[type] -= 1;
        this.setState({[this.currentState]: false});
    }

    this.props.updatePlaylistStatus(payload, id)
        .then(() => {
            this.props.getPlaylist(id)
        });
}