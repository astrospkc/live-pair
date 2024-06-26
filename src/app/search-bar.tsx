'use client'

import React, { useEffect } from 'react'
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
import { useRouter, useSearchParams } from 'next/navigation'
import { SearchIcon } from 'lucide-react'
import { queryObjects } from 'v8'

const formSchema = z.object({
    search: z.string().min(2).max(50),
})

const SearchBar = () => {
    const router = useRouter()
    const query = useSearchParams()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            search: query.get("search") ?? "",
        }
    })

    const search =query.get("search") ?? "";
    console.log("search: ", search);
    useEffect(() => {
        // if (form.getValues("search") !== search) {
        //     form.setValue("search", search)
        // }
        form.setValue("search",search)
    }, [search, form])
    

    // Define a submit handler.
    // async function onSubmit(values: z.infer<typeof formSchema>) {
    function onSubmit(values: z.infer<typeof formSchema>){
        if (values.search) {
            router.push(`/?search=${values.search}`)
        } else {
            router.push('/')
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="search"
                    render={({ field }) => (
                        <FormItem>
                           
                            <FormControl>
                                <Input {...field} placeholder='search by keywords , such as typsecript, python etc' />
                            </FormControl>
                            
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">
                    <SearchIcon />
                    Search
                </Button>

                {query.get("search") && (
                    <Button type="submit" variant="link" onClick={()=>{
                        form.setValue("search","")
                            router.push("/")
                        
                    }}>
                    Clear
                    
                </Button>
                )}
            </form>
        </Form>
    )
}

export default SearchBar
