"use server"

import { getSession } from "@/lib/auth"
import {StreamChat} from "stream-chat"

export async function generateTokenAction(){
    console.log("Gernerating token");
    const session  = await getSession()
    console.log(session)
    if(!session){
        throw new Error("No session found")

    }

    const api_key = process.env.NEXT_PUBLIC_GETSTREAM_API_KEY!;
    console.log(api_key)
    const api_secret = process.env.APP_SECRET!;
    console.log(api_secret)
    const serverClient= StreamChat.getInstance(api_key, api_secret)
    const token= serverClient.createToken(session.user.id)
    console.log("token", token)
    return token
}