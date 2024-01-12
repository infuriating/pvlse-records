import Border from "@/components/ui/border";
import { Separator } from "@/components/ui/separator";
import React from "react";
import Player from "./player/Player";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { Skeleton } from "@/components/ui/skeleton";

export default function Footer() {
  return (
    <>
      <div className="hidden lg:block absolute bottom-0 w-full">
        <Separator />
        <div className="py-4 px-6 flex items-center gap-x-6 w-full">
          <div className="flex gap-x-4 justify-center items-center">
            <FontAwesomeIcon icon={faXTwitter} className="h-[32px]" />
            <FontAwesomeIcon icon={faInstagram} className="h-[32px]" />
            <FontAwesomeIcon icon={faYoutube} className="h-[32px]" />
          </div>
          <Border size={86} />
          <div className="flex relative w-full">
            <Skeleton className="h-20 border aspect-square" />
            <div className="absolute bottom-0 left-24">
              <p className="text-muted-foreground text-[0.65rem]">
                HOTTEST RELEASE
              </p>
              <p className="text-xl font-bold leading-5">nevoa</p>
              <p className="text-sm">
                <span className="text-muted-foreground">by </span>dashie & ISXRO
              </p>
            </div>
            <div className="flex justify-center items-center left-16 xl:left-0 absolute w-full">
              <Player />
            </div>
          </div>
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
