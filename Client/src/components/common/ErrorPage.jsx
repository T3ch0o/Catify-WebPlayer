import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => (
    <div className="error-page">
        <h1><span className="small-error">error </span>404</h1>
        <h2>component not found</h2>
        <Link to="/">go to homepage</Link>
    </div>
);

export default ErrorPage;