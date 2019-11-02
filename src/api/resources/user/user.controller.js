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
    }
}