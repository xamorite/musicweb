// app/components/circularArtistCard.js
import React from 'react';

const CircularArtistCard = ({ artistName, subscriberCount }) => {
  return (
    <div className="cursor-pointer group">
      {/* Circular Image Area */}
      <div className="w-full aspect-square rounded-full overflow-hidden mb-3">
        {/* Placeholder image (replace with actual image) */}
        <div className="w-full h-full bg-gray-600 flex items-center justify-center">
          <span className="text-xl text-white font-bold">A</span>
        </div>
      </div>
      
      {/* Text Content */}
      <h4 className="text-lg font-semibold truncate group-hover:underline">{artistName}</h4>
      <p className="text-sm text-gray-400">{subscriberCount} subscribers</p>
    </div>
  );
};

export default CircularArtistCard;