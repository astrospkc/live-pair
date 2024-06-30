import { db } from "@/db";
import { unstable_noStore } from "next/cache";
import { like, eq } from "drizzle-orm";
import { room } from "@/db/schema";

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
