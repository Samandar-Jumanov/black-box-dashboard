"use client"
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { UserCollections } from '@/components/userCollections';
import { ICollection } from '@/types/collections';
import Loading from "../loading";
import { toast } from "react-hot-toast"

const Collections = () => {
  const { data: session } = useSession();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedBugId, setSelectedBugId] = useState<string | null>(null);
  const [userCollections, setUserCollections] = useState<ICollection[] | null>(null);
  const [isLoading, setIsLoading] = useState(true); 

  
  useEffect(() => {
    async function fetchAllCollections() {
      if (session?.user?.email) {
        const url = `https://black-box-dashboard.vercel.app/api/all-collections/${session.user.email}`;
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

  const handleClose = (id: string, status: string) => {
    setAnchorEl(null);
    setSelectedBugId(null);
  };

  if (isLoading) {
    return <Loading />;
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
        />
      ))}
    </>
  );
};

export default Collections;
