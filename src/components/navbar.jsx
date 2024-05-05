"use client"

import {signIn, signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import SparkleIcon from './sparkleIcon';
import Link from "next/link";
import React, { useEffect } from 'react'
import { getServerSession } from 'next-auth';
import { Auth } from './auth';

function Navbar () {

    const {data : session , status, image} = useSession()
    const router = useRouter()

    // let res
    // const ses =async()=>{
    //     res =  await getServerSession(Auth)
    // }
    // ses()

    return (
        <>
            <div className="flex justify-around py-4 border-b-2 border-white w-[100vw]">
                <Link href="/" className="flex gap-1 justify-center items-center">
                    <SparkleIcon />
                    <span>EpicCaptions</span>
                </Link>
                <nav className="flex gap-6 text-white/80 justify-center items-center">
                    <Link href="/">Home</Link>
                    <Link href="/pricing">Pricing</Link>
                    {status == 'authenticated'?
                    <div className='flex justify-center items-center gap-4'>
                    <button className='' onClick={async()=> await signOut() } >Logout</button>
                    welcome {session.user.name}
                    <img className=' rounded-full' src={session.user.image} width={40} alt="" />
                    </div>
                    :
                    // <button className='' onClick={async()=> await signIn('github')} >Signin</button>
                    <button className='' onClick={async()=> router.push("/api/auth/signin")} >Signin</button>
                    }
                </nav>
            </div>
        </>
    )
}

export default Navbar