

import { getRoom } from "@/data-access/rooms";
import { GithubIcon } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge"
import { TagList, splitTags } from "@/components/tag-list";
import { LivePairVideo } from "./video-player";



export default async function RoomPage(props:any){

   
    

    console.log(props)
    const roomId = props.params.roomId;
    const room = await getRoom(roomId);
    if(!room){
        return <div> No room available for this id</div>
    }
    
    

return (
    <>
    <div className="flex flex-row w-full rounded-2xl">
        <div className=" border-2 border-gray-700 w-3/4 mx-3 p-2 shadow-slate-900 rounded-xl">
        video player
        <LivePairVideo room={room}/>
        </div>
        <div className=" border-2 border-gray-700 w-1/4 mr-4 p-4 text-sm shadow-slate-900 rounded-xl">
        <h1 className="text-bold">INFO PANEL</h1>
        <hr  className="text-white mt-2"/>
        <br/>
        <h1>Room-Name:<span className="text-gray-700"> {room?.name}</span></h1>
        <p>Desc: <span className="text-gray-700">{room?.description}</span></p>
        <TagList tags={splitTags(room)}/>
        {
            room?.githubRepo && (
                <Link href={room.githubRepo} target="_blank" rel="noopener no">
                <div className="flex flex-row my-3 text-gray-700 hover:cursor-pointer hover:text-gray-400">
                    <GithubIcon/> 
                <h1 className="text-sm ">
                Github Project
                </h1>
                </div>
                </Link>
            )
        }
        </div>
    </div>
    </>
)
}