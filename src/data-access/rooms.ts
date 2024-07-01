
import { db } from "@/db";
import { unstable_noStore } from "next/cache";
import { like, eq } from "drizzle-orm";
import { Room, room } from "@/db/schema";
import { getSession } from "@/lib/auth";

// Function to get rooms based on search criteria
export default async function getRooms(search: string | undefined) {
  unstable_noStore();
  try {
    const whereClause = search ? like(room.tags, `%${search}%`) : undefined;

    const rooms = await db.query.room.findMany({
      where: whereClause,
    });

    return rooms;
  } catch (error) {
    console.error("Error fetching rooms:", error);
    return [];
  }
}

// get user rooms
export async function getUserRooms() {
  unstable_noStore();
  try {
    const session = await getSession()
    if(!session){
      throw new Error("user not authenticated")
    }
    const rooms = await db.query.room.findMany({
      where: eq(room.userId, session.user.id)
    });
    return rooms;
  } catch (error) {
    console.error("Error fetching rooms:", error);
    return [];
  }
}

export async function deleteRoom(roomId:string){
  await db.delete(room).where(eq(room.id, roomId))
}


// Function to get a specific room by ID
export async function getRoom(roomId: string) {
  unstable_noStore();
  try {
    const roomData = await db.query.room.findFirst({
      where: (room) => eq(room.id, roomId),
    });

    return roomData;
  } catch (error) {
    console.error("Error fetching room:", error);
    return null;
  }
}

export async function createRoom(roomData: Omit<Room, "id"|"userId">,
  userId:string
){
  await db.insert(room).values({...roomData, userId})
}


export async function editRoom(roomData: Room){
    const updated =await db.update(room).set(roomData).where(eq(room.id, roomData.id)).returning();

    return updated[0];
  }
