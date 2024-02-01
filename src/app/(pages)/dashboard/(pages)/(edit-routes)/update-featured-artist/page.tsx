import { preloadQuery } from "convex/nextjs";
import { api } from "../../../../../../../convex/_generated/api";
import UpdateFeaturedArtist from "./components/UpdateFeaturedArtist";

export default async function UpdateFeaturedArtistWrapper() {
  const preloadedTasks = await preloadQuery(
    api.featuredArtist.getFeaturedArtist
  );
  const preloadedArtists = await preloadQuery(api.artists.getAll);
  return (
    <UpdateFeaturedArtist
      preloadedTasks={preloadedTasks}
      preloadedArtists={preloadedArtists}
    />
  );
}
