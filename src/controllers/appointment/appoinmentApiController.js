import Turno from "../../models/turnosModel.js";

// CRUD
// CREATE, READ, UPDATE, DELETE

// Maneja los errores y responde con un estado 500 y el mensaje de error
function handleError(res, error) {
    res.status(500).json({ error: error.message });
}

// Obtiene todos los turnos
async function getAll(req, res) {
    try {
        const users = await Turno.findAll();
        res.status(200).json(users);
    } catch (error) {
        handleError(res, error);
    }
}

// Obtiene un turno por su ID
async function getById(req, res) {
    try {
        const id = parseInt(req.params.id);
        const user = await Turno.findByPk(id);

        if (!user) {
            return res.status(404).json({ error: "Turno no encontrado" });
        }

        res.status(200).json(user);
    } catch (error) {
        handleError(res, error);
    }
}

// Obtiene un turno por el ID de un usuario
async function getByUser(req, res) {
    try {
        const userId = parseInt(req.params.id); // ID del usuario pasado como parámetro

        // Busca turnos asociados al usuario
        const turnos = await Turno.findAll({
            where: { userId } // Filtra por la clave foránea userId
        });

        if (!turnos || turnos.length === 0) {
            return res.status(404).json({ error: "No se encontraron turnos para este usuario" });
        }

        res.status(200).json(turnos); // Devuelve los turnos encontrados
    } catch (error) {
        handleError(res, error);
    }
}


// Crear un nuevo turno
async function create(req, res) {
    try {
        const { fecha, estado, user_id, servicios_idservicios } = req.body;

        // Validación básica de datos requeridos
        if (!fecha || !estado || !user_id || !servicios_idservicios) {
            return res.status(400).json({ error: "Todos los campos son obligatorios" });
        }

        // Crear el turno en la base de datos
        const nuevoTurno = await Turno.create({
            fecha,
            estado,
            user_id,
            servicios_idservicios,
        });

        res.status(201).json({
            message: "Turno creado exitosamente",
            turno: nuevoTurno,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al crear el turno" });
    }
}


// Actualizar un turno por su ID
async function update(req, res) {
    try {
        const { id } = req.params; // ID del turno a actualizar
        const { fecha, estado, user_id, servicios_idservicios } = req.body;

        // Verificar si el turno existe
        const turno = await Turnos.findByPk(id);

        if (!turno) {
            return res.status(404).json({ error: "Turno no encontrado" });
        }

        // Actualizar el turno con los nuevos datos
        await turno.update({
            fecha: fecha || turno.fecha,
            estado: estado || turno.estado,
            user_id: user_id || turno.user_id,
            servicios_idservicios: servicios_idservicios || turno.servicios_idservicios,
        });

        res.status(200).json({
            message: "Turno actualizado exitosamente",
            turno,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al actualizar el turno" });
    }
}


export const functions = {
    getAll,
    getByUser,
    getById,
    create,
    update,
};

export default functions;
