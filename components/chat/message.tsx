import { MessageI } from "@/types/collections";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

import "highlight.js/styles/github-dark.css";
import { Clipboard } from "lucide-react";
import { useRef } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import rehypeHighlight from "rehype-highlight";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const Message = ({ message }: { message: MessageI }) => {
  const isAssistant = message.role === "assistant";
  const codeRef = useRef<HTMLElement>(null);
  return (
    <div
      className={
        !isAssistant
          ? "dark:bg-neutral-950/60 last:pb-40"
          : "dark:bg-neutral-900 last:pb-40"
      }
    >
      {/* Container */}
      <div className="flex w-full max-w-3xl gap-4 px-8 py-10 mx-auto">
        {/* Avatar */}
        <Avatar className="outline outline-2 outline-offset-2 dark:outline-neutral-700 outline-neutral-200">
          <AvatarImage
            src={!isAssistant ? "/user-avatar.png" : "/makr.-avatar.png"}
          />
          <AvatarFallback>{!isAssistant ? "YOU" : "AI"}</AvatarFallback>
        </Avatar>
        {/* Message */}
        <div className="w-full max-w-full mt-2">
          <ReactMarkdown
            className="markdown"
            components={{
              code: ({ children, inline, className }) => {
                const language = className?.split("-")[1];
                if (inline)
                  return (
                    <span className="px-2 py-1 text-sm rounded-md dark:bg-neutral-800">
                      {children}
                    </span>
                  );
                return (
                  <div className="w-full my-4">
                    {/* Code Title */}
                    <div className="bg-[#0d111780] rounded-t-md py-2 px-3 text-xs flex items-center justify-between">
                      <div>{language ?? "javascript"}</div>
                      {/* Copy code to the clipboard */}
                      <CopyToClipboard
                        text={codeRef?.current?.innerText as string}
                      >
                        <button className="flex items-center gap-1">
                          <Clipboard size="14" />
                          Copy Code
                        </button>
                      </CopyToClipboard>
                    </div>
                    <code
                      ref={codeRef}
                      className={
                        className ??
                        "hljs language-javascript" +
                          " rounded-b-md overflow-x-scroll"
                      }
                    >
                      {children}
                    </code>
                  </div>
                );
              },
            }}
            rehypePlugins={[rehypeHighlight]}
            /* remarkPlugins={[remarkGfm]} */
          >
            {message.content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default Message;