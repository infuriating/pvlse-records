import { preloadQuery } from "convex/nextjs";
import { api } from "../../../../../../../../convex/_generated/api";
import DeleteTrackConfirmation from "./components/DeleteTrackConfirmation";

export default async function TrackWrapper({
  params,
}: {
  params: { track: string };
}) {
  const track = params.track.replaceAll("%20", " ");

  const preloadedTasks = await preloadQuery(api.tracks.getTrack, {
    title: track,
  });
  return <DeleteTrackConfirmation preloadedTasks={preloadedTasks} />;
}
