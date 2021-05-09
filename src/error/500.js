'use strict';

module.exports = (err, req, res, next) => {
    res.status(500).json({
        error: 'Server Error',
        message: err.message,
        path: req.path
    });
}