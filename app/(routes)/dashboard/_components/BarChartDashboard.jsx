"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Legend, Tooltip } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function BarChartDashboard({ budgetList }) {
  // Transform budgetList data for the chart
  const chartData = budgetList.map((budget) => ({
    name: budget.name, // Budget name for x-axis
    totalSpend: parseFloat(budget.totalSpend || 0), // Total spent
    amount: parseFloat(budget.amount || 0), // Total budget
  }));

  return (
    <div className="border rounded-lg">
    <Card>
      <CardHeader>
        <CardTitle>Budget Overview</CardTitle>
        <CardDescription>Comparison of Spent vs Budget</CardDescription>
      </CardHeader>
      <CardContent>
        <BarChart width={600} height={400} data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="totalSpend" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} name="Total Spent" />
          <Bar dataKey="amount" fill="#27c408" radius={[4, 4, 0, 0]} name="Total Budget" />
        </BarChart>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
        </div>
        <div className="leading-none text-muted-foreground">
          Showing spending trends for all budgets
        </div>
      </CardFooter>
    </Card>
    </div>
  );
}

export default BarChartDashboard;
