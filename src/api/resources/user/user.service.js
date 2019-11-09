import Joi from 'joi'
import bcrypt from 'bcryptjs'
export default {
    encrypt(plaintext) {
        const salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(plaintext, salt)
    },
    validatePassword(plainText, encryptedPassword) {
        console.log("params",plainText,encryptedPassword)
        return bcrypt.compareSync(plainText, encryptedPassword)
    },
    validateSignUp(body) {
        const schema = Joi.object().keys({
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required()
        });
        const { value, error } = Joi.validate(body, schema);
        if (error) {
            return { error }
        }
        value.password = this.encrypt(value.password)
        return { value }
    },
    validateLogin(body) {
        const schema = Joi.object().keys({
            email: Joi.string().email().required(),
            password: Joi.string().required()
        });
        const { value, error } = Joi.validate(body, schema);
        if (error) {
            return { error }
        }
        return { value }
    }
}