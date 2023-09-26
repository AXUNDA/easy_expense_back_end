import memberService from "../services/member.service";
import { Request, Response, NextFunction } from "express";

export default {
  async addMember(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await memberService.addMember(req.body);

      return res.status(201).json({ ...response });
    } catch (error) {
      next(error);
    }
  },
  async removeMember(req: Request, res: Response, next: NextFunction) {
    try {
      await memberService.removeMember(req.body.id);
      return res.status(200).json({
        success: true,
        status: "removed",
      });
    } catch (error) {
      next(error);
    }
  },
  async getMembers(req: Request, res: Response, next: NextFunction) {
    try {
      const members = await memberService.getallMembers();
      return res.status(200).json({
        success: true,
        members,
      });
    } catch (error) {
      next(error);
    }
  },
};
