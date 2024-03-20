"use client";

import { useSession } from "next-auth/react";

 const Growth = () =>{
      const { data : session } = useSession();

      if(!session) {
          return <h1>  You are not allowed for this page</h1>
      }

      return <h1>  Growth </h1>
}

export default Growth;
