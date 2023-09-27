import { createMemberSchema } from "../schema/member.schema";
import express, { Router } from "express";

import validate from "../middlewares/validateJson";
const router: Router = express.Router();
import checkToken from "../middlewares/validateToken";

import memberController from "../controllers/member.controller";

router.use(checkToken);

router.post("/", validate(createMemberSchema), memberController.addMember);
router.delete("/:id", memberController.removeMember);
router.get("/", memberController.getMembers);

export default router;
