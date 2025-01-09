import turnoModel from "../../models/turnosModel.js";
import servicioModel from "../../models/serviciosModel.js";
import error from "../../helpers/errors.js";

// Obtener todos los turnos
async function getAll() {
    const turnos = await turnoModel.findAll({
        include: [
            {
                model: servicioModel, // Modelo relacionado
                attributes: ["nombre", "duracion"], // Campos específicos del modelo Servicio
            },
        ]
    });
    return turnos;
}

// Obtener un turno por su ID
async function getById(id) {
    const turno = await turnoModel.findByPk(id);
    if (!turno) {
        throw new error.NOT_FOUND("Turno no encontrado");
    }
    return turno;
}

// Obtener todos los turnos de un usuario específico
async function getByUser(userId) {
    const turnos = await turnoModel.findAll({ where: { user_id: userId } });
    if (!turnos || turnos.length === 0) {
        throw new error.NOT_FOUND("No se encontraron turnos para este usuario");
    }
    return turnos;
}

async function create(fecha, estado, user_id, servicios_idservicios) {
    if (!fecha || !estado || !user_id || !servicios_idservicios) {
        throw new error.INVALID_INPUT("Todos los campos son obligatorios");
    }

    // Crear un objeto Date a partir de la fecha recibida
    const fechaAux = new Date(fecha);

    // Aumentar una hora a la fecha
    fechaAux.setHours(fechaAux.getHours() + 2);

    // Convertir la fecha modificada a formato ISO 8601
    const fechaFinal = fechaAux.toISOString().slice(0, 19); // Excluyendo los milisegundos

    console.log("Fechita final: "+fechaFinal)

    const nuevoTurno = await turnoModel.create({
        fecha: fechaFinal,  // Usamos la fecha con la hora añadida
        estado,
        user_id,
        servicios_idservicios,
    });

    return nuevoTurno;
}
// Actualizar un turno por su ID
async function update(id, fecha, estado, user_id, servicios_idservicios) {
    const turno = await getById(id); // Usa `getById` para verificar si el turno existe

    // Si se proporciona una fecha, aumenta una hora antes de asignarla
    if (fecha) {
        const fechaAux = new Date(fecha);
        fechaAux.setHours(fechaAux.getHours() + 2); // Aumenta una hora
        turno.fecha = fechaAux.toISOString().slice(0, 19); // Asigna la fecha modificada
    }

    // Actualiza solo los campos proporcionados
    turno.estado = estado || turno.estado;
    turno.user_id = user_id || turno.user_id;
    turno.servicios_idservicios = servicios_idservicios || turno.servicios_idservicios;

    await turno.save();
    return turno;
}

// Cambiar el estado de un turno a "cancelado"
async function cancel(id) {
    const turno = await getById(id); // Usa `getById` para verificar si el turno existe
    turno.estado = "cancelado";
    await turno.save();
    return turno;
}

// Eliminar un turno (opcional, si no deseas borrar físicamente)
async function remove(id) {
    const turno = await getById(id); // Usa `getById` para verificar si el turno existe
    await turno.destroy();
    return { message: "Turno eliminado correctamente" };
}

export const functions = {
    getAll,
    getById,
    getByUser,
    create,
    update,
    cancel,
    remove,
};

export default functions;