import servicioModel from "../../models/serviciosModel.js";
import error from "../../helpers/errors.js";

// Obtener todos los servicios
async function getAll() {
    const servicios = await servicioModel.findAll();
    return servicios;
}

// Obtener un servicio por su ID
async function getById(id) {
    const servicio = await servicioModel.findByPk(id);
    if (!servicio) {
        throw new error.NOT_FOUND("Servicio no encontrado");
    }
    return servicio;
}

// Crear un nuevo servicio
async function create(nombre, descripcion, precio, duracion) {
    if (!nombre || !precio || !duracion) {
        throw new error.INVALID_INPUT("Los campos 'nombre', 'precio' y 'duracion' son obligatorios");
    }

    const nuevoServicio = await servicioModel.create({
        nombre,
        descripcion,
        precio,
        duracion,
    });

    return nuevoServicio;
}

// Actualizar un servicio por su ID
async function update(id, nombre, descripcion, precio, duracion) {
    const servicio = await getById(id); // Usa `getById` para verificar si el servicio existe

    // Actualiza solo los campos proporcionados
    servicio.nombre = nombre || servicio.nombre;
    servicio.descripcion = descripcion || servicio.descripcion;
    servicio.precio = precio || servicio.precio;
    servicio.duracion = duracion || servicio.duracion;

    await servicio.save();
    return servicio;
}

// Eliminar un servicio (opcional, si no deseas borrar físicamente)
async function remove(id) {
    const servicio = await getById(id); // Usa `getById` para verificar si el servicio existe
    await servicio.destroy();
    return { message: "Servicio eliminado correctamente" };
}

export const functions = {
    getAll,
    getById,
    create,
    update,
    remove,
};

export default functions;