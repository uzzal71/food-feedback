import Joi from "joi";

const schema = Joi.object().keys(
    {
        title: Joi.string().min(10).max(50).required(),
        body: Joi.string().required(),
        location: Joi.string().empty(""),
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
