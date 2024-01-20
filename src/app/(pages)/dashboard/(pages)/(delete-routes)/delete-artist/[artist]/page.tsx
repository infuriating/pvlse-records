import { preloadQuery } from "convex/nextjs";
import { api } from "../../../../../../../../convex/_generated/api";
import DeleteArtistConfirmation from "./components/DeleteArtistConfirmation";

export default async function ArtistWrapper({
  params,
}: {
  params: { artist: string };
}) {
  const artist = params.artist.replaceAll("%20", " ");

  const preloadedTasks = await preloadQuery(api.artists.getArtist, {
    name: artist,
  });
  return (
    <DeleteArtistConfirmation artist={artist} preloadedTasks={preloadedTasks} />
  );
}
