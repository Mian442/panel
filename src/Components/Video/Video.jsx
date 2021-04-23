import React, { useState } from "react";
import ReactPlayer from "react-player";
import { IconButton } from "@material-ui/core";
import { PlayCircleFilled } from "@material-ui/icons";
import "./Video.css";

const Video = (props) => {
  const [play, setPlay] = useState(false);

  return (
    <div className="player-div">
      <div className="player-wrapper">
        <ReactPlayer
          className="react-player"
          url={props.src}
          light="https://www.rtings.com/images/test-materials/2016/5-percent.png"
          playing={play}
          pip={true}
          width="100%"
          height="100%"
          
          playIcon={
            <IconButton
              onClick={() => {
                setPlay(!play);
              }}
            >
              <PlayCircleFilled style={{ fontSize: 72, color: "white" }} />
            </IconButton>
          }
          controls={true}
        />
      </div>
    </div>
  );
};

export default Video;
