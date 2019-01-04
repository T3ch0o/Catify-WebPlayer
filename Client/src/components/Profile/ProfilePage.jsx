import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import ViewComponent from './ViewComponent';

class ProfilePage extends Component {
    render() {
        const user = localStorage.getItem('user');
        const role = localStorage.getItem('role');

        return (
                <div className="web-player">
                    <section className="side-nav">
                        <nav>
                            <ul>
                                <li>
                                    <NavLink to="/profile/user">
                                        <i className="fa fa-user-o" aria-hidden="true"></i>
                                        {role === 'Admin' ? `${user} [Admin]` : user}
                                    </NavLink>
                                </li>
                                <li className="separator" role="separator"/>
                                <li>
                                    <NavLink to="/profile/create-playlist">
                                        <i className="fa fa-plus-circle" aria-hidden="true"></i>
                                        create playlist
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/profile/manage-playlists">
                                        <i className="fa fa-cog" aria-hidden="true"></i>
                                        manage playlists
                                    </NavLink>
                                </li>
                            </ul>
                        </nav>
                    </section>
                    <section className="content-container">
                        <ViewComponent />
                    </section>
                </div>
        );
    }
}

export default ProfilePage;