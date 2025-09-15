import * as z from "zod"

export const noteSchema = z.object({
    title: z.string().min(1, "Title is required"),
    content: z.string().min(1, "Content is required"),
  })
  
 export  type noteFormData = z.infer<typeof noteSchema>