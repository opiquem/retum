import { InitialModal } from '@/components/modals/initial-modal';
import { getInitialProfile } from '@/lib/profile';
import { getFirstServer } from '@/lib/server';
import { redirect } from 'next/navigation';

export default async function SetupPage() {
  const profile = await getInitialProfile();

  const server = await getFirstServer(profile.id);

  if (server) {
    redirect(`/servers/${server.id}`);
  }

  return <InitialModal />;
}
