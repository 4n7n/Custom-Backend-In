import userController from "../user/userController.js";
import { verifyPassword } from "../../config/bcrypt.js";
import error from "../../helpers/errors.js";

async function register(username, email, password, passwordConfirm) {
    if (password != passwordConfirm) {
        throw new error.PASSWORD_NOT_MATCH();
    }
    const oldUser = await userController.getByEmail(email);
    if (oldUser) {
        throw new error.EMAIL_ALREADY_EXISTS();
    }
    const newUser = await userController.create(username, email, password);
    return newUser;
}

async function login(email, password) {
    const user = await userController.getByEmail(email);
    if (!user) {
        throw new error.USER_NOT_FOUND();
    }
    debugger
    const verified = await verifyPassword(password, user.password);
    if (!verified) {
        throw new error.INVALID_CREDENTIALS();
    }
    if (user.active === 0) {
        throw new error.USER_NOT_ACTIVE();
    }
    return user;
}

export default {
    register,
    login,
};
