import ReactMarkdown from 'react-markdown'

interface MarkdownRendererProps {
  content: string
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className=" max-w-none border border-muted-foreground text-foreground p-4 rounded ">
      <ReactMarkdown>
        {content}
      </ReactMarkdown>
    </div>
  )
}