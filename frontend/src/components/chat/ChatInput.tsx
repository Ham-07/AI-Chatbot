import type { KeyboardEvent } from "react";
import { Button } from "../ui/button";
import { FaArrowUp } from "react-icons/fa";
import { useForm } from "react-hook-form";

export type ChatFormData = {
  prompt: string;
};

type Props = {
  onSubmit: (data: ChatFormData) => void;
};
const ChatInput = ({ onSubmit }: Props) => {
  const { register, handleSubmit, reset, formState } = useForm<ChatFormData>();

  const submit = handleSubmit((data) => {
    reset({ prompt: "" });
    onSubmit(data);
  });

  function onKeyDown(e: KeyboardEvent<HTMLFormElement>) {
    if (e.key == "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  }

  return (
    <form
      onSubmit={submit}
      onKeyDown={onKeyDown}
      className="flex flex-col gap-2 items-end border-2 p-2 rounded-3xl"
    >
      <textarea
        {...register("prompt", {
          required: true,
          validate: (data) => data.trim().length > 0,
        })}
        className="w-full focus:outline-0 resize-none"
        placeholder="Ask anything"
        maxLength={1000}
      />
      <Button className="rounded-full w-9 h-9" disabled={!formState.isValid}>
        <FaArrowUp />
      </Button>
    </form>
  );
};

export default ChatInput;
