import React from 'react';

const Input = function(props) {
    const {name, type = 'text', placeholder = '', onChange, validation} = props;
    const isTrue = placeholder.includes('song');

    return (
        <div className="input-field">
            {isTrue && <label className="audio-info">Playlist requires at least one song to be added.</label>}
            <input
                className={validation.className}
                id={name}
                name={name}
                type={type}
                placeholder={placeholder || name}
                onChange={onChange}
            />
            {isTrue && <p className="audio-info">Song url must be from <a target="_blank" rel="noopener noreferrer" href="https://soundcloud.com/">soundcloud</a>.
            </p>}
            {validation && <p className="has-error">{validation.errorMessage}</p>}
        </div>
    );
};

export default Input;