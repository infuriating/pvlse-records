"use client";

import { Skeleton } from "@/components/ui/skeleton";
import Player from "./Player";
import { useEffect, useRef, useState } from "react";
import { Slider } from "@/components/ui/slider";
import { VolumeIcon, Volume1Icon, Volume2Icon } from "lucide-react";
import Image from "next/image";

export default function FooterTrack({ playerTracks }: { playerTracks: any }) {
  const [playing, setPlaying] = useState(false);
  const [trackIndex, setTrackIndex] = useState(
    Math.floor(Math.random() * playerTracks.length)
  );
  const [track, setTrack] = useState(playerTracks[trackIndex]);
  const [audio, setAudio] = useState(new Audio(track.filePath));
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
      if (repeat) {
        audioCurrent.currentTime = 0;
        audioCurrent.play();
        setTrackTime(0);
        return;
      }
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
      const audio = new Audio(filePath);
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
    getAudioDuration(playerTracks[trackIndex].filePath)
      .then((duration) => setAudioDuration(duration))
      .catch((error) => console.error(error));
  }, [trackIndex, playerTracks]);

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
        newTrackIndex = Math.floor(Math.random() * playerTracks.length);
      }
    } else if (repeat && direction === "next") {
      newTrackIndex = trackIndex;
    } else if (direction === "next") {
      newTrackIndex =
        trackIndex === playerTracks.length - 1 ? 0 : trackIndex + 1;
    } else {
      newTrackIndex =
        trackIndex === 0 ? playerTracks.length - 1 : trackIndex - 1;
    }

    setTrackIndex(newTrackIndex);
    setTrack(playerTracks[newTrackIndex]);
    const newAudio = new Audio(playerTracks[newTrackIndex].filePath);
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

  const setCurrentTime = (currentTime: number) => {
    audioRef.current.currentTime = currentTime;
    setTrackTime(currentTime);
  };

  return (
    <div className="flex relative w-full">
      {track.coverImage ? (
        <Image
          src={track.coverImage}
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
          {track.artists
            .filter((artist: string) => artist)
            .map((artist: string, index: number, self: any) => (
              <span key={index}>
                {artist}
                {index !== self.length - 1 && ", "}
              </span>
            ))}
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
          setCurrentTime={setCurrentTime}
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
