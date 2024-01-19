import { preloadQuery } from "convex/nextjs";
import { api } from "../../../../../../../convex/_generated/api";
import DeleteArtist from "./components/DeleteArtist";

export default async function DeleteArtistWrapper() {
  const preloadedTasks = await preloadQuery(api.artists.getAll);
  return <DeleteArtist preloadedTasks={preloadedTasks} />;
}
