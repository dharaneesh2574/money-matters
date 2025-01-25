"use client"
import React, { useEffect, useState } from 'react'
import CreateBudget from './CreateBudget'
import db from '@/utils/dbConfig'
import { desc, eq, getTableColumns } from 'drizzle-orm'
import { budgets, expenses } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import { sql } from 'drizzle-orm'
import BudgetItem from './BudgetItem'

function BudgetList() {

  const [budgetList, setBudgetList] = useState([]);
  const { user } = useUser();

useEffect(() => {
  user&&getBudgetList();
},[user])

const getBudgetList = async () => {
  const result = await db
  .select({
    id: budgets.id,
    amount: budgets.amount,
    createdBy: budgets.createdBy,
    icon: budgets.icon,
    name: budgets.name,
    totalItem: sql`COUNT(${expenses.id})`.as('totalItem'),
    totalSpend: sql`SUM(CAST(${expenses.amount} AS numeric))`.as('totalSpend'), // Casting to numeric
  })
  .from(budgets)
  .leftJoin(expenses, eq(budgets.id, expenses.budgetId)) // Correctly use eq here
  .where(eq(budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
  .groupBy(budgets.id)
  .orderBy(desc(budgets.id));

    console.log(result);
    if (result) {
      setBudgetList(result);
    }
};
  return (
    <div className='mt-7'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'> 
        <CreateBudget refreshData={()=>getBudgetList()}/>
        {budgetList?.length>0? budgetList?.map((budget, index) => (
          <BudgetItem key={budget.id} budget={budget} />  
        ))
      :[1,2,3,4,5,6].map((item,index)=> (
        <div key={index} className='w-full bg-slate-300 rounded-lg h-[150px] animate-pulse'></div>
      ))
      }
      </div>
    </div>
  )
}

export default BudgetList