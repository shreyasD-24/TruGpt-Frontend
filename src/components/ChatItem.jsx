import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";

function extractCodeFromString(message) {
  if (message.includes("```")) {
    const blocks = message.split("```");
    return blocks;
  }
}

function isCodeBlock(str) {
  if (
    str.includes(";") ||
    str.includes("{") ||
    str.includes("}") ||
    str.includes("[") ||
    str.includes("]") ||
    str.includes("=") ||
    str.includes("//") ||
    str.includes("#")
  ) {
    return true;
  }
  return false;
}

const ChatItem = ({ content, role }) => {
  const messageBlocks = extractCodeFromString(content);
  return role === "model" ? (
    <div className="flex p-4 bg-[#004d5612] gap-2">
      {!messageBlocks && <div className="text-sm">{content}</div>}
      {messageBlocks &&
        messageBlocks.length &&
        messageBlocks.map((block) =>
          isCodeBlock(block) ? (
            <SyntaxHighlighter
              style={coldarkDark}
              language={block.split(" ")[0]}
              wrapLongLines={true}
              className="text-xs"
            >
              {block}
            </SyntaxHighlighter>
          ) : (
            <>
              <div className="text-sm">{block}</div>
            </>
          )
        )}
    </div>
  ) : (
    <div className="flex p-4 bg-[#004d56] gap-2 rounded-xl">
      <div className="inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-black rounded-full">
        <span className="font-medium text-white">U</span>
      </div>
      <div className="text-md">{content}</div>
    </div>
  );
};

export default ChatItem;
