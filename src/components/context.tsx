"use client"


import React, { createContext, useContext, Dispatch, SetStateAction, useState, ReactNode  } from "react";


interface ContextProps {
    setOpen : Dispatch<SetStateAction<boolean>>;
    open : boolean,
    collectionNames : string[] | null ,
    setCollectionNames :  Dispatch<SetStateAction<string[] |null >>
   
}

const GlobalContext = createContext<ContextProps>({
    open : false,
    setOpen : () => {},
    collectionNames : null,
    setCollectionNames : () => {}
   
});

interface GlobalContextProviderProps {
    children: ReactNode;
}

export const GlobalContextProvider: React.FC<GlobalContextProviderProps> = ({ children }) => {
    const [open , setOpen ] = useState<boolean>(false);
    const [ collectionNames , setCollectionNames ] = useState<string[] | null>(null)
    

    return (
        <GlobalContext.Provider value={{ 
             open , setOpen , 
             collectionNames,
             setCollectionNames
             }}>
                
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => useContext(GlobalContext);