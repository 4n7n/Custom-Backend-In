import servicesController from "./servicesController.js";

async function getAll(req, res) {
    const servicios = await servicesController.getAll();
    //const isAdmin = req.session.user.rol == "admin";
    return { servicios };
}

async function getById(req, res) {
    const id = parseInt(req.params.id);
    const servicio = await servicesController.getById(id);
    res.render("services/detail", { servicio });
}

async function create(req, res) {
    const { nombre, descripcion, precio, duracion } = req.body;
    await servicesController.create(nombre, descripcion, precio, duracion);
    res.redirect("/dashboard");
}

async function update(req, res) {
    const id = parseInt(req.params.id);
    const { nombre, descripcion, precio, duracion } = req.body;
    await servicesController.update(id, nombre, descripcion, precio, duracion);
    res.redirect("/dashboard");
}

async function remove(req, res) {
    const id = parseInt(req.params.id);
    await servicesController.remove(id);
    res.redirect("/dashboard");
}

// Renderizar la vista de creación
async function renderCreateView(req, res) {
    res.render("services/create", { title: "Crear Turno" });
}

// Renderizar la vista de edición
async function renderUpdateView(req, res) {
    const id = parseInt(req.params.id);
    const servicio = await servicesController.getById(id);
    console.log("vista a punto de renderizarse ")
    res.render("services/update", { servicio, title: "Editar Turno"});
}

export const functions = {
    getAll,
    getById,
    create,
    update,
    remove,
    renderCreateView,
    renderUpdateView
};

export default functions;