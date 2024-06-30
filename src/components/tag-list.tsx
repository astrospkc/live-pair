import { Badge } from "./ui/badge"

export function splitTags(room){
    const tag = room.tags?.split(',') ?? [];
    console.log("tag: ", tag)
    return tag;
}

export function TagList({tags=[]}){
    return (
        <div className="my-4 flex flex-row flex-wrap">
            <h1 className="mb-2">Tags:</h1>
        {
            tags &&  (
                tags.map((codelang)=>{
                    return (
                         <Badge variant="outline" key={codelang} className="text-gray-600 m-1" >{codelang}</Badge>
                    )}
                )
            )
}
        </div>
    )
    
}