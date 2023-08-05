"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validate = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            res.status(422)
                .send(error.details[0].message);
        }
        else {
            next();
        }
    };
};
exports.default = validate;
