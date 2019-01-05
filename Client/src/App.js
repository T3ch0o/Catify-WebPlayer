import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import stringExtension from './utils/stringExtension';

import Header from './components/common/Header';
import Footer from './components/common/Footer';
import PrivateRoute from './components/common/PrivateRoute';
import AuthRoute from './components/common/AuthRoute';
import HomePage from './components/Home/HomePage';
import DownloadPage from './components/Download/DownloadPage';
import LoginPage from './components/Auth/LoginPage';
import RegisterPage from './components/Auth/RegisterPage';
import WebPlayerPage from './components/WebPlayer/WebPlayerPage';
import ProfilePage from './components/Profile/ProfilePage';
import AboutPage from './components/About/AboutPage';
import ErrorPage from './components/common/ErrorPage';

import { logoutAction } from './actions/authActions';

class App extends Component {
    constructor() {
        super();

        this.state = {
            loggedIn: false
        };

        this.onLogout = this.onLogout.bind(this);
    }

    onLogout() {
        this.props.logout();
        this.setState({loggedIn: false});
        this.props.history.push('/');
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.authSuccess) {
            this.setState({loggedIn: true});
        }
    }

    componentWillMount() {
        if (localStorage.getItem('authToken')) {
            this.setState({loggedIn: true})
        }
    }

    render() {
        return (
            <div className='App'>
                <Header
                    loggedIn={this.state.loggedIn}
                    logout={this.onLogout}
                />
                <main>
                    <Switch>
                        <Route exact path="/" component={HomePage} />
                        <Route path="/download" component={DownloadPage} />
                        <AuthRoute path="/login" component={LoginPage} loggedIn={this.state.loggedIn}/>
                        <AuthRoute path="/register" component={RegisterPage} loggedIn={this.state.loggedIn}/>
                        <Route path="/web-player" component={WebPlayerPage} />
                        <PrivateRoute path="/profile" component={ProfilePage} loggedIn={this.state.loggedIn}/>
                        <Route path="/about" component={AboutPage}/>
                        <Route path="*" component={ErrorPage}/>
                    </Switch>
                </main>
                <Footer/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        authSuccess: state.auth.success
    }
}

function mapDispatchToProps(dispatch) {
    return {
        logout: () => dispatch(logoutAction())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
