"use client";

import { Skeleton } from "@/components/ui/skeleton";
import Player from "./Player";
import { useEffect, useRef, useState } from "react";
import { PlayerTracks } from "@/lib/player-tracks";
import { Slider } from "@/components/ui/slider";
import { VolumeIcon, Volume1Icon, Volume2Icon } from "lucide-react";
import Image from "next/image";

export default function FooterTrack() {
  const [playing, setPlaying] = useState(false);
  const [trackIndex, setTrackIndex] = useState(
    Math.floor(Math.random() * PlayerTracks.length)
  );
  const [track, setTrack] = useState(PlayerTracks[trackIndex]);
  const [audio, setAudio] = useState(new Audio(`./audio/${track.filePath}`));
  const [audioDuration, setAudioDuration] = useState(0);
  const [trackTime, setTrackTime] = useState(0);
  const [volume, setVolume] = useState(0.05);
  const [volumeIcon, setVolumeIcon] = useState(<Volume1Icon />);
  const [shuffled, setShuffled] = useState(false);
  const [repeat, setRepeat] = useState(false);

  const audioRef = useRef(audio);
  audioRef.current.volume = volume;

  useEffect(() => {
    const audioCurrent = audioRef.current;
    audioCurrent.volume = volume;

    const timeUpdateHandler = () => {
      setTrackTime(audioCurrent.currentTime);
    };

    const endedHandler = () => {
      handleTrackChange("next");
    };

    audioCurrent.addEventListener("timeupdate", timeUpdateHandler);
    audioCurrent.addEventListener("ended", endedHandler);

    return () => {
      audioCurrent.removeEventListener("timeupdate", timeUpdateHandler);
      audioCurrent.removeEventListener("ended", endedHandler);
    };
  }, [trackIndex, volume]);

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

    if (shuffled) {
      while (newTrackIndex === trackIndex) {
        newTrackIndex = Math.floor(Math.random() * PlayerTracks.length);
      }
    } else if (repeat && direction === "next") {
      newTrackIndex = trackIndex;
    } else if (direction === "next") {
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

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]); // update the volume state
  };

  const handleVolumeIcon = (volume: number) => {
    if (volume === 0) {
      setVolumeIcon(<VolumeIcon />);
    } else if (volume < 0.1) {
      setVolumeIcon(<Volume1Icon />);
    } else {
      setVolumeIcon(<Volume2Icon />);
    }
  };

  return (
    <div className="flex relative w-full">
      {track.coverImage ? (
        <Image
          src={`/track-images/${track.coverImage}`}
          alt={track.title}
          height={80}
          width={80}
          className="rounded-md h-20 border aspect-square"
        />
      ) : (
        <Skeleton className="h-20 border aspect-square" />
      )}
      <div className="absolute bottom-0 left-24">
        <p className="text-muted-foreground text-[0.65rem]">
          {track.genre.toUpperCase()}
        </p>
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
          shuffled={shuffled}
          setShuffled={setShuffled}
          repeat={repeat}
          setRepeat={setRepeat}
        />
      </div>
      <div className="flex gap-x-2 items-center absolute right-0 bottom-0 h-20">
        {volumeIcon}
        <Slider
          className="w-24"
          onValueChange={(i) => {
            handleVolumeChange(i);
            handleVolumeIcon(i[0]);
          }}
          defaultValue={[volume]}
          max={0.2}
          step={0.002}
        />
      </div>
    </div>
  );
}
