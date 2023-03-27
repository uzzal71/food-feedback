import authValidate from "./auth-request";
import userValidate from "./user-request-model";
import postValidate from "./post-request-model";

const validators = {
    authValidate: authValidate,
    userSchemaValidate: userValidate,
    postSchemaValidate: postValidate
};

export default validators;
