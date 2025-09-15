// src/actions/notes.ts
"use server"

import { getAuthToken } from "@/lib/getToken"
import { revalidateTag } from "next/cache"

export async function deleteNote(id:string) {
  const token = await getAuthToken()
  if (!token) throw new Error("Unauthenticated")

 try{
    const res = await fetch(`${process.env.API_BASE_URL}/notes/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          token: "3b8ny__" + token,
        },
        cache: "no-store",
      })
      const data = await res.json()

    
      if (!res.ok) throw new Error(data?.msg||"Failed to update note")
    
      if(data?.msg == 'done'){
        revalidateTag("notes")
      }
      console.log(data)
      return data
      
 }
 catch(err){
    console.log(err)
    throw new Error((err as Error).message || "Something went wrong");

 }
}
