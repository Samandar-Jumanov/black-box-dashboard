"use client"

import React, { createContext, useContext, Dispatch, SetStateAction, useState, ReactNode } from "react";

interface ContextProps {
    setOpen: Dispatch<SetStateAction<boolean>>;
    open: boolean;
    collectionId: string[];
    setCollectionId: Dispatch<SetStateAction<string[]>>;
    isCollectionPage : boolean,
    setIsCollctionsPage : Dispatch<SetStateAction<boolean>>
}

const GlobalContext = createContext<ContextProps>({
    open: false,
    setOpen: () => {},
    setCollectionId: () => {},
    collectionId: [],
    isCollectionPage : false ,
    setIsCollctionsPage : () =>{}

} as ContextProps); 

interface GlobalContextProviderProps {
    children: ReactNode;
}

export const GlobalContextProvider: React.FC<GlobalContextProviderProps> = ({ children }) => {
    const [open, setOpen] = useState<boolean>(false);
    const [collectionId, setCollectionId] = useState<string[]>([]);
    const [ isCollectionPage ,  setIsCollctionsPage] = useState<boolean>(false)

    return (
        <GlobalContext.Provider value={{ open, setOpen,
         collectionId, setCollectionId,
         isCollectionPage,setIsCollctionsPage
          }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => useContext(GlobalContext);
