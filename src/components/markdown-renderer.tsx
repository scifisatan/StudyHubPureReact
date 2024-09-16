import ReactMarkdown from "react-markdown";

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="max-w-none rounded border border-muted-foreground p-4 text-foreground">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}
