"use client"


import React, { createContext, useContext, Dispatch, SetStateAction, useState, ReactNode  } from "react";


interface ContextProps {
    setOpen : Dispatch<SetStateAction<boolean>>;
    open : boolean,
    
   
}

const GlobalContext = createContext<ContextProps>({
    open : false,
    setOpen : () => {},
   
});

interface GlobalContextProviderProps {
    children: ReactNode;
}

export const GlobalContextProvider: React.FC<GlobalContextProviderProps> = ({ children }) => {
    const [open , setOpen ] = useState<boolean>(false);
    

    return (
        <GlobalContext.Provider value={{ 
             open , setOpen , 
             }}>
                
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => useContext(GlobalContext);