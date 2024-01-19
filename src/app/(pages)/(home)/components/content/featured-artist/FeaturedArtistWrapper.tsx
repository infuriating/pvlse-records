import { preloadQuery } from "convex/nextjs";
import FeaturedArtist from "./FeaturedArtist";
import { api } from "../../../../../../../convex/_generated/api";

export async function FeaturedArtistWrapper() {
  const preloadedTasks = await preloadQuery(
    api.featuredArtist.getFeaturedArtist
  );
  return <FeaturedArtist preloadedTasks={preloadedTasks} />;
}
