import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Resource } from "@/types";
import { Trash } from "lucide-react";
import { toast } from "sonner";
import { useResourceStore } from "@/stores/resourceStore";

const DeleteButton = ({ resource }: { resource: Resource }) => {
  const removeResource = useResourceStore((state) => state.removeResource);

  const handleDeleteResource = async (id: number) => {
    try {
      removeResource(id);
      toast.success("Resource is deleted successfully");
      console.log(`resource ${id} is deleted`);
    } catch (error: any) {
      console.error("Error deleting resource:", error);
      toast.error("Failed to delete resource. Please try again.");
    }
  };


 

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">
          <Trash className="mr-2 h-4 w-4" />
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            resource.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => resource.id && handleDeleteResource(resource.id)}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteButton;
