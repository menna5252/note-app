import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";



export async  function getAuthToken(){
const authToken = (await cookies()).get('next-auth.session-token')?.value;
const decodedToken = await decode({token:authToken,secret:process.env.NEXTAUTH_SECRET!})
console.log('tokendddd',decodedToken?.token)

return decodedToken?.token
}