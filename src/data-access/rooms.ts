import { db } from "@/db";
import { unstable_noStore } from "next/cache";

export default async function getRooms(){
  unstable_noStore();
    try {
        const rooms =await db.query.room.findMany();
        return rooms;
        // console.log("what is the error: ", rooms)
      } catch (error) {
        console.error("Error fetching testing:", error);
      }
}


export async function getRoom(roomId:string){
  unstable_noStore();
  return await db.query.room.findFirst({
    where: (room,{eq})=>eq(room.id, roomId)
  });


}