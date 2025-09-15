import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          name: "Email",
          type: "email",
          placeholder: "username@gmail.com",
        },
        password: {
          name: "Password",
          type: "password",
          placeholder: "*******",
        },
      },
      authorize: async (credentials) => {
        console.log(credentials);

        try {
          const res = await fetch(
            `https://note-sigma-black.vercel.app/api/v1/users/signIn`,{
      
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: credentials?.email,
                password: credentials?.password,
              }),
            }
          );
          const data = await res.json();
          console.log(data)
          if (!res.ok) {
            throw new Error(data.msg || "Something went wrong");
          }
         const decoded =  JSON.parse(atob(data.token.split(".")[1]));
          return {
            id: decoded,
            token: data.token,
          };
        } catch (err) {
          console.log(err);
          throw new Error((err as Error).message || "Something went wrong");
        }
      },
    }),
  ],
  callbacks:{
    async jwt({token,user}){
     
        if(user){
            token.token = user.token;
        }

        return token
  }
,
    async session({session}){
     
        return session;
    }},
  pages:{
    signIn: "/login",

  }
};
