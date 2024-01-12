import Border from "@/components/ui/border";
import { Separator } from "@/components/ui/separator";
import React from "react";
import Player from "./Player";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <>
      <div className="absolute bottom-0 w-full">
        <Separator />
        <div className="py-4 px-6 flex items-center gap-x-6 w-full">
          <div className="flex gap-x-4">
            <FontAwesomeIcon icon={faXTwitter} className="h-[80px]" />
            <FontAwesomeIcon icon={faInstagram} />
            <FontAwesomeIcon icon={faYoutube} />
          </div>
          <Border size={86} />
          <div className="flex relative w-full">
            <div className="h-20 border aspect-square" />
            <div className="absolute bottom-0 left-24">
              <p className="text-muted-foreground text-[0.65rem]">
                HOTTEST RELEASE
              </p>
              <p className="text-xl font-bold leading-5">nevoa</p>
              <p className="text-sm">
                <span className="text-muted-foreground">by </span>dashie & ISXRO
              </p>
            </div>
            <div className="flex justify-center items-center absolute w-full">
              <Player />
            </div>
          </div>
          <Border size={86} />
          <div className="flex w-40 justify-end">
            <p className="text-sm font-bold">© 2024 PVLSE</p>
          </div>
        </div>
      </div>
    </>
  );
}
