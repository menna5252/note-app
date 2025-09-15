'use server'

import { getAuthToken } from '@/lib/getToken';


export async function  getUserNotes({ tags }: { tags?: string[] } = {}){
   
const token = await getAuthToken()

if(!token)
   {
    throw new Error('Unathenticated')
   }
console.log(token)
    
    try{
        const response = await fetch(`${process.env.API_BASE_URL}/notes`,{
            headers:{
                token:'3b8ny__'+token
            },
            cache:'no-store'
        })
        const payload = await response.json()
        return payload
    }
    catch(err){
        console.log(err)
    }
}

