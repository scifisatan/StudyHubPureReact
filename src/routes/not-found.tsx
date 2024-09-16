import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CircleX } from "lucide-react";

export function NotFound() {
  return (
    <Card className="m-auto my-6 flex max-w-md flex-col items-center gap-4 p-6">
      <CircleX className="size-10 text-destructive" />
      <h2 className="text-xl font-semibold">404: Not found</h2>

      <Button asChild>
        <Link to="/">Home</Link>
      </Button>
    </Card>
  );
}
