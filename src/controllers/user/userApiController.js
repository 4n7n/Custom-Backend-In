import User from "../../models/userModel.js";

// Maneja los errores y responde con un estado 500 y el mensaje de error
function handleError(res, error) {
    res.status(500).json({ error: error.message });
}

// Obtiene todos los usuarios
async function getAll(req, res) {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        handleError(res, error);
    }
}

// Obtiene un usuario por su ID
async function getById(req, res) {
    try {
        const id = parseInt(req.params.id);
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        res.status(200).json(user);
    } catch (error) {
        handleError(res, error);
    }
}

// Crea un nuevo usuario
async function create(req, res) {
    try {
        const { username, email, password, rol } = req.body;
        const newUser = await User.create({
            username,
            email,
            password,
            rol,
        });

        res.status(201).json(newUser);
    } catch (error) {
        handleError(res, error);
    }
}

// Edita un usuario por su ID
async function update(req, res) {
    try {
        const id = parseInt(req.params.id);
        const { username, email, password, rol } = req.body;

        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        // Actualiza los campos del usuario
        await user.update({
            username,
            email,
            password,
            rol,
        });

        res.status(200).json(user);
    } catch (error) {
        handleError(res, error);
    }
}

// Desactiva un usuario por su ID (establece active a 0)
async function deactivate(req, res) {
    try {
        const id = parseInt(req.params.id);
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        // Establece active a 0 para desactivar el usuario
        await user.update({ active: 0 });

        res.status(200).json({ message: "Usuario desactivado correctamente" });
    } catch (error) {
        handleError(res, error);
    }
}

export const functions = {
    getAll,
    getById,
    create,
    update,
    deactivate,
};

export default functions;
