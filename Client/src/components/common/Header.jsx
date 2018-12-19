import React from 'react';
import { NavLink, Link } from 'react-router-dom';

import catifyLogo from  '../../images/Catify_Logo_White.png';

const Header = function(props) {
    const { logout, loggedIn} = props;

    return (
        <header>
            <Link className="nav-image" to="/"><img src={catifyLogo} alt="error"/></Link>
            <nav>
                <ul className="nav-bar">
                    <li><NavLink to="/" activeClassName="active" exact >home</NavLink></li>
                    <li><NavLink to="/download">download</NavLink></li>
                    {!loggedIn && <li><NavLink to="/login">login</NavLink></li>}
                    {!loggedIn && <li><NavLink to="/register">register</NavLink></li>}
                    {loggedIn &&<li><NavLink to="/web-player/playlists">web player</NavLink></li>}
                    {loggedIn && <li role="separator" className="divider">|</li>}
                    {loggedIn && <li><NavLink to="/profile/user"><i className="fa fa-user-o" aria-hidden="true"></i> profile</NavLink></li>}
                    {loggedIn && <li><button onClick={logout}>logout</button></li>}
                </ul>
            </nav>
        </header>
    );
};

export default Header;