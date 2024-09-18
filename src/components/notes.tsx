import { MarkdownRenderer } from "@/components/markdown";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function Notes({ notes }: { notes: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Summary Notes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="prose max-w-none">
          <MarkdownRenderer>{notes}</MarkdownRenderer>
        </div>
      </CardContent>
    </Card>
  );
}
