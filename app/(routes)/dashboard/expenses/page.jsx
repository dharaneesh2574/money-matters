"use client";
import db from "@/utils/dbConfig";
import { expenses } from "@/utils/schema";
import { desc, eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { Trash } from "lucide-react";

function ExpenseComponent() {
  const [expensesList, setExpensesList] = useState([]);

  const getExpensesList = async () => {
    const result = await db
      .select()
      .from(expenses)
      .orderBy(desc(expenses.id));
    if (result) {
        console.log(result);
      setExpensesList(result);
    }
  };

  const deleteExpense = async (expense) => {
    try {
      const result = await db
        .delete(expenses)
        .where(eq(expenses.id, expense.id))
        .returning();
      if (result) {
        toast.success("Expense deleted successfully");
        getExpensesList();
      }
    } catch (error) {
      toast.error("Failed to delete expense");
      console.error(error);
    }
  };

  useEffect(() => {
    getExpensesList();
  }, []);

  return (
    <div className="mt-5">
      <h2 className="text-lg font-bold mb-3">Expenses List</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead>
            <tr className="bg-slate-200 text-left">
              <th className="p-3">Name</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Date</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {expensesList.map((expense, index) => (
              <tr
                key={index}
                className={`border-b ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                <td className="p-3">{expense.name}</td>
                <td className="p-3">${expense.amount}</td>
                <td className="p-3">{new Date(expense.createdAt).toLocaleDateString()}</td>
                <td className="p-3">
                  <Trash
                    className="text-red-600 cursor-pointer hover:text-red-800"
                    onClick={() => deleteExpense(expense)}
                  />
                </td>
              </tr>
            ))}
            {expensesList.length === 0 && (
              <tr>
                <td
                  colSpan="4"
                  className="p-3 text-center text-gray-500 italic"
                >
                  No expenses found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ExpenseComponent;
