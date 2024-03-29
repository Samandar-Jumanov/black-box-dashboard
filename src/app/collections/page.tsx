"use client";

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { UserCollections } from '@/components/userCollections';
import { ICollection } from '@/types/collections';
import Loading from "../loading";
import { toast } from "react-hot-toast"
import { Typography , Box  , Button } from "@mui/material";
import { useRouter } from 'next/navigation';
import { addFeedBacksToCollection , deleteCollection }  from "@/actions/collections";
import { useGlobalContext } from '@/components/context';

const Collections = (  ) => {
  const { data: session } = useSession();
  const [userCollections, setUserCollections] = useState<ICollection[] | null>(null);
  const [isLoading, setIsLoading] = useState(false); 
  const { collectionId, setIsCollctionsPage } = useGlobalContext();
  
  
  const router = useRouter();

  const routeToCollection = ( id : string  ) =>{
      router.push(`/collections/${id}`)
  }



  useEffect(() => {
    async function fetchAllCollections() {
      setIsCollctionsPage(true)
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


  const removeCollection = async ( id : string ) =>{
     try {
      const res = await deleteCollection(session?.user?.email as string  , id )
      toast.success(res)
     }catch(err : any ) {
        toast.error("Something went wrong")
     }
  }

  const updateCollectionStatus =  async ( id: string, status: string) =>{
  
    
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
      
  }


  
  

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
        <Typography variant="h5">No collections found yet </Typography>
          <Button onClick={() => router.push('/collections/create')}  variant="contained">  Create one </Button>
      </Box>
    );
  }



  return (
    <>
          <Button onClick={() => router.push('/collections/create')}  variant="contained">  Create one </Button>

      {userCollections && userCollections.map((bug: ICollection) => (
        <UserCollections
          key={bug.id} 
          bug={bug}
          addToCollections={addToCollections}
          routeToCollection = {routeToCollection}
          updateCollectionStatus={updateCollectionStatus}
          removeCollection={removeCollection}
        />
      ))}
    </>
  );
};

export default Collections;
