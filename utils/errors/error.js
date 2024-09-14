class AuthenticationError {
    constructor(message) {
        this.name = 'AuthenticationError';
        this.message = message || 'Authentication Required.';
        this.status = 401;
    }
}


class NotAuthorizedError {
    constructor(message) {
        this.name = 'NotAuthorized';
        this.message = message || 'Not Authorized.';
        this.status = 403;
    }
}

class RecordNotFoundError {
    constructor(message) {
        this.name = 'RecordNotFound';
        this.message = message || 'Could not find the requested record.';
        this.status = 404;
    }
}

class ValidationError {
    constructor(message, fields) {
        this.name = 'ValidationError';
        this.message = message || 'Invalid parameters specified.';
        this.fields = fields;
        this.status = 422;
    }
}


class DuplicateDataError {
    constructor(message) {
        this.name = 'DuplicateDataError';
        this.message = message || 'Record Already Exists';
        this.status = 409;
    }
}
class InputDataError {
    constructor(message) {
        this.name = 'InputDataError';
        this.message = message || 'Please provide correct Input';
        this.status = 400;
    }
}

class ExpectationFailedError {
    constructor(message) {
        this.name = 'ExpectationFailed';
        this.message = message || 'Expectation Failed';
        this.status = 417;
    }
}

module.exports = {
    AuthenticationError: AuthenticationError,
    NotAuthorized: NotAuthorizedError,
    RecordNotFound: RecordNotFoundError,
    Validation: ValidationError,
    DuplicateData: DuplicateDataError,
    InputData: InputDataError,
    ExpectationFailed :ExpectationFailedError
};
