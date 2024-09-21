import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Resource } from "@/types";
import { MoreVertical } from "lucide-react";
import DeleteButton from "./delete-button";

interface MoreOptionsProps {
  resource: Resource;
}

const MoreOptions: React.FC<MoreOptionsProps> = ({ resource }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DeleteButton resource={resource} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MoreOptions;
