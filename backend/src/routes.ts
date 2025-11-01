import express from "express";
import type { Request, Response } from "express";
import { chatController } from "./controllers/chatController";




const router=express.Router();


router.get("/api/hello", (req: Request, res: Response) => {
  console.log("data fetched");
  res.json({ message: "Hamza" });
});


router.post("/api/chat", chatController.sendMessage);

export default router;