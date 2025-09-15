// src/actions/notes.ts
"use server"

import { getAuthToken } from "@/lib/getToken"
import { revalidateTag } from "next/cache"

export async function addNote(title: string, content: string) {
  const token = await getAuthToken()
  if (!token) throw new Error("Unauthenticated")

 try{
    const res = await fetch(`${process.env.API_BASE_URL}/notes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: "3b8ny__" + token,
        },
        body: JSON.stringify({ title, content }),
        cache: "no-store",
      })
      revalidateTag("notes")
    
      if (!res.ok) throw new Error("Failed to add note")
    
      const data = await res.json()
    //   return data.note 
      
 }
 catch(err){
    console.log(err)
 }
}
