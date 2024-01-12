import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStepForward } from "@fortawesome/free-solid-svg-icons";
import { faStepBackward } from "@fortawesome/free-solid-svg-icons";
import { faRandom } from "@fortawesome/free-solid-svg-icons";
import { faRedo } from "@fortawesome/free-solid-svg-icons";
import PlayPauseButton from "./PlayPauseButton";

export default function Player() {
  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex gap-x-2 items-center text-xs font-medium">
        <p>1:25</p>
        <div className="absolute ml-8 bg-primary z-10 h-2 w-32 rounded-lg" />
        <div className="relative bg-muted h-2 w-64 rounded-lg" />
        <p>3:12</p>
      </div>
      <div className="flex gap-x-6 justify-center items-center">
        <FontAwesomeIcon icon={faRedo} className="h-6 cursor-pointer" />
        <FontAwesomeIcon icon={faStepBackward} className="h-6 cursor-pointer" />
        <PlayPauseButton />
        <FontAwesomeIcon icon={faStepForward} className="h-6 cursor-pointer" />
        <FontAwesomeIcon icon={faRandom} className="h-6 cursor-pointer" />
      </div>
    </div>
  );
}
