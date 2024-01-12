"use client";

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { faPause } from "@fortawesome/free-solid-svg-icons";

export default function PlayPauseButton() {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="h-10 rounded-full bg-primary aspect-square flex gap-x-2 justify-center items-center">
      <FontAwesomeIcon
        onClick={() => setPlaying(!playing)}
        icon={playing ? faPause : faPlay}
        className={`${
          playing ? "h-6" : "h-4"
        } invert transition-all cursor-pointer`}
      />
    </div>
  );
}
