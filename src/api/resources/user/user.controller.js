import userService from "./user.service";
import User from "./user.model";
export default {
    async signup(req, res) {
        try {
            const { value, error } = userService.validateSignUp(req.body);
            if (error) {
                res.status(400).json(error)
            }
            const user = await User.create(value);
            return res.json(user)
        } catch (error) {
            return res.status(500).send(error)
        }
    },
    async login(req, res) {
        try {
            const { value, error } = userService.validateLogin(req.body);
            if (error) {
                res.status(400).json(error)
            }
            const user = await User.findOne({ email: value.email })
            if (!user) {
                return res.status(401).json({
                    "error": "unauthorized"
                })
            }
            const authorization = await userService.validatePassword(value.password, user.password)
            if(!authorization){
                return res.status(401).json({
                    "error": "unauthorized"
                })
            }
            return res.json(user)
        } catch (error) {
            return res.status(500).send(error)
        }
    }
}