
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
import { splitTags } from "@/lib/utils";
import { TagList } from "@/components/tag-list";

export default function FindRoom({room}:{room:Room}){
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