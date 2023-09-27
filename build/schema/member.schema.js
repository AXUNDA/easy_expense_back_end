"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMemberSchema = void 0;
const zod_1 = require("zod");
exports.createMemberSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        email: (0, zod_1.string)({
            required_error: "email is required",
        }).email("a valid email is required"),
    }),
});
