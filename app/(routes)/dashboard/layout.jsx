"use client";
import React, { useEffect } from "react";
import SideNav from "./_components/SideNav";
import DashboardHeader from "./_components/DashboardHeader";
import db from "../../../utils/dbConfig";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { budgets } from "../../../utils/schema";
import { useRouter } from "next/navigation";

function DashboardLayout({ children }) {
  const { user } = useUser();

  const router = useRouter();

  useEffect(() => {
    if (user) {
      checkUserBudgets();
    }
  }, [user, router.isReady]);

  const checkUserBudgets = async () => {
    try {
      const result = await db
        .select()
        .from(budgets)
        .where(eq(budgets.createdBy, user?.primaryEmailAddress?.emailAddress));
      if (result?.length == 0) {
        router.replace('/dashboard/budgets');
      }
    } catch (error) {
      console.error("Error fetching budgets:", error);
    }
  };

  return (
    <div>
      <div className="fixed md:w-64 hidden md:block">
        <SideNav />
      </div>
      <div className="md:ml-64">
        <DashboardHeader />
        {children}
      </div>
    </div>
  );
}

export default DashboardLayout;
