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
import { RegisterFormSchema, RegisterFormType } from '../../../schema/register.scheme'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { handleRegister } from '../../../actions/register.action'
import Link from 'next/link'






export default function RegisterForm() {
  const router = useRouter();

  async function onSubmit(values:RegisterFormType) {
      console.log(values) 
     const isRegistered = await handleRegister(values)
     if(isRegistered==true){
    toast.success('Account created successfully',{
      position:'top-center'
    })
    router.push('/login')
     }
     else{
          toast.error(isRegistered,{
            position:'top-center'
          })
     }
      
   }
    const form = useForm({

        defaultValues:{
            name: "",
            email:"",
            password:"",
            age:'',
            phone:""
        },
        resolver:zodResolver(RegisterFormSchema)
        })
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>User Email</FormLabel>
              <FormControl>
                <Input placeholder="email@gmail.com" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
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
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="age"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Age</FormLabel>
              <FormControl>
                <Input placeholder="22" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>User Phone</FormLabel>
              <FormControl>
                <Input placeholder="0125026666" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between">
        <Button type="submit">Create Account</Button>
<p>Already have Account? <Link href={'login'}>Login</Link></p>
        </div>
      </form>
    </Form>
  )
}
