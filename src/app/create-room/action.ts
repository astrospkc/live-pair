"use server"
import {room , Room} from "@/db/schema"
import {db} from "@/db"
import { getSession } from "@/lib/auth"
import { revalidatePath } from "next/cache"
// import { getSession } from "next-auth/react"

export async function createRoomAction(roomData:Omit<Room,"id" | "userId">){
    // const session = await getSession();
    const session = await getSession()


    // console.log("room data: ", roomData)
    // console.log("what is the session")
    // console.log("session:",session)
    if(!session){
        throw new Error("you can't create a room if you are not logged in")
    }
    await db.insert(room).values({...roomData, userId: session.user?.id})
    // console.log("room created successfully")
    revalidatePath("/") //for clearing out the cache , so the user can see all the created room when redirected to homepage
    
}