export default function() {
    this.props.getUser()
        .then(data => {
            const playlistPayload = this.props.playlist;
            const { favorites, roles, tags, email, _id } = data;
            const type = this.type;
            const id = playlistPayload._id;
            const user = data.username;
            let currentType = playlistPayload[type];

            if (currentType.includes(user)) {
                const indexOfUser = currentType.indexOf(user);
                const indexOfPlaylist = favorites.indexOf(playlistPayload.title);
                favorites.splice(indexOfPlaylist, 1);
                currentType.splice(indexOfUser, 1);
                this.setState({[this.currentState]: false});
            } else {
                favorites.push(playlistPayload.title);
                currentType.push(user);
                this.setState({[this.currentState]: true});
            }

            playlistPayload[type] = currentType;
            const userPayload = {
                email,
                roles,
                favorites,
                tags
            };
            this.props.updatePlaylist(playlistPayload, id);
            if (type === 'favorites') {
                this.props.updateUser(userPayload, _id);
            }
        })
        .catch(error => error);
}