import { preloadQuery } from "convex/nextjs";
import { api } from "../../../../../convex/_generated/api";
import Track from "./components/Track";

export default async function TrackWrapper({
  params,
}: {
  params: { track: string };
}) {
  const track = params.track.replaceAll("%20", " ");

  const preloadedTracks = await preloadQuery(api.tracks.getAll);
  return <Track track={track} preloadedTracks={preloadedTracks} />;
}
