"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const chatController_1 = require("./controllers/chatController");
const router = express_1.default.Router();
router.get("/api/hello", (req, res) => {
    console.log("data fetched");
    res.json({ message: "Hamza" });
});
router.post("/api/chat", chatController_1.chatController.sendMessage);
exports.default = router;
