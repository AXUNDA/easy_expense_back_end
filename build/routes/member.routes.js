"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const member_schema_1 = require("../schema/member.schema");
const express_1 = __importDefault(require("express"));
const validateJson_1 = __importDefault(require("../middlewares/validateJson"));
const router = express_1.default.Router();
const validateToken_1 = __importDefault(require("../middlewares/validateToken"));
const member_controller_1 = __importDefault(require("../controllers/member.controller"));
router.use(validateToken_1.default);
router.post("/", (0, validateJson_1.default)(member_schema_1.createMemberSchema), member_controller_1.default.addMember);
router.delete("/:id", member_controller_1.default.removeMember);
router.get("/", member_controller_1.default.getMembers);
exports.default = router;
