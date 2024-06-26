import { Providers } from "@/app/providers";
import { db } from "@/db";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { DefaultSession, getServerSession , AuthOptions} from "next-auth";
import { Adapter } from "next-auth/adapters";
import Github from "next-auth/providers/github";

declare module "next-auth"{
    interface Session extends DefaultSession{
        user:{
            id:string;
        } & DefaultSession['user']
    }
}


export const authConfig : AuthOptions = {
    adapter: DrizzleAdapter(db) as Adapter, // connect application with drizzle db
    session:{

        strategy:"jwt"
    },

    jwt: {
        secret: process.env.NEXTAUTH_SECRET,
      },

    providers: [
       Github({
         clientId: process.env.GITHUB_ID!,
         clientSecret: process.env.GITHUB_SECRET!,
       }),
       
       ],
    
    callbacks:{
        async jwt({ token, user }) {
          console.log("user in callback: ", user)
            if (user) {
              const dbUser = await db.query.users.findFirst({
                where: (users, { eq }) => eq(users.email, token.email!),
              });


           
            //{eq}: This is a destructured object, extracting the eq function, which is typically used to define an equality condition.

            if (dbUser) {
                token.id = dbUser.id;
                token.name = dbUser.name;
                token.email = dbUser.email;
                token.picture = dbUser.image;
              } else {
                // Handle the case where the user is not found in the database
                console.warn("User not found in the database");
              }
            }
            return token;
          },

        async session({token, session}){
            console.log("session token: ", token, "session : ", session)
            if(token){
                session.user={
                    id:token.id as string,
                    name:token.name,
                   email:token.email,
                   image:token.picture

                }
            }
            return session;
        }
        
    }

   } satisfies AuthOptions;



export function getSession(){
  console.log("authConfig: ", authConfig)
  
    return getServerSession(authConfig)
}