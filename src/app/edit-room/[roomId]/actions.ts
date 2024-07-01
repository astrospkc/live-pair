"use server"
import {room , Room} from "@/db/schema"
import {db} from "@/db"
import { getSession } from "@/lib/auth"
import { revalidatePath } from "next/cache"
import { editRoom, getRoom } from "@/data-access/rooms"
import { redirect } from "next/dist/server/api-utils"
// import { getSession } from "next-auth/react"

export async function editRoomAction(roomData:Omit<Room,"userId">){
    // const session = await getSession();
    const session = await getSession()

    if(!session){
        throw new Error("you can't create a room if you are not logged in")
    }
    const room = await getRoom(roomData.id)

    if(room?.id !== roomData.id){
        throw new Error("user not authorized")
    }
    await editRoom({...roomData, userId:room.userId});
    revalidatePath(`/edit-room/${roomData.id}`)
    revalidatePath("/user-room") //for clearing out the cache , so the user can see all the created room when redirected to homepage
    
    
}