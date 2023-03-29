import Joi from "joi";

const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().alphanum().min(8).max(15).required(),
    role: Joi.string().valid('admin', 'user').default('user'),
    avatar: Joi.string().empty(""),
});

const validate = (data) => {
    const result = schema.validate(data);
    data.isVerify = true;
    data.createdAt = new Date();
    data.updatedAt = new Date();
    if (data.avatar === '') {
        data.avatar = 'default.png';
    }

    result.value = data;

    return result;
}

export default validate;
