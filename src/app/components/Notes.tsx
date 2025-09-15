import React from 'react'
import { getUserNotes } from '../../actions/get-user-notes'
import { Note } from '@/interfaces/notes.interface'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from '@/components/ui/button'
import UpdateNote from './UpdateNote'
import DeleteeNote from './DeleteNote'

export default async function Notes() {
    const {notes}:{notes:Note[]} = await getUserNotes({tags: ["notes"] })
    console.log(notes)   
       return (
        <ScrollArea className="h-[80vh] w-full rounded-md border p-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {notes.length>0?  notes.map((note) => (
            <Card key={note._id} className="hover:shadow-xl transition-shadow duration-200">
              <CardHeader>
                <CardTitle className="truncate">{note.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {note.content}
                </p>

                <p className="mt-2 text-xs text-right text-gray-500">
                  {new Date(note.createdAt).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true, })}
                </p>
                <div className="flex gap-x-4">
                  <UpdateNote id={note._id} defaultValTitle={note.title} defaultValContent={note.content}/>
                  <DeleteeNote id={note._id}/>
                </div>
              </CardContent>
            </Card>
          )):<p>No notes yet.</p>}
        </div>
      </ScrollArea>
  )
}
