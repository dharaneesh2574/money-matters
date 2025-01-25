"use client"
import db from '@/utils/dbConfig';
import { budgets, expenses } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import { sql, eq, desc } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import BudgetItem from '../../budgets/_components/BudgetItem';
import AddExpense from '../_components/AddExpense'
import ExpenseListTable from '../_components/ExpenseListTable'
import EditBudget from '../_components/EditBudget'
import { Button } from '@/components/ui/button';
import { PenBox, Trash } from 'lucide-react';
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
} from "@/components/ui/alert-dialog"
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

function Expenses({params}) {
    
    const { user } = useUser();
    const [budgetInfo, setBudgetInfo] = useState();
    const unwrappedParams = React.use(params);
    const router = useRouter();

    const [expensesList, setExpensesList] = useState([]);

    useEffect(() => {
        user&&getBudgetInfo();
    }, [unwrappedParams,user,router.isReady]);

  
    const getBudgetInfo = async () => {
        const result = await db
          .select({
            id: budgets.id,
            amount: budgets.amount,
            createdBy: budgets.createdBy,
            icon: budgets.icon,
            name: budgets.name,
            totalItem: sql`COUNT(${expenses.id})`.as('totalItem'),
            totalSpend: sql`SUM(CAST(${expenses.amount} AS numeric))`.as('totalSpend'), 
          })
          .from(budgets)
          .leftJoin(expenses, eq(budgets.id, expenses.budgetId)) 
          .where(eq(budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
          .where(eq(budgets.id, unwrappedParams.id))
          .groupBy(budgets.id)
        if (result) {

          setBudgetInfo(result[0]);
          getExpensesList();
        }
      };

      const getExpensesList = async () => {
        const result = await db
          .select()
          .from(expenses)
          .where(eq(expenses.budgetId, unwrappedParams.id))
          .orderBy(desc(expenses.id));
        if (result) {
          setExpensesList(result);
        }
      }
      const deleteBudget = async () => {

        const deleteExpensesresult = await db.delete(expenses).where(eq(expenses.budgetId, unwrappedParams.id)).returning();
        if (deleteExpensesresult){
          const result = await db.delete(budgets).where(eq(budgets.id, unwrappedParams.id)).returning();
          if (result) {
            toast.success("Budget deleted successfully");
            router.replace('/dashboard/budgets');
          }
        }
      }
        
    
      return (
    
    <div className='p-10'>
        <h2 className='text-2xl font-bold flex justify-between'>My Expenses 
            <div className='flex gap-2 items-center'>
            <EditBudget budgetInfo={budgetInfo} refreshData={()=>getBudgetInfo()}/>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button className='flax gap-2 bg-red-500 text-white' variant='Destructive'> <Trash /> Delete </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your account
                    and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => deleteBudget()}>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            </div>
        </h2> 
        <div className='grid grid-cols-1 md:grid-cols-2 mt-6'>
            {budgetInfo?
            <BudgetItem budget={budgetInfo} />
            :
            <div className='w-full bg-slate-300 rounded-lg h-[150px] animate-pulse'></div>
            }
            <AddExpense 
              budgetId={unwrappedParams.id}
              refreshData={()=>getBudgetInfo()} />
        </div>
        <div className='mt-4'>
            <h2 className='font-bold text-lg'>Latest Expenses</h2>
            <ExpenseListTable expensesList={expensesList} refreshData={()=>getBudgetInfo()} />
        </div>
    </div>
  )
}

export default Expenses