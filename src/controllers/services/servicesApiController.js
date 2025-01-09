import Servicios from "../../models/serviciosModel.js";

// Maneja los errores y responde con un estado 500 y el mensaje de error
function handleError(res, error) {
    res.status(500).json({ error: error.message });
}

// Obtiene todos los servicios
async function getAll(req, res) {
    try {
        const servicios = await Servicios.findAll();
        res.status(200).json(servicios);
    } catch (error) {
        handleError(res, error);
    }
}

// Obtiene un servicio por su ID
async function getById(req, res) {
    try {
        const id = parseInt(req.params.id, 10); // Asegura que el ID sea un número entero
        const servicio = await Servicios.findByPk(id);

        if (!servicio) {
            return res.status(404).json({ error: "Servicio no encontrado" });
        }

        res.status(200).json(servicio);
    } catch (error) {
        handleError(res, error);
    }
}

// Crear un nuevo servicio
async function create(req, res) {
    try {
        const { nombre, descripcion, precio, duracion } = req.body;

        // Validación básica de datos requeridos
        if (!nombre || !precio || !duracion) {
            return res.status(400).json({ error: "Los campos 'nombre', 'precio' y 'duracion' son obligatorios" });
        }

        // Crear el servicio en la base de datos
        const nuevoServicio = await Servicios.create({
            nombre,
            descripcion,
            precio,
            duracion,
        });

        res.status(201).json({
            message: "Servicio creado exitosamente",
            servicio: nuevoServicio,
        });
    } catch (error) {
        handleError(res, error);
    }
}

// Actualizar un servicio por su ID
async function update(req, res) {
    try {
        const id = parseInt(req.params.id, 10); // Asegura que el ID sea un número entero
        const { nombre, descripcion, precio, duracion } = req.body;

        // Verificar si el servicio existe
        const servicio = await Servicios.findByPk(id);

        if (!servicio) {
            return res.status(404).json({ error: "Servicio no encontrado" });
        }

        // Actualizar el servicio con los nuevos datos
        await servicio.update({
            nombre: nombre || servicio.nombre,
            descripcion: descripcion || servicio.descripcion,
            precio: precio || servicio.precio,
            duracion: duracion || servicio.duracion,
        });

        res.status(200).json({
            message: "Servicio actualizado exitosamente",
            servicio,
        });
    } catch (error) {
        handleError(res, error);
    }
}

// Eliminar un servicio por su ID
async function remove(req, res) {
    try {
        const id = parseInt(req.params.id, 10); // Asegura que el ID sea un número entero

        // Verificar si el servicio existe
        const servicio = await Servicios.findByPk(id);

        if (!servicio) {
            return res.status(404).json({ error: "Servicio no encontrado" });
        }

        // Eliminar el servicio
        await servicio.destroy();

        res.status(200).json({
            message: "Servicio eliminado exitosamente",
        });
    } catch (error) {
        handleError(res, error);
    }
}

export const functions = {
    getAll,
    getById,
    create,
    update,
    remove,
};

export default functions;