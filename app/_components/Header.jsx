"use client"
import React from 'react'
import Image from 'next/image'
import { UserButton, useUser } from '@clerk/nextjs'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
function Header() {

  const {user, isSignedIn} = useUser()
  return (
    <div className='p-5 flex justify-between'>
        <Image src="/money-logo.svg" alt="logo" width={160} height={100} />
        {isSignedIn? <UserButton></UserButton> : <Link href={'/sign-in'}><Button>Sign In</Button></Link> }
    </div>
  )
}

export default Header