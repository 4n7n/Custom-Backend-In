import userModel from "../../models/userModel.js";
import error from "../../helpers/errors.js";
import { hashPassword } from "../../config/bcrypt.js";
async function getAll() {
    const users = await userModel.findAll();
    return users;
}

async function getAllNonAdmin(rol) {

    if (rol==='admin') {
        // Filtrar los usuarios cuyo rol no sea "admin"
        const users = await userModel.findAll();
        return users;

    } else {
        const user = await userModel.findByPk(id);
        return user;
    }

}

async function getById(id) {
    const user = await userModel.findByPk(id);
    return user;
}
async function getByEmail(email) {
    const user = await userModel.findOne({ where: { email } });
    return user;
}
async function create(username, email, password) {
    const oldUser = await getByEmail(email);
    if (oldUser) {
        throw new error.EMAIL_ALREADY_EXISTS();
    }
    const hash = await hashPassword(password);
    const newUser = await userModel.create({
        username,
        email,
        password: hash,
    });

    return newUser;
}

async function update(id, username, email, rol, password = null) {
    const user = await userModel.findByPk(id);

    user.username = username;
    user.email = email;
    user.rol = rol;
    if (password) {
        user.password = password;
    }

    await user.save();
    return user;
}

async function deactivate(id) {
    const userToRemove = await userModel.findByPk(id);
    userToRemove.active = 0;
    userToRemove.save();
    return userToRemove;
}
async function activate(id) {
    const userToRemove = await userModel.findByPk(id);
    userToRemove.active = 1;
    userToRemove.save();
    return userToRemove;
}

export const functions = {
    getAll,
    getById,
    getByEmail,
    create,
    update,
    deactivate,
    activate,
    getAllNonAdmin
};
export default functions;
