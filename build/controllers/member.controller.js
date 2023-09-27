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
const member_service_1 = __importDefault(require("../services/member.service"));
exports.default = {
    addMember(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield member_service_1.default.addMember(req.body);
                return res.status(201).json(Object.assign({}, response));
            }
            catch (error) {
                next(error);
            }
        });
    },
    removeMember(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield member_service_1.default.removeMember(req.params.id);
                return res.status(200).json({
                    success: true,
                    status: "removed",
                });
            }
            catch (error) {
                next(error);
            }
        });
    },
    getMembers(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const members = yield member_service_1.default.getallMembers();
                return res.status(200).json({
                    success: true,
                    members,
                });
            }
            catch (error) {
                next(error);
            }
        });
    },
};
