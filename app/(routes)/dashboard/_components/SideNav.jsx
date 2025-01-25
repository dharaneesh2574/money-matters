"use client"
import React, { useEffect } from 'react';
import Image from 'next/image';
import { LayoutGrid, PiggyBank, ReceiptText, ShieldCheck } from 'lucide-react';
import { UserButton } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';
import Link from 'next/link';


function SideNav() {
    const menuList = [
        { id: 1, name: 'Dashboard', icon: LayoutGrid, path: '/dashboard' },
        { id: 2, name: 'Budgets', icon: PiggyBank, path: '/dashboard/budgets' },
        { id: 3, name: 'Expenses', icon: ReceiptText, path: '/dashboard/expenses' },
        { id: 4, name: 'Upgrade', icon: ShieldCheck, path: '/dashboard/upgrade' },
    ];
    const path = usePathname();
    useEffect(() => {console.log(path)}, [path])
    return (
        <div className='h-screen p-5 border shadow-sm'>
            <Image src="./money-logo.svg" alt="logo" width={160} height={100} /> 
            <div>
                {menuList.map((item, index) => (
                    <Link href={item.path}>
                        <h2 className={`flex gap-2 items-center text-grey-600 font-medium p-5 cursor-pointer rounded-md hover:text-green-400 hover:bg-green-200
                            ${path==item.path&&'text-primary bg-green-200'}`}>
                            <item.icon />
                            {item.name}
                        </h2>
                    </Link>
                ))}
            </div>
            <div className='fixed bottom-10 p-5 flex gap-2 items-center'>
                <UserButton />
                Profile
            </div> 
        </div>
    );
}

export default SideNav;