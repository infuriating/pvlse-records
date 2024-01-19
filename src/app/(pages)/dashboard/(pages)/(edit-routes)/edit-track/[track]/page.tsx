import { preloadQuery } from "convex/nextjs";
import { api } from "../../../../../../../../convex/_generated/api";
import EditTrackForm from "./components/EditTrackForm";

export default async function ArtistWrapper({
  params,
}: {
  params: { track: string };
}) {
  const track = params.track.replaceAll("%20", " ");

  const preloadedTasks = await preloadQuery(api.tracks.getAll);
  return <EditTrackForm track={track} preloadedTasks={preloadedTasks} />;
}
