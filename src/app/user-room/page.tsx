
"use server"
import { Button } from "@/components/ui/button"
import Link from "next/link";

import { Room } from "@/db/schema";


import SearchBar from "../search-bar";
import FindRoom from "@/app/findRoom";
import { getUserRooms } from "@/data-access/rooms";
import { UserRoomCard } from "./user-room";
import { unstable_noStore } from "next/cache";



export default async function UserRoom() {
  unstable_noStore();
  let rooms:Room[] = await getUserRooms()


  return (
    <>
    <div className="flex flex-row justify-between">
      <SearchBar/>
      <div>
      <div>User Rooms</div>
    <div className="grid grid-cols-2 my-4 gap-3">
      
      {
        rooms?.map((room)=>{
          return (
            <UserRoomCard key={room.id} room={room}/>
          )
        })
      }
    </div>
    <div><Button asChild><Link href="/create-room">Create Room</Link></Button></div>
    </div>
    </div>
    </>
  );
}
