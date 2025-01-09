import authController from "./authController.js";

async function register(req, res) {
    try {
        const { username, email, password, confirmPassword, rol } = req.body;
        const result = await authController.register(
            username,
            email,
            password,
            confirmPassword,
            rol
        );
        if (result.error) {
            return res.status(result.status).json({ error });
        }
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json(error.message);
    }
}

async function login(req, res) {
    try {
        const { email, password } = req.body;
        const result = authController.login(email, password);
        if (result.error) {
            return res.status(result.status).json({ error });
        }
    } catch (error) {}
}

export default {
    register,
    login,
};
