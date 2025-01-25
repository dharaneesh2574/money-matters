import db from '@/utils/dbConfig';
import { expenses } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { Trash } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner';

function ExpenseListTable({expensesList, refreshData}) {

    const deleteExpense = async (expense) => {
        const result = await db.delete(expenses).where(eq(expenses.id, expense.id)).returning();
        if (result) {
            toast.success("Expense deleted successfully");
            refreshData();    
        }
    }
  return (
    <div className='mt-3'>
        <div className='grid grid-cols-4 bg-slate-200 p-2'>
            <h2>Name</h2>
            <h2>Amount</h2>
            <h2>Date</h2>
            <h2>Action</h2>
        </div>
        {expensesList.map((expense,index) => (
            <div className='grid grid-cols-4 p-2' key={index}>
                <h2>{expense.name}</h2>
                <h2>{expense.amount}</h2>
                <h2>{new Date(expense.createdAt).toLocaleDateString()}</h2>
                <h2><Trash className='text-red-600 cursor-pointer'
                onClick={() => deleteExpense(expense)}/></h2>
            </div>
        ))}
    </div>
  )
}

export default ExpenseListTable