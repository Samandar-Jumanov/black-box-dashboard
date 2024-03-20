import type { Metadata } from "next";
import SideBarLayout from "@/components/dashboard"
// import './globals.css'
import Provider from "@/components/provider"
import { GlobalContextProvider } from "@/components/context";
import ToasterContext from "@/components/toaster-context";


export const metadata: Metadata = {
  title: "Black box ",
  description: "Accept  && Improve  ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
       <body>
        <Provider> 
            <GlobalContextProvider > 
              <ToasterContext />
                <SideBarLayout />
                 {children}
              </GlobalContextProvider>
          </Provider>
        </body>
    </html>
  );
};