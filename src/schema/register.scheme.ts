import {  z } from "zod"

export const RegisterFormSchema = z.object({
    name: z.string().nonempty('Name is Required').min(3,'3 char').max(10,'max 10'),
    email:z.email('email invalid'),
    password:z.string().nonempty('Password is required').regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,'invalid password'),
    age:z.string().nonempty('age is required').regex(/^(?:[3-9]|[1-9][0-9]|1[0-9]{2}|200)$/,'invalid age'),
    phone:z.string().nonempty('phone is required').regex(/01[0125][0-9]{8}$/,'invalid egypt number')

})

export type RegisterFormType  = z.infer<typeof RegisterFormSchema>



