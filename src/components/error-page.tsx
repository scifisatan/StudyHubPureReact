import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export function ErrorPage(props: { message: string; onRetry: () => void }) {
  return (
    <Card className="m-auto my-6 flex w-full flex-col items-center gap-4 p-6">
      <AlertCircle className="size-10 text-destructive" />
      <h2 className="text-xl font-semibold">Something went wrong!</h2>

      <p className="text-center text-sm text-muted-foreground">
        {props.message}
      </p>

      <Button onClick={props.onRetry}>Try again</Button>
    </Card>
  );
}
