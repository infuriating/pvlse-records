"use client";

import Border from "@/components/ui/border";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import dynamic from "next/dynamic";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import FooterSkeleton from "./player/skeleton/FooterSkeleton";

const FooterTrack = dynamic(() => import("./player/FooterTrack"), {
  ssr: false,
});

export default function Footer() {
  const playerTracks = useQuery(api.playerTracks.getAll);
  if (!playerTracks) return <FooterSkeleton />;

  return (
    <>
      <div className="hidden lg:block fixed bottom-0 w-full backdrop-blur-md">
        <Separator />
        <div className="py-4 px-6 flex items-center gap-x-6 w-full">
          <div className="flex gap-x-4 justify-center items-center">
            <FontAwesomeIcon icon={faXTwitter} className="h-[32px]" />
            <FontAwesomeIcon icon={faInstagram} className="h-[32px]" />
            <FontAwesomeIcon icon={faYoutube} className="h-[32px]" />
          </div>
          <Border size={86} />
          <FooterTrack playerTracks={playerTracks} />
          <Border size={86} />
          <div className="flex w-36">
            <p className="text-sm font-bold">© 2024 PVLSE</p>
          </div>
        </div>
      </div>
      <div className="flex lg:hidden fixed bottom-0 w-full justify-center items-center"></div>
    </>
  );
}
