'use client'

import React from 'react'
import { ModeToggle } from './mode-toggle'
import { signIn, signOut, useSession } from 'next-auth/react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from 'next/link'

const ActionDropDown=()=>{
  const session = useSession();
  return (
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <button>{session.data?.user?.name || "menu"} </button></DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>
      <Link href="/">Home</Link>
      </DropdownMenuItem>
    <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuItem><Link href="/create-room">Create Room</Link></DropdownMenuItem>
    <DropdownMenuItem>Team</DropdownMenuItem>
    <DropdownMenuItem>Subscription</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
  )
  
}


const Header = () => {

    const session = useSession();
    // console.log(session.data)
  return (
    <>
    <div className='container flex flex-row justify-between '>
    
      <div className='flex'>
        <ModeToggle/>
        </div>
      
    <div className=' flex gap-2'>
    <ActionDropDown/>
    <div >
    {session.data ? <button 
     className='bg-white text-black rounded-2xl px-2' onClick={()=>signOut()}>Sign Out</button> : <button className='bg-white rounded-2xl text-black px-2' onClick={()=>signIn("github")}>Sign In</button>
}
    </div>
      
</div>

        
        

  

    </div>
    
    </>
  )
}

export default Header