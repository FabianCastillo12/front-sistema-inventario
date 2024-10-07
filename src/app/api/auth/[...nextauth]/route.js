import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email", placeholder: "test@test.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
          {
            method: "POST",
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
            headers: { "Content-Type": "application/json" },
          }
        );
        const user = await res.json();
        
        if (user.error) throw user;

        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user,rol,nombre }) {
      return { ...token, ...user,...rol,...nombre };
    },
    async session({ session, token }) {
      session.user = token;
      return session;
    },
},
pages:{
    signIn:"/",
    
},
session:{
  maxAge:60*60*24 //hacer la prueba que se va a login cuando  pierde la session despues de un minuto
},


});

export { handler as GET, handler as POST };