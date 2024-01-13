"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStepForward } from "@fortawesome/free-solid-svg-icons";
import { faStepBackward } from "@fortawesome/free-solid-svg-icons";
import { faRandom } from "@fortawesome/free-solid-svg-icons";
import { faRedo } from "@fortawesome/free-solid-svg-icons";
import PlayPauseButton from "./PlayPauseButton";
import TrackProgression from "./TrackProgression";

export default function Player({
  playing,
  togglePlayPause,
  handleTrackChange,
  trackTime,
  currentTime,
  shuffled,
  setShuffled,
  repeat,
  setRepeat,
}: {
  playing: boolean;
  togglePlayPause: () => void;
  handleTrackChange: (direction: "next" | "previous") => void;
  trackTime: number;
  currentTime: number;
  shuffled: boolean;
  repeat: boolean;
  setShuffled: React.Dispatch<React.SetStateAction<boolean>>;
  setRepeat: React.Dispatch<React.SetStateAction<boolean>>;
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

  const buttonClassNames = "h-6 cursor-pointer transition-all hover:opacity-60";

  return (
    <div className="flex flex-col gap-y-4">
      <TrackProgression trackTime={trackTime} currentTime={currentTime} />
      <div className="flex gap-x-6 justify-center items-center">
        <FontAwesomeIcon
          onClick={() => {
            setShuffled(!shuffled);
            setRepeat(false);
          }}
          icon={faRandom}
          className={`
        ${buttonClassNames} ${shuffled ? "opacity-75" : "opacity-100"}`}
        />
        <FontAwesomeIcon
          icon={faStepBackward}
          className={buttonClassNames}
          onClick={() => handleTrackChange("previous")}
        />
        <PlayPauseButton playing={playing} togglePlayPause={togglePlayPause} />
        <FontAwesomeIcon
          icon={faStepForward}
          className={buttonClassNames}
          onClick={() => handleTrackChange("next")}
        />
        <FontAwesomeIcon
          onClick={() => {
            setRepeat(!repeat);
            setShuffled(false);
          }}
          icon={faRedo}
          className={`
       ${buttonClassNames} ${repeat ? "opacity-75" : "opacity-100"}`}
        />
      </div>
    </div>
  );
}
