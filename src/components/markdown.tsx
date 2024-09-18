import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function MarkdownRenderer({ children }: { children: string }) {
  return (
    <div className="prose max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          ul: ({ node, ...props }) => (
            <ul className="list-disc pl-6" {...props} />
          ),
          ol: ({ node, ...props }) => (
            <ol className="list-decimal pl-6" {...props} />
          ),
          table: ({ node, ...props }) => (
            <table
              className="border-collapse border border-gray-300"
              {...props}
            />
          ),
          td: ({ node, ...props }) => (
            <td className="border border-gray-300 px-2 py-1" {...props} />
          ),
          th: ({ node, ...props }) => (
            <th
              className="border border-gray-300 px-2 py-1 font-bold"
              {...props}
            />
          ),
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
