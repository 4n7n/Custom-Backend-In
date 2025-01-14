function isAuthenticated(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.redirect("/login");
    }
}

function isAdmin(req, res, next) {
    if (req.session.user && req.session.user.rol === "admin") {
        next();
    } else {
        res.redirect("/login");
    }
}

export { isAuthenticated, isAdmin };
