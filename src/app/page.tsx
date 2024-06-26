import { db } from "@/db/index";


export default async function Home() {

  let rooms = [];
  try {
    // Replace this with your actual query
    // items = await db.query.user.findMany();
    rooms = await db.query.room.findMany();
    console.log("what is the error: ", rooms)
  } catch (error) {
    console.error("Error fetching testing:", error);
  }


  return (
    <>
    <div>
      {
        rooms.map((item)=>{
          return (
            <div className="text-white" key={item.id}>
              {item.name}
            </div>
          )
        })
      }
    </div>
    
    
    </>
  );
}
