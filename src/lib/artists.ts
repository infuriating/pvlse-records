interface Artist {
  name: string;
  description: string;
  socials: string[];
  spotifyURL?: string;
  image?: string;
}

export const artists: Artist[] = [
  {
    name: "dashie",
    description:
      "dashie is a artist from Aberdeen, Scotland. He makes mindblowing tracks surrounding genres such as hyperpop, dariacore and brazillian phonk.",
    socials: ["https://instagram.com/1dshi", "https://soundcloud.com/dshie"],
    spotifyURL: "https://open.spotify.com/artist/6uQKiJZQe4rjkMF0HxIGTl",
    image: "dashie.png",
  },
  {
    name: "inf",
    description: "inf.",
    socials: [
      "https://instagram.com/infs.world",
      "https://twitter.com/xnfuriating",
    ],
  },
];
