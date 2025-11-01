import React from "react";
import Markdown from "react-markdown";
import { useEffect, useRef } from "react";
import type { Message } from "./ChatBot";

type Props = {
  messages: Message[];
};

const ChatMessages = ({ messages }: Props) => {
  const lastMessageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const onCopyMessage = (e: React.ClipboardEvent<HTMLParagraphElement>) => {
    const selection = window.getSelection()?.toString().trim();
    if (selection) {
      e.preventDefault();
      e.clipboardData.setData("text/plain", selection);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      {messages.map((message, index) => (
        <p
          onCopy={onCopyMessage}
          ref={index === messages.length - 1 ? lastMessageRef : null}
          key={index}
          className={`px-3 py-2 rounded-2xl mb-1 ${
            message.role === "user"
              ? "bg-blue-400 text-white self-end"
              : "bg-gray-400 text-black self-start"
          }`}
        >
          <Markdown>{message.content}</Markdown>
        </p>
      ))}
    </div>
  );
};

export default ChatMessages;
