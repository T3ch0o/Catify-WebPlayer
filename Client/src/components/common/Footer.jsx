import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import catifyLogo from  '../../images/Catify_Logo_White.png';

class Footer extends Component {
    render() {
        return (
            <footer>
                <div className="footer-items">
                    <Link to="/" className="align-top">
                        <img className="footer-image" src={catifyLogo} alt="error" />
                    </Link>
                    <div className="links">
                        <p>Useful links</p>
                        <ul>
                            <li><Link to="/about">about</Link></li>
                            <li><a href="https://github.com/T3ch0o">github</a></li>
                        </ul>
                    </div>
                    <div className="icons">
                        <a href="https://www.facebook.com"><i className="fa fa-facebook" aria-hidden="true"></i> </a>
                        <a href="https://www.instagram.com"><i className="fa fa-instagram" aria-hidden="true"></i> </a>
                        <a href="https://twitter.com"><i className="fa fa-twitter" aria-hidden="true"></i> </a>
                    </div>
                </div>
                <p>© 2018 Catify</p>
            </footer>
        );
    }
}

export default Footer;