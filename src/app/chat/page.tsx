"use client";

import { Fragment, useState } from "react";
import { useChat } from "@ai-sdk/react";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Message, MessageContent } from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputBody,
  type PromptInputMessage,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputTools,
} from "@/components/ai-elements/prompt-input";

export default function Page() {
  return (
    <div className="max-w-4xl mx-auto p-6 relative size-full h-[calc(100hv)]">
      <div className="flex flex-col h-full">
        <Conversation className="h-full">
          <ConversationContent>Message will go here</ConversationContent>
          <ConversationScrollButton />
        </Conversation>
        <PromptInput className="mt-4">
          <PromptInputBody>
            <PromptInputTextarea />
          </PromptInputBody>
          <PromptInputTools>
            <PromptInputSubmit />
          </PromptInputTools>
        </PromptInput>
      </div>
    </div>
  );
}
