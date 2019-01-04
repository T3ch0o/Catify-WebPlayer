const validationFunc = function(values) {
    const validUsername = function() {
        const username = values.username;
        let className = '';
        let errorMessage = '';
        let isValid = true;

        if (username.length <= 3 && username.length >= 1 ) {
            className = 'is-invalid';
            errorMessage = 'Catify username is too short.';
            isValid = false;
        } else if (!username) {
            className = 'is-invalid';
            errorMessage = 'Please enter your Catify username.';
            isValid = false;
        }

        return {
            className,
            errorMessage,
            isValid
        };
    };

    const validEmail = function() {
        const email = values.email;
        let mailRegex = new RegExp(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
        let className = '';
        let errorMessage = '';
        let isValid = true;

        if (!mailRegex.test(email)) {
            className = 'is-invalid';
            errorMessage = 'Please enter a valid email.';
            isValid = false;
        }

        return {
            className,
            errorMessage,
            isValid
        };
    };

    const validPassword = function() {
        const password = values.password;
        let className = '';
        let errorMessage = '';
        let isValid = true;

        if (password.length <= 3 && password.length >= 1) {
            className = 'is-invalid';
            errorMessage = 'Your password is too short.';
            isValid = false;
        } else if (!password) {
            className = 'is-invalid';
            errorMessage = 'Please enter your password.';
            isValid = false;
        }

        return {
            className,
            errorMessage,
            isValid
        };
    };

    const validRepeatPassword = function() {
        const { password, repeatPassword } = values;
        let className = '';
        let errorMessage = '';
        let isValid = true;

        if (!password || !repeatPassword) {
            className = 'is-invalid';
            errorMessage = 'Please repeat your password.';
            isValid = false;
        } else if (password !== repeatPassword && repeatPassword) {
            className = 'is-invalid';
            errorMessage = "Passwords doesn't match.";
            isValid = false;
        }

        return {
            className,
            errorMessage,
            isValid
        };
    };

    const validLoginUsername = function() {
        const username = values.username;
        let className = '';
        let errorMessage = '';
        let isValid = true;

        if (!username) {
            className = 'is-invalid';
            errorMessage = 'Please enter your username.';
            isValid = false;
        }

        return {
            className,
            errorMessage,
            isValid
        };
    };

    const validLoginPassword = function() {
        const password = values.password;
        let className = '';
        let errorMessage = '';
        let isValid = true;

        if (!password) {
            className = 'is-invalid';
            errorMessage = 'Please enter your password.';
            isValid = false;
        }

        return {
            className,
            errorMessage,
            isValid
        };
    };

    const validTitle = function() {
        const title = values.title;
        let className = '';
        let errorMessage = '';
        let isValid = true;

        if (!title) {
            className = 'is-invalid';
            errorMessage = 'Please enter your playlist title.';
            isValid = false;
        } else if (title.length < 4 || title.length > 16) {
            className = 'is-invalid';
            errorMessage = 'Title must be between 4 and 16 characters.';
            isValid = false;
        }

        return {
            className,
            errorMessage,
            isValid
        };
    };

    const validSongUrl = function() {
        const songUrl = values.songUrl;
        let songRegex = new RegExp(
            /((https:\/\/)|(http:\/\/)|(www.)|(m\.)|(\s))+(soundcloud.com\/)+[a-zA-Z0-9\-.]+(\/)+[a-zA-Z0-9\-.]+/
        );
        let className = '';
        let errorMessage = '';
        let isValid = true;

        if (!songRegex.test(songUrl)) {
            className = 'is-invalid';
            errorMessage = 'Please enter a valid song url.';
            isValid = false;
        }

        return {
            className,
            errorMessage,
            isValid
        };
    };

    const validTags = function() {
        const tags = values.tags;
        let tagsRegex = new RegExp(
            /(?:\w+,)*\w+/
        );
        let className = '';
        let errorMessage = '';
        let isValid = true;

        if (!tagsRegex.test(tags) && tags.length >= 1) {
            className = 'is-invalid';
            errorMessage = 'Multiple Tags must be separated with comma.';
            isValid = false;
        }

        return {
            className,
            errorMessage,
            isValid
        };
    };

    return {
        validUsername,
        validEmail,
        validPassword,
        validRepeatPassword,
        validLoginUsername,
        validLoginPassword,
        validTitle,
        validSongUrl,
        validTags
    }
};

export default validationFunc;