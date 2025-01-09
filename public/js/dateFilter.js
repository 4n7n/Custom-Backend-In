// Devolver las fechas de inicio y fin para el filtro de gastos y ingresos
function getFilterDates(req) {
    // Verificar si las fechas ya están en la sesión
    let startDate = req.session.startDate;
    let endDate = req.session.endDate;

    // Si las fechas no existen en la sesión, establecerlas
    if (!startDate || !endDate) {
        setFilterDateByMonthAndYear(
            req,
            new Date().getMonth(),
            new Date().getFullYear()
        );
        startDate = req.session.startDate;
        endDate = req.session.endDate;
    }
    return { startDate, endDate };
}

// Establecer las fechas en la sesión para el mes y el año especificados
function setFilterDateByDates(req, startDate, endDate) {
    startDate = new Date(startDate);
    startDate.setHours(1, 0, 0, 0);
    endDate = new Date(endDate);
    endDate.setHours(23, 59, 59, 999);
    // Guardar las fechas en la sesión
    req.session.startDate = startDate.toISOString().slice(0, 16);
    req.session.endDate = endDate.toISOString().slice(0, 16);
    req.session.filterType = "dates";
    return { startDate: req.session.startDate, endDate: req.session.endDate };
}

// Establecer las fechas en la sesión para el mes y el año especificados
function setFilterDateByMonthAndYear(req, month, year) {
    // Calcular el primer y último día del mes
    const firstDayOfMonth = new Date(year, month, 1);
    firstDayOfMonth.setHours(0, 0, 0, 0);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    lastDayOfMonth.setHours(23, 59, 59, 999);
    // Formatear las fechas a "YYYY-MM-DD"
    const formattedFirstDay = firstDayOfMonth.toISOString().slice(0, 16);
    const formattedLastDay = lastDayOfMonth.toISOString().slice(0, 16);

    // Guardar las fechas en la sesión
    req.session.startDate = formattedFirstDay;
    req.session.endDate = formattedLastDay;
    req.session.filterType = "monthly";
    return { startDate: req.session.startDate, endDate: req.session.endDate };
}

// Establecer las fechas en la sesión para el año especificado
function setFilterDateByYear(req, year) {
    // Calcular el primer y último día del año
    const firstDayOfYear = new Date(year, 0, 1);
    firstDayOfYear.setHours(0, 0, 0, 0);
    const lastDayOfYear = new Date(year, 11, 31);
    lastDayOfYear.setHours(23, 59, 59, 999);

    // Formatear las fechas a "YYYY-MM-DD"
    const formattedFirstDay = firstDayOfYear.toISOString().slice(0, 16);
    const formattedLastDay = lastDayOfYear.toISOString().slice(0, 16);

    // Guardar las fechas en la sesión
    req.session.startDate = formattedFirstDay;
    req.session.endDate = formattedLastDay;
    req.session.filterType = "yearly";
    return { startDate: req.session.startDate, endDate: req.session.endDate };
}
export default {
    getFilterDates,
    setFilterDateByMonthAndYear,
    setFilterDateByYear,
    setFilterDateByDates,
};
