'use server'

import { cookies } from "next/headers";
import { strict } from "assert";
import { RegisterFormType } from "@/schema/register.scheme";

export async function handleRegister(values:RegisterFormType){
 try{
    const res = await fetch(`https://note-sigma-black.vercel.app/api/v1/users/signUp`,{
      method:'post',
      body:JSON.stringify(values),
      headers:{
        'Content-Type':'application/json'
      }
      
  })
  const finalRes = await res.json(); 
  console.log(finalRes)
  if(!res.ok){
    return finalRes.msg
  }
  else{

    const cookie = await cookies();
    cookie.set('user-token',finalRes.token,{
        httpOnly:true,
        sameSite:'strict',
        maxAge:60*60*24*7
    })
    return true


  }
   }
   catch(error){
    console.log(error)
   }
}