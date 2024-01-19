import { preloadQuery } from "convex/nextjs";
import { api } from "../../../../../../../convex/_generated/api";
import EditArtist from "./components/EditArtist";

export default async function EditArtistWrapper() {
  const preloadedTasks = await preloadQuery(api.artists.getAll);
  return <EditArtist preloadedTasks={preloadedTasks} />;
}
