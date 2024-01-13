interface PlayerTrack {
  title: string;
  artists: string[];
  genre: string;
  filePath: string;
  coverImage?: string;
}

export const PlayerTracks: PlayerTrack[] = [
  {
    title: "nevoa",
    artists: ["dashie", "ISXRO"],
    genre: "krushphonk",
    filePath: "nevoa.mp3",
  },
  {
    title: "digiphunk",
    artists: ["dashie", "ISXRO"],
    genre: "digital phonk",
    filePath: "digiphunk.mp3",
  },
  {
    title: "everybody Is ##starryEyed !",
    artists: ["hatena"],
    genre: "dariacore",
    filePath: "starryeyed.mp3",
    coverImage: "starryeyed.png",
  },
  {
    title: "evergreen",
    artists: ["dashie"],
    genre: "rap",
    filePath: "evergreen.mp3",
    coverImage: "evergreen.png",
  },
];
