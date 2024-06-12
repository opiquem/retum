import { db } from "./db";

export interface Server {
  id: string;
  name: string;
  inviteUrl: string;
  profileId: string;
  createdAt: Date;
  updatedAt: Date;
}

export async function getFirstServer(profileId: string): Promise<Server | null> {
  const server = await db.server.findFirst({
    where: {
      members: {
        some: {
          profileId: profileId,
        }
      }
    }
  })

  return server;
}