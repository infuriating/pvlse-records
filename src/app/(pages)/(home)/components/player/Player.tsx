"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStepForward } from "@fortawesome/free-solid-svg-icons";
import { faStepBackward } from "@fortawesome/free-solid-svg-icons";
import { faRandom } from "@fortawesome/free-solid-svg-icons";
import { faRedo } from "@fortawesome/free-solid-svg-icons";
import PlayPauseButton from "./PlayPauseButton";

export default function Player({
  playing,
  togglePlayPause,
  handleTrackChange,
  trackTime,
  currentTime,
}: {
  playing: boolean;
  togglePlayPause: () => void;
  handleTrackChange: (direction: "next" | "previous") => void;
  trackTime: number;
  currentTime: number;
}) {
  const getCurrentTime = (currentTime: number) => {
    const minutes = Math.floor(currentTime / 60);
    const seconds = Math.floor(currentTime % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const getTrackTime = (trackTime: number) => {
    const minutes = Math.floor(trackTime / 60);
    const seconds = Math.floor(trackTime % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const getTrackProgress = (currentTime: number, duration: number) => {
    return (currentTime / duration) * 100;
  };

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex gap-x-2 items-center text-xs font-medium">
        <p>{getCurrentTime(currentTime)}</p>
        <div className="w-64">
          <div className="relative w-full bg-muted h-2 rounded-lg">
            <div
              style={{ width: `${getTrackProgress(currentTime, trackTime)}%` }}
              className="absolute bg-primary z-10 h-2 rounded-lg"
            />
          </div>
        </div>
        <p>{getTrackTime(trackTime)}</p>
      </div>
      <div className="flex gap-x-6 justify-center items-center">
        <FontAwesomeIcon icon={faRedo} className="h-6 cursor-pointer" />
        <FontAwesomeIcon
          icon={faStepBackward}
          className="h-6 cursor-pointer"
          onClick={() => handleTrackChange("previous")}
        />
        <PlayPauseButton playing={playing} togglePlayPause={togglePlayPause} />
        <FontAwesomeIcon
          icon={faStepForward}
          className="h-6 cursor-pointer"
          onClick={() => handleTrackChange("next")}
        />
        <FontAwesomeIcon icon={faRandom} className="h-6 cursor-pointer" />
      </div>
    </div>
  );
}
