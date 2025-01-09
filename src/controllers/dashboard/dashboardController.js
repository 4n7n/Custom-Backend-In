import turnoController from "../appointment/appointmentViewController.js";
import servicesController from "../services/servicesViewController.js";

import { format } from "date-fns";
import { es } from "date-fns/locale";

export const getDashboard = async (req, res) => {
    try {
        const { turnos, isAdmin } = await turnoController.getAll(req); // Si necesitas isAdmin
        const { servicios } = await servicesController.getAll(req);

        turnos.forEach((turno) => {
            let fecha;
            // Validar si la fecha ya es un objeto Date
            if (typeof turno.fecha === "string") {
                // Convertir desde string
                fecha = new Date(turno.fecha);
            } else if (turno.fecha instanceof Date) {
                // Ya es un objeto Date
                fecha = turno.fecha;
            } else {
                throw new Error(`Formato de fecha desconocido: ${turno.fecha}`);
            }

            var fechaAux = fecha;
            fechaAux.setHours(fechaAux.getHours() - 1);

            // Formatear la fecha
            turno.fechaFormateada = format(fechaAux, "EEEE, d 'de' MMMM 'de' yyyy - h:mm a", { locale: es });
        });

        res.render("dashboard/dashboard", {
            title: "Panel General",
            servicios,
            turnos,
        });
    } catch (error) {
        console.error("Error al obtener los turnos:", error);
        res.status(500).send("Error al cargar el dashboard.");
    }
};