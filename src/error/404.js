'use strict';


module.exports = (req, res, next) => {
    res.status(404).json({
        message: "Eroor: not found route",
        code: res.status,
        route: req.baseUrl
    });
}