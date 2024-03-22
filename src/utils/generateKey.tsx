import { v4 as uuid } from 'uuid';
import prisma from '../../prisma/prisma';

const generateKey = (): string => {
  const key = uuid();
  return key.replace(/-/g, '').slice(0, 16);
};

const createKey = async (userId: string, name?: string, description?: string) => {
  let unique = false;
  let key = "";
  let attempts = 0; 

  while (!unique && attempts < 50) { 
    key = generateKey();

    const existingKey = await prisma.apiKey.findUnique({
      where: { key: key }
    });

    if (!existingKey) {
      unique = true;
    } else {
      attempts++;
    }
  }

  if (!unique) {
    return "Failed to generate a unique key after multiple attempts.";
  }

  const newApiKey = await prisma.apiKey.create({
    data: {
      name: name ? name : "Default secret key",
      description: description ? description : "This is a default secret key. Please do not share it!",
      key: key,
      user: {
        connect: {
          id: userId
        }
      }
    }
  });

  return newApiKey.id ? "Success" + ` ${attempts}` : "Failed" + + ` ${attempts}`;
};

export default createKey;
