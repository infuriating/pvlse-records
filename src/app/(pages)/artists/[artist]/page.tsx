import { preloadQuery } from "convex/nextjs";
import Artist from "./components/Artist";
import { api } from "../../../../../convex/_generated/api";

export default async function ArtistWrapper({
  params,
}: {
  params: { artist: string };
}) {
  const artist = params.artist.replaceAll("%20", " ");

  const preloadedTasks = await preloadQuery(api.artists.getAll);
  const preloadedTracks = await preloadQuery(api.tracks.getAll);
  return (
    <Artist
      artist={artist}
      preloadedTasks={preloadedTasks}
      preloadedTracks={preloadedTracks}
    />
  );
}
