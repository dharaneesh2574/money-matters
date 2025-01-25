import { PiggyBank, ReceiptText, Wallet } from 'lucide-react'
import React, { useEffect, useState } from 'react'

function CardInfo({budgetList}) {
    
    const [totalBudget, setTotalBudget] = useState(0);
    const [totalSpent, setTotalSpent] = useState(0);

    useEffect(() => {
        budgetList&&calcCardInfo();
    },[budgetList])

    const calcCardInfo = () => {
        let totalBudget_= 0;
        let totalSpent_= 0;
        budgetList.forEach(element => {
            totalBudget_ += Number(element.amount);
            totalSpent_ += Number(element.totalSpend);
            
        });
        setTotalBudget(totalBudget_);
        setTotalSpent(totalSpent_);
    }

  return (
    <div>
    {budgetList? 
    <div className='mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
        
        <div className='p-7 border rounded-lg flex items-center justify-between'>
            <div>
                <h2 className='text-sm'>Total Budget</h2>
                <h2 className='font-bold text-2xl'>₹{totalBudget}</h2>
            </div>
            <PiggyBank className='bg-primary p-3 h-12 w-12 rounded-full text-white'/>
        </div>
        <div className='p-7 border rounded-lg flex items-center justify-between'>
            <div>
                <h2 className='text-sm'>No.of Budget</h2>
                <h2 className='font-bold text-2xl'>{budgetList?.length}</h2>
            </div>
            <Wallet className='bg-primary p-3 h-12 w-12 rounded-full text-white'/>
        </div>
        <div className='p-7 border rounded-lg flex items-center justify-between'>
            <div>
                <h2 className='text-sm'>Total Spent</h2>
                <h2 className='font-bold text-2xl'>₹{totalSpent}</h2>
            </div>
            <ReceiptText className='bg-primary p-3 h-12 w-12 rounded-full text-white'/>
        </div>
        
    </div>
    :
    <div>
        {
            [1,2,3].map((item,index) => ((item, index) => (
                    <div className='h-[160px] w-full bg-slate-300 animate-pulse rounded-lg'></div>
            )
            ))};
    </div>
    }
    </div>
  )
}

export default CardInfo