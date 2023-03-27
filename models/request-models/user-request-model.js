import Joi from "joi";

const schema = Joi.object().keys(
    {
        name: Joi.string().min(3).max(30).required(),
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        username: Joi.string().alphanum().min(3).max(30).required(),
        password: Joi.string().alphanum().min(8).max(15).required(),
        role: Joi.string().valid('admin', 'user'),
        avatar: Joi.string().optional()
    }
);

const validate = (data) => {
    const result = schema.validate(data);
    data.createdAt = new Date();
    data.updatedAt = new Date();
    result.value = data;
    return result;
}

export default validate;
