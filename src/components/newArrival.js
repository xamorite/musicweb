const NewArrival = ({ track }) => {
  return (
    <div className="flex flex-col sm:flex-row bg-black rounded-3xl overflow-hidden sm:h-64">
      {/* Image Section */}
      <div className="w-full sm:w-64 h-64 sm:h-full flex-shrink-0">
        <img
          src={track.artwork["480x480"]}
          alt={track.title}
          className="w-full h-full object-cover sm:rounded-l-3xl"
        />
      </div>

      {/* Info Section */}
      <div className="flex flex-col items-start justify-center px-6 pb-8 pt-4 sm:px-8 text-white">
        <p className="text-sm text-gray-400">New Arrival</p>
        <h2 className="text-base font-medium tracking-tighter text-white lg:text-3xl">
          {track.title}
        </h2>
        <p className="mt-2 text-sm text-gray-100">{track.user.name}</p>
        <p className="mt-2 text-sm text-gray-100">{track.formattedDuration}</p>
        <a
          href={track.fullPermalink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-6 py-2.5 mt-4 text-sm font-medium text-black duration-200 bg-white border-2 border-white rounded-full hover:bg-transparent hover:border-white hover:text-white focus:outline-none"
        >
          Listen on Audius
        </a>
      </div>
    </div>
  );
};

export default NewArrival;
