import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import db from '@/utils/dbConfig';
import { budgets, expenses } from '@/utils/schema';
import React, { useState } from 'react'
import { toast } from 'sonner';

function AddExpense({budgetId, refreshData}) {

    const [name, setName] = useState();
    const [amount, setAmount] = useState();
    const unpackedbudgetId = budgetId;
    console.los
    const addNewExpense = async () => {
        try {
            const result = await db.insert(expenses).values({
                name: name,
                amount: amount,
                budgetId: unpackedbudgetId,
                createdAt: new Date().toISOString()
            }).returning({ insertedId:budgets.id});
            console.log(result);
            if (result) {
                refreshData()
                toast.success("Expense added successfully");
            }
        } catch (error) {
            console.log(error);
        }
    }

  return (
      <div className='border p-5'>
          <h2 className='font bold text-lg'></h2>
          <div className="mt-2">
              <h2 className="text-black font-medium my-1">Budget Name</h2>
              <Input
                  placeholder="e.g. Apples"
                  onChange={(e) => setName(e.target.value)}
              />
          </div>
          <div className="mt-2">
              <h2 className="text-black font-medium my-1">Budget Name</h2>
              <Input
                  type="number"
                  placeholder="e.g. 100"
                  onChange={(e) => setAmount(e.target.value)}
              />
          </div>
          <Button 
            disabled={!(name && amount)}
            onClick={()=>addNewExpense()} 
            className="mt-3 w-full">+ New Expense
           </Button>
      </div>
  )
}

export default AddExpense