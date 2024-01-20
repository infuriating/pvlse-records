import { preloadQuery } from "convex/nextjs";
import { api } from "../../../../../../../../convex/_generated/api";
import DeletePlayerTrackConfirmation from "./components/DeletePlayerTrackConfirmation";

export default async function TrackWrapper({
  params,
}: {
  params: { playerTrack: string };
}) {
  const playerTrack = params.playerTrack.replaceAll("%20", " ");

  const preloadedTasks = await preloadQuery(api.playerTracks.getPlayerTrack, {
    title: playerTrack,
  });
  return <DeletePlayerTrackConfirmation preloadedTasks={preloadedTasks} />;
}
