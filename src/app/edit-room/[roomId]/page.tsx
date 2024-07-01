import React from 'react'
import EditRoomForm from './edit-room-form'
import { getRoom } from '@/data-access/rooms'
import { unstable_cache, unstable_noStore } from 'next/cache'

const EditRoom = async ({params}:{params :{roomId:string}}) => {
    unstable_noStore()
    const room = await getRoom(params.roomId) 
    if(!room){
        throw new Error("room not found")
    }
   return (
    <div><EditRoomForm room={room}/></div>
  )
}

export default EditRoom