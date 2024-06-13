import { db } from '@/lib/db';
import { auth, currentUser } from '@clerk/nextjs/server';
import { Server } from './server';

export interface Profile {
  id: string;
  userId: string;
  name: string;
  imageUrl: string;
  email: string;
  // servers: Server[];

  createdAt: Date;
  updatedAt: Date;
}

export const getInitialProfile = async () => {
  const user = await currentUser();

  if (!user) {
    throw auth().redirectToSignIn();
  }

  const profile = await db.profile.findUnique({
    where: {
      userId: user.id,
    },
  });

  if (profile) {
    return profile;
  }

  const newProfile = await db.profile.create({
    data: {
      userId: user.id,
      name: `${user.firstName} ${user.lastName}`,
      imageUrl: user.imageUrl,
      email: user.emailAddresses[0].emailAddress,
    },
  });

  return newProfile;
};

export const getCurrentProfile = async (): Promise<Profile | null> => {
  const { userId } = auth();

  if (!userId) {
    throw new Error('Unauthorized');
  }

  const profile = await db.profile.findUnique({
    where: {
      userId,
    },
  });

  return profile;
}