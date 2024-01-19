import { preloadQuery } from "convex/nextjs";
import { api } from "../../../../../../../../convex/_generated/api";
import EditArtistForm from "./components/EditArtistForm";

export default async function ArtistWrapper({
  params,
}: {
  params: { artist: string };
}) {
  const artist = params.artist.replaceAll("%20", " ");

  const preloadedTasks = await preloadQuery(api.artists.getAll);
  return <EditArtistForm artist={artist} preloadedTasks={preloadedTasks} />;
}
