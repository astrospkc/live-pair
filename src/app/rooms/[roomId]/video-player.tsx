"use client";

import "@stream-io/video-react-sdk/dist/css/styles.css";
import { Room } from "@/db/schema";
import {
  Call,
  StreamCall,
  StreamVideo,
  StreamVideoClient,
  User,
  StreamTheme,
  ParticipantView,
  useCall,
  useCallStateHooks,
  SpeakerLayout,
  CallControls,
  CallParticipantsList,
} from "@stream-io/video-react-sdk";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { generateTokenAction } from "./actions";
import { useRouter } from "next/navigation";

const apiKey = process.env.NEXT_PUBLIC_GETSTREAM_API_KEY as string;
// const token =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMTY2YWQyYTgtYzMxOC00Njc3LTgxOTEtMWUxNzEwNTNkZWNlIn0.skcQpRtDv87eyecB9wjZIPUCIT894iplhjAR-2vrfv8";

export const LivePairVideo = ({ room }: { room: Room }) => {
  console.log("v-room: ", room);
  const session = useSession();
  console.log("v-session: ", session);
  const [client, setClient] = useState<StreamVideoClient | null>(null);
  console.log("v-client: ", client);

  const [call, setCall] = useState<Call | null>(null);
  console.log("v-call ", call);
  // if (!call) {
  //     return <>Loading...</>;
  //   }

  const router = useRouter();
  useEffect(() => {
    console.log("room: ", room);
    if (!room) return;
    if (!session.data) {
      return;
    }
    const userId = session.data?.user.id;
    console.log("v-userId: ", userId);  
    console.log(apiKey);
    const client = new StreamVideoClient({
      apiKey ,
      user: {
        id: userId,
        // id : 'Luminara_Unduli'
      },
      tokenProvider: generateTokenAction,
    //   token : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiTHVtaW5hcmFfVW5kdWxpIiwiaXNzIjoiaHR0cHM6Ly9wcm9udG8uZ2V0c3RyZWFtLmlvIiwic3ViIjoidXNlci9MdW1pbmFyYV9VbmR1bGkiLCJpYXQiOjE3MTk1OTc0NDgsImV4cCI6MTcyMDIwMjI1M30.ASLMqZs2Q1Av1_h84WL6mfjQ7f6HWGEswu3ITt0Q3pI',
    });
    setClient(client);

    const call = client.call("default", room.id);
    // call.getOrCreate();
    call.join({ create: true });
    setCall(call);
    return () => {
      call
      .leave()
      .then(()=>{ client.disconnectUser()})
      .catch(console.error);
     
    };
  }, [session, room]);

  return (
    client &&
    call && (
        <StreamVideo client={client}>
          <StreamTheme>
            <StreamCall call={call}>
              <SpeakerLayout />
              <CallControls  onLeave={()=>
                router.push("/")
              }/>
              <CallParticipantsList onClose = {()=>undefined}  />
              {/* video ui */}
            </StreamCall>
          </StreamTheme>
        </StreamVideo>
    )
  );
};
