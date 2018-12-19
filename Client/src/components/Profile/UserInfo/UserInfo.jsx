import React, { Component } from 'react';
import { connect } from 'react-redux';
import Flip from 'react-reveal/Flip';

import { userAction } from '../../../actions/authActions';

class UserInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            email: '',
            favoritePlaylists: []
        }
    }

    componentDidMount() {
        this.props.userInfo()
            .then((data) => {
                this.setState({ username: data.username, email: data.email, favoritePlaylists: data.favorites });
            });
    }

    render() {
        const { username, email, favoritePlaylists } = this.state;

        return (
            <div>
                <div className="grad-background-profile">
                    <section className="auth-forms">
                        <div className="catify-form">
                            <h1 className="form-heading">Profile</h1>
                            <div className="line"/>
                            <div className="info">
                                <div className="profile-info">Username <span><Flip bottom>{username || 'Loading...'}</Flip></span></div>
                                <div className="profile-info">Email <span><Flip bottom>{email || 'Loading...'}</Flip></span></div>
                                <div className="profile-info">Favorite Playlists <span><Flip left>{ favoritePlaylists ? favoritePlaylists.length : 0 } added</Flip></span></div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
    }
}

function mapDispatchToProps(dispatch) {
    return {
        userInfo: () => dispatch(userAction())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);