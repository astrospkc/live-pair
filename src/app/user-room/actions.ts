"use server"
import { deleteRoom, getRoom } from "@/data-access/rooms";
import { getSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async  function deleteRoomAction(roomId:string){
    const session = getSession();

    if(!session){
        throw new Error("user not authenticated")
    }

    const room = await getRoom(roomId)

    if(room?.id !== roomId){
        throw new Error("user not authorized")
    }
    await deleteRoom(roomId)
    revalidatePath("/user-room")
}