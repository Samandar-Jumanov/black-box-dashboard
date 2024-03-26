import prisma from "../../prisma/prisma";

export const createResponseEmail = async (formData: FormData, email: string) => {
    const responseText: string = formData.get("response") as string;
    const collectionName: string = formData.get("collection") as string;

    try {
       

        return "Created";
    } catch (err : any ) {
        console.error({
            emailCreationError: err.message,
        });
       
        return err.message
    }
};
