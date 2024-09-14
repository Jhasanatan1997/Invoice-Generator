const _ = require('lodash');

module.exports = function (err, req, res, next) {
    const myErrorClasses = [
        'InvalidPostData',
        'AuthenticationError',
        'RecordNotFound',
        'NotAuthorized',
        'ValidationError',
        'HTSSOUnprocessedError',
        'DuplicateDataError',
        'InputDataError',
        // 'PartialSuccessError',
        // 'ExpiredLink'
    ];
    const accept = req.headers.accept || '';
    let status, cleanErr;

    // Disable any caching of this response and we'd like the client to try again
    res.set({
        'cache-control': 'no-store',
    });

    if (_.includes(myErrorClasses, err.name)) {
        status = err.status;
        cleanErr = {
            status: err.status,
            message: err.message,
            type: err.name,
            fields: err.fields,
        };
    }else {
        console.log('error ===========', err.stack.toString());
        status = 417;
        cleanErr = {
            status: err.status,
            message: err.message,
            type: err.name,
        };
    }
    res.status(status);
    if (~accept.indexOf('json')) {
        // JSON request
        res.json(cleanErr);
    } else {
        res.type('txt').send(JSON.stringify(cleanErr));
    }
};
