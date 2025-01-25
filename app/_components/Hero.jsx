"use client"
import { useUser } from '@clerk/nextjs'
import React from 'react'

function Hero() {
    const {user, isSignedIn} = useUser()
  return (
    <div>
        <section className="bg-gray-50">
            <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex">
                <div className="mx-auto max-w-xl text-center">
                <h1 className="text-3xl font-extrabold sm:text-4xl">
                    Manage your money like a pro
                    <strong className="font-extrabold text-primary sm:block"> Because Money Matters </strong>
                </h1>

                <p className="mt-4 sm:text-xl/relaxed">
                    once you keep track of the money you use, you will save a lot
                </p>

                <div className="mt-8 flex flex-wrap justify-center gap-4">
                    {isSignedIn?
                    <a className="block w-full rounded bg-primary px-12 py-3 text-sm font-medium text-white shadow hover:bg-green-500 focus:outline-none focus:ring active:bg-green-800 sm:w-auto"
                    href="/dashboard">Get Started
                    </a>
                    :
                    <a className="block w-full rounded bg-primary px-12 py-3 text-sm font-medium text-white shadow hover:bg-green-500 focus:outline-none focus:ring active:bg-green-800 sm:w-auto"
                    href="/sign-in">Get Started
                    </a>
                    }
                </div>
                </div>
            </div>
        </section>
    </div>
  )
}

export default Hero