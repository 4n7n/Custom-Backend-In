import turnoController from "./appointmentController.js";
import servicioController from "../services/servicesController.js";
import usuariosController from "../user/userController.js";

async function getAll(req, res) {
    const turnos = await turnoController.getAll();
    const isAdmin = req.session.user.rol == "admin";
    return { turnos, isAdmin };
}

async function getById(req, res) {
    const id = parseInt(req.params.id);
    const turno = await turnoController.getById(id);
    res.render("appointment/detail", { turno });
}

async function getByUser(req, res) {
    const userId = parseInt(req.params.userId);
    const turnos = await turnoController.getByUser(userId);
    res.render("appointment/list", { turnos });
}

async function create(req, res) {
    const { fecha, user_id, servicios_idservicios } = req.body;
    await turnoController.create(fecha, 'Activo', user_id, servicios_idservicios);
    res.redirect("/dashboard");
}

async function update(req, res) {
    const id = parseInt(req.params.id);
    const { fecha, estado, user_id, servicios_idservicios } = req.body;
    await turnoController.update(id, fecha, estado, user_id, servicios_idservicios);
    res.redirect("/dashboard");
}

async function cancel(req, res) {
    const id = parseInt(req.params.id);
    await turnoController.cancel(id);
    res.redirect("/dashboard");
}

async function remove(req, res) {
    const id = parseInt(req.params.id);
    await turnoController.remove(id);
    res.redirect("/dashboard");
}

// Renderizar la vista de creación
async function renderCreateView(req, res) {
    try {
        // Obtener los servicios disponibles
        const servicios = await servicioController.getAll(); // Ajusta esto según tu ORM o consulta
        const usuarios = await usuariosController.getAllNonAdmin(req.session.user.rol); // Ajusta esto según tu ORM o consulta

        // Pasar los servicios a la vista
        res.render("appointment/create", {
            title: "Crear Turno",
            servicios: servicios,
            usuarios: usuarios
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al obtener los servicios");
    }
}

// Renderizar la vista de edición
async function renderUpdateView(req, res) {
    const id = parseInt(req.params.id);
    const turno = await turnoController.getById(id);
    const user = await usuariosController.getById(turno.user_id);
    const servicio = await servicioController.getById(turno.servicios_idservicios)
    console.log("vista a punto de renderizarse")
    res.render("appointment/update", { turno, title: "Editar Turno", usuarios: user, servicios: servicio});
}

export const functions = {
    getAll,
    getById,
    getByUser,
    create,
    update,
    cancel,
    remove,
    renderCreateView,
    renderUpdateView
};

export default functions;