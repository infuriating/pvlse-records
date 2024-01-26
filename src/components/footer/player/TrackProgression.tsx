"use client";

import { Progress } from "@/components/ui/progress";
import { useRef, useState } from "react";

export default function TrackProgression({
  trackTime,
  currentTime,
  setCurrentTime,
}: {
  trackTime: number;
  currentTime: number;
  setCurrentTime: (currentTime: number) => void;
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
    <div className="flex gap-x-2 items-center text-xs font-medium">
      <p>{getCurrentTime(currentTime)}</p>
      <Progress
        className="w-64 h-2 cursor-pointer"
        value={getTrackProgress(currentTime, trackTime)}
        onClick={(e) => {
          setCurrentTime(
            (e.nativeEvent.offsetX / e.currentTarget.offsetWidth) * trackTime
          );
        }}
      />
      <p>{getTrackTime(trackTime)}</p>
    </div>
  );
}
