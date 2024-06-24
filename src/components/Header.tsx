'use client'

import React from 'react'
import { ModeToggle } from './mode-toggle'
import { signIn, signOut, useSession } from 'next-auth/react'

const Header = () => {

    const session = useSession();
    console.log(session.data)
  return (
    <div className='m-4'>
      {session.data ? <button 
     className='bg-white text-black rounded-2xl' onClick={()=>signOut()}>Sign Out</button> : <button className='bg-white rounded-2xl text-black' onClick={()=>signIn("github")}>Sign In</button>
}

        <div>
        <ModeToggle/>
        </div>
        {session.data?.user?.email}

    </div>
  )
}

export default Header