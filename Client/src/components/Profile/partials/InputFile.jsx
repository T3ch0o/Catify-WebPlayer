import React from 'react';

const InputFile = function(props) {
    const {name, onChange} = props;

    return (
        <div className="input-field">
            <label className="audio-info">Image file format must be: jpg, png or jpeg.</label>
            <input
                className="input-file"
                id={name}
                name={name}
                type="file"
                onChange={onChange}
            />
            <label tabIndex="0" htmlFor={name} className="input-file-trigger">Select a Image File...</label>
        </div>
    );
};

export default InputFile;