import { preloadQuery } from "convex/nextjs";
import { api } from "../../../../../../../convex/_generated/api";
import EditPlayerTracks from "./components/EditPlayerTracks";

export default async function EditPlayerTrackWrapper() {
  const preloadedTasks = await preloadQuery(api.playerTracks.getAll);
  return <EditPlayerTracks preloadedTasks={preloadedTasks} />;
}
