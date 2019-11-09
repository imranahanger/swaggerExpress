import userService from "./user.service";
import User from "./user.model";
import jwt from "../../helpers/jwt";
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
            if (!authorization) {
                return res.status(401).json({
                    "error": "unauthorized"
                })
            }
            const token = jwt.issue({ id: user._id }, '1d')
            return res.json({ token })
        } catch (error) {
            console.log(error.message)
            return res.status(500).send(error)
        }
    }
}