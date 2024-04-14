import React from 'react'
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const VideoTitle = ({title, overview}) => {
  return (
    <div className="w-screen aspect-video pt-[25%] px-24 absolute bg-gradient-to-r from-black">
      <h1 className="text-white text-6xl font-bold">{title}</h1>
      <p className="text-white py-6 text-lg w-1/4">{overview}</p>
      <div>
        <button className="bg-white px-12 py-4 text-xl bg-opacity-90 rounded-md hover:opacity-80">
          <PlayArrowIcon /> Play
        </button>
        <button className="bg-gray-500 text-white px-12 py-4 text-xl bg-opacity-50 rounded-md ml-4">
          <InfoOutlinedIcon /> More Info
        </button>
      </div>
    </div>
  );
}

export default VideoTitle