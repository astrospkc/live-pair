"use client"

import { useRouter } from "next/navigation";
import { Badge } from "./ui/badge"



export function TagList({tags=[]}){
    console.log("tags: ", tags)
    const router = useRouter()
    return (
        <div className="my-4 flex flex-row flex-wrap">
            <h1 className="mb-2">Tags:</h1>
        {
            tags &&  (
                tags.map((tag)=>{
                    return (
                         <Badge variant="outline" key={tag} className="text-gray-600 m-1 hover:text-gray-400 hover:cursor-pointer" onClick={()=>{router.push(`/?search=${tag}`)}}>{tag}</Badge>
                    )}
                )
            )
}
        </div>
    )
    
}