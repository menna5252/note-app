"use client"
import React from 'react'
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

import { toast } from 'sonner'

import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { LoginFormSchema, loginFormType } from '@/schema/login.scheme'
import Link from 'next/link'





export default function LoginForm() {
   const router = useRouter();
    const form = useForm({
        defaultValues:{
            email:"",
            password:"",
           
        },
        resolver:zodResolver(LoginFormSchema)
        })

        async function onSubmit(values:loginFormType) {
            console.log(values) 
        //    const isRegistered = await handleRegister(values)
        //    if(isRegistered==true){
        //   toast.success('Account created successfully',{
        //     position:'top-center'
        //   })
        //    }
        //    else{
        //         toast.error(isRegistered,{
        //           position:'top-center'
        //         })
        //    }
            
        //  }
        const res = await signIn('credentials',{...values,redirect:false, callbackUrl:'/'})
        console.log('res',res)
        
        if(res?.ok){
            toast.success('Welcome Back',{
                    position:'top-center'
                  }) 
                  router.push(res?.url||'/')
                   
        }
        else{
          toast.error(res?.error,{
            position:'top-center'
          }) 
        }
        
        
        }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>User Email</FormLabel>
              <FormControl>
                <Input placeholder="email@gmail.com" {...field} />
              </FormControl>
            
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>User Password</FormLabel>
              <FormControl>
                <Input placeholder="***********" {...field} type='password'/>
              </FormControl>
             
              <FormMessage />
            </FormItem>
          )}
        />
       
        <div className="flex justify-between">
        <Button type="submit">Login</Button>
        <p>{"you don't have Account?"} <Link href='/register'>Register</Link></p>
        </div>
      </form>
    </Form>
  )
}
