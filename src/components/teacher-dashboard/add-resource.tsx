import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusIcon } from "lucide-react";
import UploadResourceForm from "@/components/teacher-dashboard/upload-resource-form";
import RecordLectureForm from "@/components/teacher-dashboard/record-lecture-form";

const AddResourceButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeDialog = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="icon" className="rounded-full shadow-lg" onClick={() => setIsOpen(true)}>
          <PlusIcon className="h-8 w-8 text-white" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <Tabs defaultValue="upload">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upload">Upload Resource</TabsTrigger>
            <TabsTrigger value="record">Record Lecture</TabsTrigger>
          </TabsList>
          <TabsContent value="upload">
            <UploadResourceForm closeDialog={closeDialog} />
          </TabsContent>
          <TabsContent value="record">
            <RecordLectureForm closeDialog={closeDialog} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AddResourceButton;