"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMemberSchema = void 0;
const zod_1 = require("zod");
exports.deleteMemberSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        id: (0, zod_1.string)({
            required_error: "id is required",
        }),
    }),
});
