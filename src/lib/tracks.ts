interface Track {
  artists: string[];
  title: string;
  url?: string;
  coverImage?: string;
}

export const Tracks: Track[] = [
  {
    artists: ["dashie", "ISXRO"],
    title: "ultraphunk",
    url: "https://open.spotify.com/track/2rCVGFo2htxWlkDwm3klAB?si=c5a7687c13c04643",
    coverImage: "ultraphunk.png",
  },
  {
    artists: ["dashie", "ISXRO"],
    title: "orquestra phunka",
  },
  {
    artists: ["dashie", "ISXRO"],
    title: "nevoa",
  },
];
