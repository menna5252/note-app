'use client'

import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
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
  import { Label } from "@/components/ui/label"
import { DialogClose } from '@radix-ui/react-dialog'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { addNote } from '../../actions/add-notes'
import { toast } from 'sonner'
import { noteFormData, noteSchema } from '@/schema/AddNote.schema'
import { updateNote } from '../../actions/update.notes'

export default function UpdateNote({id,defaultValTitle,defaultValContent}:{id:string,defaultValTitle:string,defaultValContent:string}) {
    const [open, setOpen] = useState<boolean>(false)
    const form = useForm<noteFormData>({
        resolver: zodResolver(noteSchema),
      })
    
      const onSubmit = async (data: noteFormData) => {
        try {
          const res = await updateNote(data.title, data.content,id)
        
            toast.success("Note updated successfully!")
            setOpen(false)
         
         
        
        } catch (err) {
          console.log(err)
          toast.error("Note updated failed!")

          
        }
      }
      return (
    
         <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className='' >update Note</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Update Note</DialogTitle>
            </DialogHeader>
            <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="title...." {...field} defaultValue={defaultValTitle} />
              </FormControl>
            
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Input placeholder="lorem....." {...field} defaultValue={defaultValContent}/>
              </FormControl>
             
              <FormMessage />
            </FormItem>
          )}
        />
       
        <Button type="submit">update Note</Button>
      </form>
    </Form>
            <DialogFooter className="sm:justify-start">
              
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )
      
    }
