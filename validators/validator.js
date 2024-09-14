const errors = require('../utils/errors/error');


function validateSchema(dataToValidate, schema) {
    return new Promise((resolve) => {
        const { error, value } = schema.validate(dataToValidate);
        const valid = error == null;

        if (valid) {
            return resolve(value);
        }
        const { details } = error;
        const message = details.map((i) => i.message).join(',');

        throw new errors.Validation(message);
    });
}

module.exports = {
    validateSchema,
};