"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validate = (schema) => (req, res, next) => {
    try {
        schema.parse({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        return next();
    }
    catch (e) {
        return res.status(400).json({
            status: "error",
            message: e.issues[0].message,
        });
    }
};
exports.default = validate;
