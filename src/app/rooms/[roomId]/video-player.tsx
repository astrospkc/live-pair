"use client"

import '@stream-io/video-react-sdk/dist/css/styles.css';
import { Room } from '@/db/schema';
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
  } from '@stream-io/video-react-sdk';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { generateTokenAction } from './actions';
  
  const apiKey = 'process.env.NEXT_PUBLIC_GETSTREAM_API_KEY';
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMTY2YWQyYTgtYzMxOC00Njc3LTgxOTEtMWUxNzEwNTNkZWNlIn0.skcQpRtDv87eyecB9wjZIPUCIT894iplhjAR-2vrfv8';

  export const LivePairVideo = ({room} :{room:Room}) => {
    console.log("v-room: ", room)
    const session = useSession()
    console.log("v-session: ",session)
    const [client, setClient] = useState<StreamVideoClient|null>(null)
    console.log("v-client: ", client)

    const [call, setCall] = useState<Call | null>(null)
console.log("v-call ", call)
    // if (!call) {
    //     return <>Loading...</>;
    //   }
    console.log("token generate: ", generateTokenAction)
    
    useEffect(() => {
        console.log("room: ", room)
        if(!room) return;
        if(!session.data){
            return
        }
        const userId = session.data?.user.id;
        console.log("v-userId: ", userId)

        const client = new StreamVideoClient({ apiKey, user:{
            id: userId 
        }, 
        tokenProvider: generateTokenAction,
        token
     });
        setClient(client);

        const call = client.call('default', room.id);
        // call.getOrCreate();
        call.join({create:true});
        setCall(call)
        return ()=>{
            call.leave();
            client.disconnectUser()
        }

    }, [session, room])
    
    return (
        client && 
        call && (
            <div className="str-video">
            <StreamVideo client={client}>
                <StreamTheme>
                <StreamCall call={call}>
                    <SpeakerLayout/>
                    <CallControls/>
          {/* video ui */}
                </StreamCall>
                </StreamTheme>
        
      </StreamVideo>
       </div>
        )
    );
  };