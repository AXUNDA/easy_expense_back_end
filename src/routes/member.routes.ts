import { createMemberSchema } from "../schema/member.schema";
import express, { Router } from "express";
import memberService from "../services/member.service";
import validate from "../middlewares/validateJson";
const router: Router = express.Router();
import checkToken from "../middlewares/validateToken";
import { deleteMemberSchema } from "../schema/deleteMemberSchema";

router.use(checkToken);

router.post("/", validate(createMemberSchema), memberService.addMember);
router.delete("/", validate(deleteMemberSchema), memberService.removeMember);
router.get("/", memberService.getallMembers);

export default router;
