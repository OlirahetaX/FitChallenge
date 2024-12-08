import React from 'react';
import "./YouTubeEmbed.css"

const YouTubeEmbed = ({ videoId }) => {
  return (
    <div className='videoEmbed-div'>
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?mute=1&modestbranding=1&rel=0&controls=1`}
        title="YouTube Video Player"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          border: 'none',
        }}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default YouTubeEmbed;
