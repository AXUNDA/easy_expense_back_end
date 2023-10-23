import express, { Router, Request, Response } from "express";
import authRoutes from "./auth.routes";
import memberRoutes from "./member.routes";

const router: Router = express.Router();

router.use("/auth", authRoutes);

router.use("/members", memberRoutes);
router.get("/", (req: Request, res: Response) => {
  res.json({
    status: "api  active",

    rootRoute: true,
  });
});

export default router;
