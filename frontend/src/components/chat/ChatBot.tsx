import axios from "axios";
import ChatMessages from "./ChatMessages";
import TypingIndicator from "./TypingIndicator";
import { useRef, useState } from "react";
import type { ChatFormData } from "./ChatInput";
import ChatInput from "./ChatInput";

type ChatResponse = {
  message: string;
};

export type Message = {
  content: string;
  role: "user" | "bot";
};

const ChatBot = () => {

  const conversationId = useRef(crypto.randomUUID());
  const [error, setError] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isBotTyping, setIsBotTyping] = useState(false);

  async function onSubmit({ prompt }: ChatFormData) {
    try {
      setMessages((prev) => [...prev, { content: prompt, role: "user" }]);
      setError("");
  
      setIsBotTyping(true);
      const { data } = await axios.post<ChatResponse>(`https://ai-chatbot-ebon-five.vercel.app/api/chat`, {
        prompt,
        conversationId: conversationId.current,
      });
      setMessages((prev) => [...prev, { content: data.message, role: "bot" }]);

      setIsBotTyping(false);
    } catch (error) {
      setError("Something went wrong,try again!");
    } finally {
      setIsBotTyping(false);
    }
  }

  return (
    <div className="flex flex-col h-full ">
      <div className="flex flex-col flex-1 gap-2 overflow-y-scroll">
        <ChatMessages messages={messages} />
        {isBotTyping && <TypingIndicator />}
        {error && <p className="text-red-500">{error}</p>}
      </div>
      <ChatInput onSubmit={onSubmit} />
    </div>
  );
};

export default ChatBot;
