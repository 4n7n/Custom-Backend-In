// Establece las fechas del filtro la primera vez que se inicia la sesión
export function initializeSessionDates(req, res, next) {
    if (!req.session.startDate || !req.session.endDate) {
        const today = new Date();
        const firstDayOfMonth = new Date(
            today.getFullYear(),
            today.getMonth(),
            1
        );
        const lastDayOfMonth = new Date(
            today.getFullYear(),
            today.getMonth() + 1,
            0
        );

        // Formatear las fechas a "YYYY-MM-DD"
        req.session.startDate = firstDayOfMonth.toISOString().split("T")[0];
        req.session.endDate = lastDayOfMonth.toISOString().split("T")[0];
        req.session.filterType = "monthly";
    }
    next();
}

export function saveUser(req, res, next) {
    res.locals.user = req.session.user || null;
    next();
}
