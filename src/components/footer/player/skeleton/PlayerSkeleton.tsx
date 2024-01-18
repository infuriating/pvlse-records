import Border from "@/components/ui/border";
import { Separator } from "@/components/ui/separator";
import {
  faInstagram,
  faXTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import TrackSkeleton from "./TrackSkeleton";

export default function PlayerSkeleton() {
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
          <div>
            <TrackSkeleton />
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
