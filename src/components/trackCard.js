const TrackCard = ({ track }) => {
  return (
    <div class="flex flex-col bg-black rounded-3xl me-4">
      <div class="px-6 py-8 sm:p-10 sm:pb-6">
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
      <div class="flex px-6 pb-8 sm:px-8">
        <a
          href={track.fullPermalink}
          target="_blank"
          rel="noopener noreferrer"
          aria-describedby="tier-starter"
          class="items-center justify-center w-full px-6 py-2.5 text-center text-black duration-200 bg-white border-2 border-white rounded-full nline-flex hover:bg-transparent hover:border-white hover:text-white focus:outline-none focus-visible:outline-white text-sm focus-visible:ring-white"
        >
          Play
        </a>
      </div>
    </div>
  );
};

export default TrackCard;
