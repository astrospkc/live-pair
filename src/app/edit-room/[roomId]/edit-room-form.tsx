"use client"
 
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import React from 'react'
import { editRoomAction } from "./actions"
import { useParams, useRouter } from 'next/navigation';
import { Room } from "@/db/schema"



const formSchema = z.object({
 name: z.string().min(2).max(50),
 description: z.string().min(1).max(500),
 githubRepo:z.string().min(1).max(500),
 tags:z.string().min(1).max(50),
})



const EditRoomForm = ({room}:{room:Room}) => {
    const router  =useRouter()
    const params = useParams();
    
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
        //   name: room.name,
        //   description:room.description ? room.description : undefined,
        //   githubRepo:room.githubRepo ? room.githubRepo : undefined,
        //   tags:room.tags,
            name: room.name,
            description:room.description ?? "",
            githubRepo:room.githubRepo ?? "",
            tags:room.tags,
        }
      })
     
      // 2. Define a submit handler.
      async function onSubmit(values: z.infer<typeof formSchema>) {
        
        await editRoomAction({
            id:params.roomId as string, 
            ...values,
        });
        router.push("/user-room")
      }



      return (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Room</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

<FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    Description of the project
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

<FormField
              control={form.control}
              name="githubRepo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>GithubRepo</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    Github Repository name
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

<FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    Language which you are using
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
        
      )
}

export default EditRoomForm