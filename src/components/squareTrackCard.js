// app/components/squareTrackCard.js
import React from 'react';

const SquareTrackCard = ({ track }) => {
  return (
    <div className="cursor-pointer group">
      {/* Square Image Area */}
      <div className="w-full aspect-square rounded-lg overflow-hidden mb-3 shadow-md">
       <img
          src={track.artwork["480x480"]}
          alt={track.title}
          className="w-full h-full object-cover sm:rounded-l-3xl"
        />
        <div className="w-full h-full bg-gray-700 flex items-center justify-center p-2">
           <span className="text-sm text-gray-300 text-center">{track.title}</span>
        </div>
        {/* Play button overlay can be added here */}
      </div>
      
      {/* Text Content */}
      <h4 className="text-base font-semibold truncate group-hover:underline">{track.title}</h4>
      <p className="text-sm text-gray-400 truncate">{track.artist}</p>
    </div>
  );
};

export default SquareTrackCard;