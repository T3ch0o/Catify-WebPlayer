import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Input from '../common/Input';
import dataCollector from '../../utils/dataCollector';
import validationFunc from '../../utils/validateForms';
import { loginAction, redirectToPage } from '../../actions/authActions';
import { errorAction, successAction } from '../../actions/ajaxActions';

class LoginPage extends Component {
    constructor() {
        super();

        this.state = {
            username: 'empty',
            password: 'empty'
        };

        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    componentDidMount() {
        this.props.ajaxSuccess();
    }

    onSubmitHandler(event) {
        event.preventDefault();
        const payload = this.state;
        const validation = validationFunc(payload);
        const validData = Object.values(payload).includes('empty');

        if (validation.validLoginUsername().isValid && validation.validLoginPassword().isValid && !validData) {
            this.props.login(payload)
                .then(() => {
                    this.props.redirect();
                    this.props.ajaxSuccess();
                    this.props.history.push('/');
                })
                .catch(error => this.props.ajaxError());
        }
    }

    render() {
        const { begin, error} = this.props;
        const validation = validationFunc(this.state);

        return (
            <div className="grad-background">
                <section className="auth-forms" style={{position:'relative'}}>
                    <div className="catify-form">
                        {begin && <div className="overlay">
                            <div className="lds-ring">
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        </div>}
                        <h1 className="form-heading">Login Form</h1>
                        <div className="line"/>
                        <form onSubmit={this.onSubmitHandler}>
                            {error && <div className="alert">
                                <p className="warning">Incorrect username or password.</p>
                            </div>}
                            <Input
                                name="username"
                                onChange={dataCollector.bind(this)}
                                validation={validation.validLoginUsername()}
                            />
                            <Input
                                name="password"
                                type="password"
                                onChange={dataCollector.bind(this)}
                                validation={validation.validLoginPassword()}
                            />
                            <div className="submit">
                                <input className="submitForm" type="submit" value="Log in"/>
                            </div>
                        </form>
                        <p className="auth-register">Don't have an account? <span><Link to="/register">Register</Link></span></p>
                    </div>
                </section>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        authSuccess: state.auth.success,
        error: state.ajax.error,
        begin: state.ajax.begin
    }
}

function mapDispatchToProps(dispatch) {
    return {
        login: (payload) => dispatch(loginAction(payload)),
        redirect: () => dispatch(redirectToPage()),
        ajaxError: () => dispatch(errorAction()),
        ajaxSuccess: () => dispatch(successAction())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginPage));
