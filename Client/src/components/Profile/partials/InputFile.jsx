import React from 'react';

const InputFile = function(props) {
    const {name, formData, onChange} = props;

    let fileName = '';

    if (formData) {
        const text = formData.get('file').name;
        fileName = text.substr(0,20-1)+(text.length>20?'...':'');
    }

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
            <label tabIndex="0" htmlFor={name} className={fileName ? "input-file-triggered input-file-trigger" : "input-file-trigger"}>{fileName ? fileName : 'Select a Image File...'}</label>
        </div>
    );
};

export default InputFile;