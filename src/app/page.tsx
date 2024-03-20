"use client"

import styles from "./page.module.css";
import SideBarLayout  from "@/components/dashboard"
import { useSession } from "next-auth/react";
import SignupPage from  "@/components/signup";


export default function Home() {
  const { data : session } = useSession();


  
  return (
    <main className={styles.main}>
         <SignupPage />
    </main>
  );
}
