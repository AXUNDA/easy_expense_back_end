"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const MemberSchema = new mongoose_1.Schema({
    email: { type: String, required: true, unique: true },
}, { timestamps: true });
const Member = (0, mongoose_1.model)("Member", MemberSchema);
exports.default = Member;
