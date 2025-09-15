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

export default function AddNote() {
    const [open, setOpen] = useState<boolean>(false)
    const form = useForm<noteFormData>({
        resolver: zodResolver(noteSchema),
      })
    
      const onSubmit = async (data: noteFormData) => {
        try {
          await addNote(data.title, data.content)
          toast.success("Note added successfully!")
          setOpen(false)
        } catch (err) {
          console.error(err)
          toast.error("Failed to add note")
        }
      }
      return (
    
         <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className='my-10' >Add Note</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add Note</DialogTitle>
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
                <Input placeholder="title...." {...field} />
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
                <Input placeholder="lorem....." {...field}/>
              </FormControl>
             
              <FormMessage />
            </FormItem>
          )}
        />
       
        <Button type="submit">Add Note</Button>
      </form>
    </Form>
            <DialogFooter className="sm:justify-start">
              
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )
      
    }
