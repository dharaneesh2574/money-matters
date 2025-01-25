"use client"
import React, { useEffect, useState } from 'react'
import { UserButton, useUser } from '@clerk/nextjs'
import db from '@/utils/dbConfig';
import { budgets, expenses } from '@/utils/schema';
import { desc, eq, sql } from 'drizzle-orm';
import CardInfo from './_components/CardInfo';
import BarChartDashboard from './_components/BarChartDashboard';
import BudgetItem from './budgets/_components/BudgetItem';

function Dashboard() {

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
    totalSpend: sql`SUM(CAST(${expenses.amount} AS numeric))`.as('totalSpend'),
  })
  .from(budgets)
  .leftJoin(expenses, eq(budgets.id, expenses.budgetId))
  .where(eq(budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
  .groupBy(budgets.id)
  .orderBy(desc(budgets.id));

    console.log(result);
    if (result) {
      setBudgetList(result);
    }
};
  return (
    <div className='p-5'>
        <h3 className='font-bold text-3xl'>Hi, {user?.firstName}</h3>
        <h4 className='text-gray-500'>Keep track of the most important thing that matters</h4>
        <CardInfo budgetList={budgetList}/>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
          <div className='md:col-span-2'>
            <BarChartDashboard  budgetList={budgetList}/>
          </div>
          <div className='grid gap-5'>
            <h2 className='font-bold text-2xl'> Latest Budget</h2>
            {budgetList.map((budget, index) => (
              <BudgetItem budget={budget} />
            ))}
          </div>
        </div>
    </div>
  )
}

export default Dashboard