import userController from "./userController.js";

async function getAll(req, res) {
    const users = await userController.getAll();
    const isAdmin = req.session.user.rol == "admin";
    if (isAdmin) {
        res.render("user/userAdministrator", { users, isAdmin });
    } else {
        res.redirect("/transaction");
    }
}

async function getById(req, res) {
    const id = parseInt(req.params.id);
    const user = await userController.getById(id);
    res.render("user/list", { user });
}

async function create(req, res) {
    const { username, email, rol, password } = req.body;
    await userController.create(username, email, rol, password);
    res.redirect("/user");
}

async function update(req, res) {
    const { username, email, rol, password } = req.body;
    const id = parseInt(req.params.id);
    await userController.update(id, username, email, rol, password);
    res.redirect("/user/" + id);
}

async function deactivate(req, res) {
    const id = parseInt(req.params.id);
    await userController.deactivate(id);
    res.redirect("/user");
}

async function activate(req, res) {
    const id = parseInt(req.params.id);
    await userController.activate(id);
    res.redirect("/user");
}

export const functions = {
    getAll,
    getById,
    create,
    update,
    deactivate,
    activate,
};
export default functions;
