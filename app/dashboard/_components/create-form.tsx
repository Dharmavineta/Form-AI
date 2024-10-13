"use client";
import { aiGenerate } from "@/actions/server-actions";
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
import { Plus, Sparkles } from "lucide-react";
import { useState } from "react";
import { readStreamableValue } from "ai/rsc";
import { db } from "@/db";
import { forms } from "@/db/schema";
import { useUser } from "@clerk/nextjs";

export function CreateForm() {
  const { user } = useUser();
  const [userInput, setUserInput] = useState<string>("");

  const onCreate = async () => {
    const result = await aiGenerate(userInput);
    if (result) {
      await db.insert(forms).values({
        jsonForm: JSON.stringify(result, null, 2),
        createdBy: user?.fullName || user?.firstName || "User",
      });
    }
  };

  return (
    <div>
      <Dialog>
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
            >
              Cancel
            </Button>
            <Button
              onClick={onCreate}
              type="submit"
              className="flex gap-x-2"
              size={"sm"}
            >
              <Sparkles className="w-4 h-4" />
              Create Form
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
