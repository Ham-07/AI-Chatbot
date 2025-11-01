"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatService = void 0;
const conversation_repository_1 = require("../repositories/conversation.repository");
const genai_1 = require("@google/genai");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const ai = new genai_1.GoogleGenAI({});
exports.chatService = {
    async sendMessage(prompt, conversationId) {
        const previousMessage = conversation_repository_1.conversationRepository.getLastResponseId(conversationId) ?? "Hello";
        const chat = ai.chats.create({
            model: "gemini-2.5-flash",
            history: [
                {
                    role: "user",
                    parts: [{ text: previousMessage }],
                },
                {
                    role: "model",
                    parts: [{ text: "Great to meet you. What would you like to know?" }],
                },
            ],
        });
        const response = await chat.sendMessage({
            message: prompt,
        });
        conversation_repository_1.conversationRepository.setLastResponseId(conversationId, prompt);
        return {
            message: response.text,
        };
    },
};
