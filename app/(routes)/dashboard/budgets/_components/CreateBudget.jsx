"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EmojiPicker from "emoji-picker-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import db from "@/utils/dbConfig";
import { budgets } from "@/utils/schema";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";
import { DialogClose } from "@radix-ui/react-dialog";

function CreateBudget({ refreshData }) {
  const [emojiIcon, setEmojiIcon] = useState("🙂");
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const { user } = useUser(); // Destructure the user object

  const onCreateBudget = async () => {
    try {
      // Validate user object and primaryEmailAddress
      const email = user?.primaryEmailAddress?.emailAddress;
      if (!email) {
        console.log("Unable to retrieve user email. Please log in again.");
        return;
      }

      const result = await db
        .insert(budgets)
        .values({
          name: name,
          amount: amount,
          icon: emojiIcon,
          createdBy: email, // Use the user's email
        })
        .returning({ insertedId: budgets.id });

      if (result) {
        refreshData()
        toast.success("Budget created successfully");

      }
    } catch (error) {
      console.error("Error creating budget:", error);
      toast.error("An error occurred while creating the budget.");
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <div className="bg-slate-200 p-10 rounded items-center flex flex-col border-2 border-dashed cursor-pointer hover:shadow-md">
            <h2 className="font-bold text-3xl">+</h2>
            <h2>Create new budget</h2>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Budget</DialogTitle>
            <DialogDescription>
              <div className="mt-5">
                <Button
                  variant="Outline"
                  size="lg"
                  onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
                >
                  {emojiIcon}
                </Button>
                {openEmojiPicker && (
                  <div className="absolute">
                    <EmojiPicker
                      onEmojiClick={(e) => {
                        setEmojiIcon(e.emoji);
                        setOpenEmojiPicker(false);
                      }}
                    />
                  </div>
                )}
                <div className="mt-2">
                  <h2 className="text-black font-medium my-1">Budget Name</h2>
                  <Input
                    placeholder="e.g. Groceries"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mt-2">
                  <h2 className="text-black font-medium my-1">Budget Amount</h2>
                  <Input
                    type="number"
                    placeholder="e.g. 100"
                    onChange={(e) => setAmount(e.target.value)}
                  />
                  
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
            <Button
                    disabled={!(name && amount)}
                    onClick={() => onCreateBudget()}
                    className="mt-5 w-full"
                  >
                    Create
                  </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateBudget;
