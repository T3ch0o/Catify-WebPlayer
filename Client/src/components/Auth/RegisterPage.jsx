import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Input from '../common/Input';
import dataCollector from '../../utils/dataCollector';
import validationFunc from '../../utils/validateForms';
import { registerAction, redirectToPage } from '../../actions/authActions';
import { errorAction, successAction } from '../../actions/ajaxActions';

class RegisterPage extends Component {
    constructor() {
        super();

        this.state = {
            username: 'empty',
            email: 'empty@a.bg',
            password: 'empty',
            repeatPassword: 'empty'
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
        const isValid = validation.validUsername().isValid && validation.validEmail().isValid &&
            validation.validPassword().isValid && validation.validRepeatPassword().isValid;
        const validData = Object.values(payload).includes('empty');

        if (isValid && !validData) {
            payload.tags = [];
            payload.favorites = [];
            payload.role = "User";
            delete payload.repeatPassword;
            this.props.register(payload)
                .then(() => {
                    this.props.redirect();
                    this.props.ajaxSuccess();
                    this.props.history.push('/');
                })
                .catch((error) => this.props.ajaxError());
        }
    }

    render() {
        const { begin, error } = this.props;
        const validation = validationFunc(this.state);

        return (
            <div className="grad-background">
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
                        <h1 className="form-heading">Register Form</h1>
                        <div className="line"/>
                        <form onSubmit={this.onSubmitHandler}>
                            {error && <div className="alert">
                                <p className="warning">Username already exists.</p>
                            </div>}
                            <Input
                                name="username"
                                onChange={dataCollector.bind(this)}
                                validation={validation.validUsername()}
                            />
                            <Input
                                name="email"
                                onChange={dataCollector.bind(this)}
                                validation={validation.validEmail()}
                            />
                            <Input
                                name="password"
                                type="password"
                                onChange={dataCollector.bind(this)}
                                validation={validation.validPassword()}
                            />
                            <Input
                                name="repeatPassword"
                                type="password"
                                onChange={dataCollector.bind(this)}
                                validation={validation.validRepeatPassword()}
                            />
                            <div className="submit">
                                <input className="submitForm" type="submit" value="Register"/>
                            </div>
                        </form>
                        <p className="auth-register">Already have an account? <span><Link to="/login">Log in</Link></span></p>
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
        register: (payload) => dispatch(registerAction(payload)),
        redirect: () => dispatch(redirectToPage()),
        ajaxError: () => dispatch(errorAction()),
        ajaxSuccess: () => dispatch(successAction())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RegisterPage));