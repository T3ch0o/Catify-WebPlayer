import React from 'react';

const Input = function(props) {
    const {name, type = 'text', value, placeholder = '', onChange, validation} = props;

    return (
        <div className="input-field">
            <input
                className={validation.className}
                id={name}
                name={name}
                type={type}
                placeholder={placeholder || name}
                onChange={onChange}
                value={value}
            />
            {validation && <p className="has-error">{validation.errorMessage}</p>}
        </div>
    );
};

export default Input;