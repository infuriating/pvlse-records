export default function TrackProgression({
  trackTime,
  currentTime,
}: {
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
    <div className="flex gap-x-2 items-center text-xs font-medium">
      <p>{getCurrentTime(currentTime)}</p>
      <div className="w-64">
        <div className="relative w-full bg-muted h-2 rounded-lg transition-all cursor-pointer">
          <div
            style={{ width: `${getTrackProgress(currentTime, trackTime)}%` }}
            className="absolute bg-primary z-10 h-2 rounded-lg transition-all"
          />
        </div>
      </div>
      <p>{getTrackTime(trackTime)}</p>
    </div>
  );
}
