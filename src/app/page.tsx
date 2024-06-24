import { db } from "@/db/index";


export default async function Home() {

  let items = [];
  try {
    // Replace this with your actual query
    // items = await db.query.user.findMany();
    items = await db.query.testing.findMany();
    console.log("what is the error: ", items)
  } catch (error) {
    console.error("Error fetching testing:", error);
  }


  return (
    <>
    <div>
      {
        items.map((item)=>{
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
