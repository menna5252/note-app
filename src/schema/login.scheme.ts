import {  z } from "zod"

export const LoginFormSchema = z.object({
    email:z.email('email invalid'),
    password:z.string().nonempty('Password is required').regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,'invalid password'),
  
})


export type loginFormType  = z.infer<typeof LoginFormSchema>
