import { conversationRepository } from "../repositories/conversation.repository";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();
const ai = new GoogleGenAI({});

type ChatResponse = {
  message: string | undefined;
};

export const chatService = {
  async sendMessage(
    prompt: string,
    conversationId: string
  ): Promise<ChatResponse> {
    const previousMessage =
      conversationRepository.getLastResponseId(conversationId) ?? "Hello";

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
    conversationRepository.setLastResponseId(conversationId, prompt);
    return {
      message: response.text,
    };
  },
};
