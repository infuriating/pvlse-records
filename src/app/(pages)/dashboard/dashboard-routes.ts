export const addRoutes = [
  {
    path: "/dashboard/add-artist",
    name: "Add Artist",
    description: "Add a new artist to the database.",
  },
  {
    path: "/dashboard/add-track",
    name: "Add Track",
    description: "Add a new track to the database.",
  },
  {
    path: "/dashboard/add-player-track",
    name: "Add Player Track",
    description: "Add a new player track to the database.",
  },
];

export const editRoutes = [
  {
    path: "/dashboard/edit-artist",
    name: "Edit Artist",
    description: "Edit an existing artist in the database.",
  },
  {
    path: "/dashboard/edit-track",
    name: "Edit Track",
    description: "Edit an existing track in the database.",
  },
  {
    path: "/dashboard/edit-player-track",
    name: "Edit Player Track",
    description: "Edit an existing player track in the database.",
  },
  {
    path: "/dashboard/update-featured-artist",
    name: "Update Featured Artist",
    description: "Update the current featured artist.",
  },
];

export const deleteRoutes = [
  {
    path: "/dashboard/delete-artist",
    name: "Delete Artist",
    description: "Remove an artist that is no longer apart of the label.",
  },
  {
    path: "/dashboard/delete-track",
    name: "Delete Track",
    description: "Remove a track that is no longer needed.",
  },
  {
    path: "/dashboard/delete-player-track",
    name: "Delete Player Track",
    description: "Remove a player track that is no longer needed.",
  },
];
