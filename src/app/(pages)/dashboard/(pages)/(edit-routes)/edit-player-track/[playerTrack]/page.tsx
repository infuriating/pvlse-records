import { preloadQuery } from "convex/nextjs";
import { api } from "../../../../../../../../convex/_generated/api";
import EditPlayerTrackForm from "./components/EditPlayerTrackForm";

export default async function ArtistWrapper({
  params,
}: {
  params: { playerTrack: string };
}) {
  const playerTrack = params.playerTrack.replaceAll("%20", " ");

  const preloadedTasks = await preloadQuery(api.playerTracks.getPlayerTrack, {
    title: playerTrack,
  });
  return (
    <EditPlayerTrackForm
      playerTrack={playerTrack}
      preloadedTasks={preloadedTasks}
    />
  );
}
