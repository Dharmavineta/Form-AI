"use client";
import { aiGenerate, createForm } from "@/actions/server-actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Plus, Sparkles } from "lucide-react";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { changeLoadingState } from "@/store";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function CreateForm() {
  const { user } = useUser();
  const [open, setOpen] = useState(false);
  const [userInput, setUserInput] = useState<string>("");
  const { isLoading, setIsLoading } = changeLoadingState();
  const router = useRouter();

  const onCreate = async () => {
    try {
      setIsLoading(true);
      const result = await aiGenerate(userInput);
      if (result) {
        const formId = await createForm(
          JSON.stringify(result.form, null, 2),
          user?.firstName || ""
        );
        //  toast.promise(
        //   async () => {
        //     return await createForm(
        //       JSON.stringify(result.form, null, 2),
        //       user?.firstName || user?.fullName || ""
        //     );
        //   },
        //   {
        //     loading: "Creating form...",
        //     success: "Form created Successfully",
        //     error: "Failed to create form",
        //   }
        // );
        router.push(`/form-page/${formId}`);
        setOpen(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while creating the form");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button size={"sm"} className="flex gap-x-2">
            <Plus className="w-4 h-4" />
            Create Form
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create New Form</DialogTitle>
            <DialogDescription>Create your form using AI </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Textarea
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Write your form description here..."
                className="col-span-4"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant={"destructive"}
              type="submit"
              className="flex gap-x-2"
              size={"sm"}
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            {isLoading ? (
              <Button>
                <Loader2 className="w-4 h-4 animate-spin" />
              </Button>
            ) : (
              <Button
                onClick={onCreate}
                disabled={isLoading}
                type="submit"
                className="flex gap-x-2"
                size={"sm"}
              >
                <Sparkles className="w-4 h-4" />
                Create Form
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
