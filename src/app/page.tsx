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

function FindRoom({room}:{room:Room}){
  return (
    <Card>
  <CardHeader>
    <CardTitle>{room.name}</CardTitle>
    
      <CardDescription>{room.description}</CardDescription>
    
   
  </CardHeader>
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

  let rooms:Room[] = [];
  try {
    
    rooms = await db.query.room.findMany();
    // console.log("what is the error: ", rooms)
  } catch (error) {
    console.error("Error fetching testing:", error);
  }


  return (
    <>
    <div className="flex flex-row justify-between">
      <div>
      <div>Find Rooms</div>
    <div>
      
      {
        rooms.map((room)=>{
          return (
            <FindRoom key={room.id} room={room}/>
            
           
          )
        })
      }
    </div>
    </div>
    
    <div><Link href="/create-room"><Button >Create Room</Button></Link></div>

    </div>
    
    
    
    
    </>
  );
}
