"use client";

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { UserCollections } from '@/components/userCollections';
import { ICollection } from '@/types/collections';
import Loading from "../loading";
import { toast } from "react-hot-toast"
import { Typography , Box } from "@mui/material";
import { useRouter } from 'next/navigation';
import { addFeedBacksToCollection }  from "@/actions/collections";
import { useGlobalContext } from '@/components/context';

const Collections = () => {
  const { data: session } = useSession();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedBugId, setSelectedBugId] = useState<string | null>(null);
  const [userCollections, setUserCollections] = useState<ICollection[] | null>(null);
  const [isLoading, setIsLoading] = useState(false); 
  const { collectionId } = useGlobalContext();

  const router = useRouter();
  const isCollectionsPage = true

  useEffect(() => {
    async function fetchAllCollections() {
      if (session?.user?.email) {
        const url = `/api/all-collections/${session.user.email}`;
        try {
          const response = await fetch(url);
          if (!response.ok) {
            toast.error("Something went wrong");
            return
          };

          const data = await response.json();
          setUserCollections(data);
        } catch (error) {
          console.error("There was a problem with the fetch operation:", error);
        } finally {
          setIsLoading(false); 
        }
      } else {
        setIsLoading(false); 
      }
    }

    fetchAllCollections();
  }, [session?.user?.email]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>, id: string) => {
    setAnchorEl(event.currentTarget);
    setSelectedBugId(id);
  };
  

  const handleClose = async (id: string, status: string) => {
    setAnchorEl(null);
    setSelectedBugId(null);
    
    const bodyRequest = JSON.stringify({
      email: session?.user?.email,
      collectionId: id,
    });
  
    const headers = {
      'Content-Type': 'application/json',
    };
  
    const url = status === "Added"
      ? "/api/remove-progress"
      : "/api/add-progress";
  
    try {
      const result = await fetch(url, {
        method: "POST",
        headers,
        body: bodyRequest,
      });
  
      console.log({
          result : result 
      })
      if (!result.ok) {
        throw new Error("Request failed with status " + result.status);
      }
  
      toast.success("Updated");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };
  
  

  const addToCollections = async ( id   :  string ) =>{
    try {
      const res  : string = await addFeedBacksToCollection(collectionId , session?.user?.email as string , id  )
      toast.success(res)
    }catch(err : any ){
      toast.error(err.message)
    }
  }

  if (isLoading) {
    return <Loading />;
  }

  if (!userCollections || userCollections.length <= 0) {
    return (
      <Box mt="130px" textAlign="center">
        <Typography variant="h5">No collections found yet | Make sure you integrated your website with our package</Typography>
      </Box>
    );
  }



  return (
    <>
      {userCollections && userCollections.map((bug: ICollection) => (
        <UserCollections
          key={bug.id} 
          bug={bug}
          handleClick={handleClick}
          handleClose={handleClose}
          selectedBugId={selectedBugId}
          anchorEl={anchorEl}
          email ={ session?.user?.email as string }
          isCollectionsPage={isCollectionsPage}
          addToCollections={addToCollections}
        />
      ))}
    </>
  );
};

export default Collections;
