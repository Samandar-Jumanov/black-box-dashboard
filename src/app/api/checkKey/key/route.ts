import prisma from "../../../../../prisma/prisma";

export const GET =  async (  request : Request , { params } : any ) =>  {
  try {
    const key: string = String(params.key);

    if (!key) {
      return new Response("No key provided");
    }

    const result = await prisma.apiKey.findUnique({
      where: { key: key },
    });

    if (!result) {
      return new Response("No key found, please check your secret key");
    }

    return new Response(JSON.stringify(true) , { status : 200})
  } catch (err: any) {
    console.error({
      error: err,
    });
    return new Response("Something went wrong")
  }
}
