const NewArrival = ({ track }) => {
  return (
      <div class="flex flex-row bg-black rounded-3xl h-64">
        <div class="px-6 py-8 sm:p-10 sm:pb-6">
          <div class="w-full">
            <div>
              <img
                src={track.artwork["480x480"]}
                alt={track.title}
                className="rounded w-full h-auto object-cover"
              />
              
            </div>
          </div>
        </div>
        <div class="flex flex-col items-start justify-center py-auto px-6 pb-8 sm:px-8">
            <p>New Arrival</p>
            <h2 class="text-base font-medium tracking-tighter text-white lg:text-3xl">
                {track.title}
              </h2>
              <p class="mt-2 text-sm text-gray-100">{track.user.name}</p>
              <p class="mt-2 text-sm text-gray-100">
                {track.formattedDuration}
              </p>
          <a
            href={track.fullPermalink}
            target="_blank"
            rel="noopener noreferrer"
            aria-describedby="tier-starter"
            class="items-center justify-center px-6 py-2.5 mt-4 text-center text-black duration-200 bg-white border-2 border-white rounded-full nline-flex hover:bg-transparent hover:border-white hover:text-white focus:outline-none focus-visible:outline-white text-sm focus-visible:ring-white"
          >
            Listen on Audius
          </a>
        </div>
      </div>
    
  );
};

export default NewArrival;
