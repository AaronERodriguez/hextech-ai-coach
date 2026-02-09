'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import {z} from 'zod'
import { toast } from 'sonner'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { redirect } from 'next/navigation'

type Props = {}

const formSchema =  z.object({
  summonerName: z.string().min(1, "Summoner name is required"),
  tagLine: z.string().min(1, "Tag line is required"),
  region: z.string().min(1, "Region is required"),
})

const SearchBar = () => {
    const [disabled, setDisabled] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            summonerName: '',
            tagLine: '',
            region: '',
        }
    })

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        // Here you would typically make an API call to fetch the user data based on the form input
        setDisabled(true)
        fetch('/api/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(mes => {
            if (mes.message.gameName == undefined) {
                console.log("User not found")
                toast.error("User not found. Please check the summoner name, tag line, and region.")
            } else {
                redirect(`/summoners/${mes.message.region}/${mes.message.puuid}`) // Redirect to the summoner's page using region and puuid
            }
            setDisabled(false)
        })
    }

  return (
     <div className='w-full  gap-2'>
        <div className='flex flex-row'>
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-row justify-center items-center">
                <FormField
                control={form.control}
                name="summonerName"
                render={({ field }) => (
                    <FormItem className='bg-secondary rounded-md'>
                    <FormControl>
                        <Input placeholder="Summoner Name" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField 
                control={form.control}
                name="tagLine"
                render={({ field }) => (
                    <FormItem className='bg-secondary rounded-md'>
                    <FormControl>
                        <Input placeholder="Tag Line" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField 
                control={form.control}
                name="region"
                render={({ field }) => (
                    <FormItem className='bg-secondary rounded-md'>
                    <FormLabel>
                        <FormControl>
                        <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select Region" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="NA1">NA</SelectItem>
                                <SelectItem value="EUW1">EUW</SelectItem>
                                <SelectItem value="EUN1">EUNE</SelectItem>
                                <SelectItem value="LA1">LAN</SelectItem>
                                <SelectItem value="LA2">LAS</SelectItem>
                                <SelectItem value="BR1">BR</SelectItem>
                                <SelectItem value="JP1">JP</SelectItem>
                                <SelectItem value="KR">KR</SelectItem>
                                <SelectItem value="OC1">OCE</SelectItem>
                                <SelectItem value="RU">RU</SelectItem>
                                <SelectItem value="TR1">TR</SelectItem>
                                <SelectItem value="ME1">ME</SelectItem>
                                <SelectItem value="SEA">SEA</SelectItem>
                                <SelectItem value="TW2">TW</SelectItem>
                                <SelectItem value="VN2">VN</SelectItem>
                                <SelectItem value="SG2">SG</SelectItem>
                            </SelectContent>
                        </Select>
                    </FormControl>
                    </FormLabel>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <Button type="submit" disabled={disabled} variant={'secondary'}>Submit</Button>
            </form>
            </Form>
        </div>
    </div>
  )
}

export default SearchBar