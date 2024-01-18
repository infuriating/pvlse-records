"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faStepForward } from "@fortawesome/free-solid-svg-icons";
import { faStepBackward } from "@fortawesome/free-solid-svg-icons";
import { faRandom } from "@fortawesome/free-solid-svg-icons";
import { faRedo } from "@fortawesome/free-solid-svg-icons";
import ProgressionSkeleton from "./ProgressionSkeleton";

export default function Player() {
  const buttonClassNames = "h-6 cursor-pointer transition-all hover:opacity-60";

  return (
    <div className="flex flex-col gap-y-4">
      <ProgressionSkeleton />
      <div className="flex gap-x-6 justify-center items-center">
        <FontAwesomeIcon icon={faRandom} className={buttonClassNames} />
        <FontAwesomeIcon icon={faStepBackward} className={buttonClassNames} />
        <div
          className={`h-10 rounded-full bg-primary aspect-square flex gap-x-2 justify-center items-center transition-all hover:opacity-75`}
        >
          <FontAwesomeIcon
            icon={faPlay}
            className={`h-6 invert transition-all cursor-pointer`}
          />
        </div>
        <FontAwesomeIcon icon={faStepForward} className={buttonClassNames} />
        <FontAwesomeIcon icon={faRedo} className={buttonClassNames} />
      </div>
    </div>
  );
}
