import NextAuth, { NextAuthOptions } from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import bcrypt from 'bcrypt';
import prisma from '../../../../prisma/prisma';
import CredentialsProvider from 'next-auth/providers/credentials';

const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        organizationName : { label : "name" , type : "text"},
        password: { label: "Password", type: "password" },
        isSignUp: { label: "isSignUp", type: "text" }, 
      },

      async authorize(credentials: any) {
        if (!credentials.email || !credentials.password) {
          throw new Error('Please enter an email and password');
        }

        console.log({
            credentials : credentials
        });


        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (credentials.isSignUp === "true") {

          if (user) {
            throw new Error('User already exists');
          }

          const hashedPassword = await bcrypt.hash(credentials.password, 10);

          const newUser = await prisma.user.create({
            data: {
              email: credentials.email,
              password: hashedPassword,
              organizationName : credentials.organizationName
            },
          });

          return newUser;
        } else {
          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email,
            },
          });

          if (!user) {
            throw new Error('User not found');
          }

          const passwordMatch = await bcrypt.compare(credentials.password, user?.password as string );
          if (!passwordMatch) {
            throw new Error('Incorrect password');
          }

          return user;
        }
      },
    }),
  ],
  secret: process.env.SECRET,
  session: {
    strategy: "jwt",
  },
};

const handler = NextAuth(authOptions)
export { handler as GET , handler as POST }