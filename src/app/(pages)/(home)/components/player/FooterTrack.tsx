"use client";

import { Skeleton } from "@/components/ui/skeleton";
import Player from "./Player";
import { useEffect, useRef, useState } from "react";
import { PlayerTracks } from "@/lib/player-tracks";

export default function FooterTrack() {
  const [playing, setPlaying] = useState(false);
  const [trackIndex, setTrackIndex] = useState(
    Math.floor(Math.random() * PlayerTracks.length)
  );
  const [track, setTrack] = useState(PlayerTracks[trackIndex]);
  const [audio, setAudio] = useState(new Audio(`./audio/${track.filePath}`));
  const [audioDuration, setAudioDuration] = useState(0);
  const [trackTime, setTrackTime] = useState(0);

  const audioRef = useRef(audio);
  audioRef.current.volume = 0.02;

  useEffect(() => {
    audioRef.current.addEventListener("timeupdate", () => {
      setTrackTime(audioRef.current.currentTime);
    });
  }, [trackIndex]);

  useEffect(() => {
    audioRef.current.addEventListener("ended", () => {
      handleTrackChange("next");
    });
  }, [trackIndex]);

  const getAudioDuration = (filePath: string): Promise<number> => {
    return new Promise((resolve, reject) => {
      const audio = new Audio(`./audio/${filePath}`);
      audio.onloadedmetadata = function () {
        // @ts-ignore
        resolve(this.duration);
      };
      audio.onerror = function () {
        reject("Error loading audio file");
      };
    });
  };

  useEffect(() => {
    getAudioDuration(PlayerTracks[trackIndex].filePath)
      .then((duration) => setAudioDuration(duration))
      .catch((error) => console.error(error));
  }, [trackIndex]);

  const togglePlayPause = () => {
    setPlaying(!playing);

    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
  };

  const handleTrackChange = (direction: "next" | "previous") => {
    audioRef.current.pause();
    setTrackTime(0);

    let newTrackIndex = trackIndex;
    if (direction === "next") {
      newTrackIndex =
        trackIndex === PlayerTracks.length - 1 ? 0 : trackIndex + 1;
    } else {
      newTrackIndex =
        trackIndex === 0 ? PlayerTracks.length - 1 : trackIndex - 1;
    }

    setTrackIndex(newTrackIndex);
    setTrack(PlayerTracks[newTrackIndex]);
    const newAudio = new Audio(
      `./audio/${PlayerTracks[newTrackIndex].filePath}`
    );
    setAudio(newAudio);
    audioRef.current = newAudio;

    audioRef.current.play();
    setPlaying(true);
  };

  return (
    <div className="flex relative w-full">
      <Skeleton className="h-20 border aspect-square" />
      <div className="absolute bottom-0 left-24">
        <p className="text-muted-foreground text-[0.65rem]">HOTTEST RELEASE</p>
        <p className="text-xl font-bold leading-5">{track.title}</p>
        <p className="text-sm">
          <span className="text-muted-foreground">by </span>
          {track.artists.map((artist, index) => {
            return (
              <span key={index}>
                {artist}
                {index !== track.artists.length - 1 && ", "}
              </span>
            );
          })}
        </p>
      </div>
      <div className="flex justify-center items-center left-16 xl:left-0 absolute w-full">
        <Player
          playing={playing}
          togglePlayPause={togglePlayPause}
          handleTrackChange={handleTrackChange}
          trackTime={audioDuration}
          currentTime={trackTime}
        />
      </div>
    </div>
  );
}
