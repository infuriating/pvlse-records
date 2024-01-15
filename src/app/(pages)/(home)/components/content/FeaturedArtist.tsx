import { Skeleton } from "@/components/ui/skeleton";
import { artists } from "@/lib/artists";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faSoundcloud } from "@fortawesome/free-brands-svg-icons";
import { faSpotify } from "@fortawesome/free-brands-svg-icons";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import SocialIcon from "@/components/SocialIcon";

export default function FeaturedArtist() {
  const artist = artists[Math.floor(Math.random() * artists.length)];

  return (
    <div className="grid place-items-center pt-8 md:pt-0 md:place-items-end w-full pr-12">
      <p className="text-sm font-bold">Featured Artist</p>
      <div className="border mt-2 p-4">
        <div className="border h-60 xl:h-96 aspect-square rounded-lg overflow-hidden object-cover">
          {artist.image ? (
            <Image
              src={`/${artist.image}`}
              alt={artist.name}
              height={384}
              width={384}
            />
          ) : (
            <Skeleton className="h-full" />
          )}
        </div>
        <p className="font-bold text-lg pt-2 text-center">{artist.name}</p>
        <div className="flex justify-center gap-x-4 mt-2">
          {artist.socials.map((social) => (
            <Link key={social} href={social} target="_blank">
              <SocialIcon social={social} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
