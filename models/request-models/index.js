import userValidate from "./user-request-model";
import postValidate from "./user-request-model";

const validators = { 
    userSchemaValidate: userValidate, 
    postSchemaValidate: postValidate 
};

export default validators;