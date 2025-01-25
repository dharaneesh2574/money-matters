"use client"
import { Button } from '@/components/ui/button'
import { PenBox } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogClose,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
import EmojiPicker from 'emoji-picker-react';
import { Input } from '@/components/ui/input';
import { useUser } from '@clerk/nextjs';
import db from '@/utils/dbConfig';
import { toast } from 'sonner';
import { budgets } from '@/utils/schema';
import { eq } from 'drizzle-orm';
  

function EditBudget({ budgetInfo, refreshData }) {
    const [emojiIcon, setEmojiIcon] = useState(budgetInfo?.icon);
    const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
    const [name, setName] = useState(budgetInfo?.name);
    const [amount, setAmount] = useState(budgetInfo?.amount);
    const { user } = useUser();

    useEffect(() => {
        setName(budgetInfo?.name);
        setEmojiIcon(budgetInfo?.icon);
        setAmount(budgetInfo?.amount);  
    }, [budgetInfo]);

    const onUpdateBudget = async () => {
        const result = await db.update(budgets)
        .set({name:name, icon: emojiIcon, amount:amount})
        .where(eq(budgets.id, budgetInfo?.id))
        .returning({ insertedId:budgets.id});

        if (result) {
            refreshData()
            toast.success("Budget updated successfully");
        }
    }
    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button className='flex gap-2'> <PenBox />Edit</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Budget</DialogTitle>
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
                                        defaultValue={budgetInfo?.name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div className="mt-2">
                                    <h2 className="text-black font-medium my-1">Budget Amount</h2>
                                    <Input
                                        type="number"
                                        placeholder="e.g. 100"
                                        defaultValue={budgetInfo?.amount}
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
                                onClick={() => onUpdateBudget()}
                                className="mt-5 w-full"
                            >
                                Update
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

        </div>
    )
}

export default EditBudget