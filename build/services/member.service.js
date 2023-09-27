"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Member_model_1 = __importDefault(require("../models/Member.model"));
const custom_error_1 = __importDefault(require("../errors/custom_error"));
exports.default = {
    addMember(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newMember = yield Member_model_1.default.create({
                    email: dto.email,
                });
                return newMember.toJSON();
            }
            catch (error) {
                if (error.code == "11000") {
                    throw new custom_error_1.default("member already exists", 409);
                }
                else {
                    throw new custom_error_1.default(error.message, 500);
                }
            }
        });
    },
    removeMember(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield Member_model_1.default.findByIdAndDelete(dto);
                return;
            }
            catch (error) {
                throw new custom_error_1.default(error.message, 500);
            }
        });
    },
    getallMembers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield Member_model_1.default.find({});
            }
            catch (error) {
                throw new custom_error_1.default(error.message, 500);
            }
        });
    },
};
