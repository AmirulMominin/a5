"use client";

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
import { Trash2 } from "lucide-react";
import { deleteProperty } from "../../_actions/landloardActions";
import { toast } from "sonner";
import { useState } from "react";

interface DeletePropertyButtonProps {
  propertyId: string;
}

const DeletePropertyButton = ({
  propertyId,
}: DeletePropertyButtonProps) => {

const [open, setOpen] = useState(false);
  const handleDelete = async() => {
    
    const result = await deleteProperty(propertyId)
    console.log("line 29",result)
    if(result){
        setOpen(false)
        toast.success("Delete property successfully")
    }else if(!result){
        toast.error("Something went wrong")
    }

    // Later:
    // call your DELETE API here
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger >
        <Button variant="destructive">
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete this property?
          </AlertDialogTitle>

          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete
            the property from your account.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>
            No
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={handleDelete}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Yes, Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeletePropertyButton;