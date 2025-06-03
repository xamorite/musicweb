const TrackCard = ({ track }) => {
  return (
    <div class="flex flex-col rounded-3xl me-4">
      <div class="">
        <div class="grid items-center justify-center w-full grid-cols-1 text-left">
          <div>
            <img
              src={track.artwork["480x480"]}
              alt={track.title}
              className="rounded"
            />
            <h2 className="text-base tracking-tighter text-white truncate whitespace-nowrap overflow-hidden">
              {track.title}
            </h2>
            <p className="mt-2 text-sm text-gray-100 truncate whitespace-nowrap overflow-hidden">
              {track.user.name}
            </p>

            <p class="mt-2 text-sm text-gray-100">{track.formattedDuration}</p>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default TrackCard;
