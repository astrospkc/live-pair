import Header from "@/components/Header";
import { db } from "@/db/index";

import { Button } from "@/components/ui/button"
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Room } from "@/db/schema";
import getRooms from "../data-access/rooms";
import { TagList, splitTags } from "@/components/tag-list";

function FindRoom({room}:{room:Room}){
  return (
    <Card>
  <CardHeader>
    <CardTitle>{room.name}</CardTitle>
    
      <CardDescription>{room.description}</CardDescription>
    
   
  </CardHeader>
  <CardContent><TagList tags={splitTags(room)}/></CardContent>
  <CardContent>
    {room.githubRepo && (
      <Link href={room.githubRepo} target="_blank" rel="noopener noreferrer"> Github Project</Link>
    )}
  </CardContent>
  <CardFooter>
    <Button asChild><Link href={`/rooms/${room.id}`}>Join Room</Link></Button>
  </CardFooter>
</Card>
  )
}

export default async function Home() {

  let rooms:Room[] = await getRooms();


  return (
    <>
    <div className="flex flex-row justify-between">
      <div>
      <div>Find Rooms</div>
    <div className="grid grid-cols-2 my-4 gap-3">
      
      {
        rooms.map((room)=>{
          return (
            <FindRoom key={room.id} room={room}/>
          )
        })
      }
    </div>
    </div>
    
    <div><Link href="/create-room"><Button>Create Room</Button></Link></div>

    </div>
    </>
  );
}
