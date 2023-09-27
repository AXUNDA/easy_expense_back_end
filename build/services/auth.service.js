"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const custom_error_1 = __importDefault(require("../errors/custom_error"));
const User_model_1 = __importDefault(require("../models/User.model"));
const argon = __importStar(require("argon2"));
const lodash_1 = require("lodash");
exports.default = {
    sign(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield jsonwebtoken_1.default.sign(data, process.env.jwt_key, {
                expiresIn: "3d",
            });
        });
    },
    verify(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield jsonwebtoken_1.default.verify(token, process.env.jwt_key);
            }
            catch (error) {
                throw new custom_error_1.default("un-authorized", 409);
            }
        });
    },
    login(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield User_model_1.default.findOne({ email: dto.email });
                const status = yield argon.verify(user.password, dto.password);
                if (status) {
                    const token = yield this.sign((0, lodash_1.omit)(user.toJSON(), "password"));
                    return Object.assign({ token }, (0, lodash_1.omit)(user.toJSON(), "password"));
                }
            }
            catch (error) {
                throw new custom_error_1.default(error.message, 500);
            }
        });
    },
    signup(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const hash = yield argon.hash(dto.password);
                const newUser = yield User_model_1.default.create({
                    email: dto.email,
                    password: hash,
                });
                delete newUser.password;
                const token = yield this.sign(newUser.toJSON());
                return Object.assign({ token }, (0, lodash_1.omit)(newUser.toJSON(), "password"));
            }
            catch (error) {
                console.log(error);
                if (error.code == "11000") {
                    throw new custom_error_1.default("user already exists", 409);
                }
                else {
                    throw new custom_error_1.default(error.message, 500);
                }
            }
        });
    },
};
