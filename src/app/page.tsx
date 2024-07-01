"use server"

import { Button } from "@/components/ui/button"
import Link from "next/link";

import { Room } from "@/db/schema";
import getRooms from "../data-access/rooms";


import SearchBar from "./search-bar";

import FindRoom from "./findRoom";


export default async function Home(props) {
  // console.log("props: ", props)

  // {searchParams}:{searchParams: {search : string}}

  // let rooms:Room[] = await getRooms(searchParams.search);
  let rooms:Room[] = await getRooms(props?.searchParams?.search)


  return (
    <>
    <div className="flex flex-row justify-between">
      <SearchBar/>
      <div className="flex flex-col gap-3">
      <div>Find Rooms</div>
    <div className="grid grid-cols-2 my-4 gap-3">
      
      {
        rooms?.map((room)=>{
          return (
            <FindRoom key={room.id} room={room}/>
          )
        })
      }
    </div>
    </div>

      </div>

      
    
    <div><Link href="/create-room"><Button>Create Room</Button></Link></div>

  
    </>
  );
}
