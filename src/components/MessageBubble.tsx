import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import type { MessageBubbleProps } from '../interfaces/FormInterfaces';

function MessageBubble({ message, role }: MessageBubbleProps) {

  const isUser = role === "user";

  return (
    <div
      className={`
        flex
        w-full
        mb-6
        ${isUser ? "justify-end" : "justify-start"}
      `}
    >

      <div
        className={`
          max-w-3xl
          px-4
          py-3
          rounded-2xl
          text-sm
          leading-relaxed

          ${
            isUser
              ? "bg-zinc-700 text-white rounded-br-sm"
              : "bg-zinc-900 text-zinc-200 rounded-bl-sm"
          }
        `}
      >
        <div className="prose prose-invert max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {message}
          </ReactMarkdown>
        </div>
      </div>

    </div>
  );
}

export default MessageBubble;