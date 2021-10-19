const passRouteParams = (req, res, next) => {
    res.locals.params = req.params;
    next();
}

module.exports = { passRouteParams: passRouteParams }