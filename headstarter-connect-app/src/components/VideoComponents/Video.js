// File: /src/components/VideoComponents/Video.js

import { AgoraVideoPlayer } from "agora-rtc-react";
import { Grid } from "@mui/material";
import { useState, useEffect } from "react";

export default function Video(props) {
  const { users, tracks } = props;
  const [gridSpacing, setGridSpacing] = useState(12);

  useEffect(() => {
    setGridSpacing(Math.max(Math.floor(12 / (users.length + 1)), 4));
  }, [users, tracks]);

  return (
    <Grid container style={{ height: "100%", marginTop:'100px'}}>
      <Grid item xs={gridSpacing}>
        <AgoraVideoPlayer
          videoTrack={tracks[1]}
          style={{ height: "270px", width: "480px" }}
        />
      </Grid>
      {users.length > 0 &&
        users.map((user) => {
          if (user.videoTrack) {
            return (
              <Grid item xs={gridSpacing}>
                <AgoraVideoPlayer
                  videoTrack={user.videoTrack}
                  key={user.uid}
                  style={{ height: "270px", width: "480px" }}
                />
              </Grid>
            );
          } else return null;
        })}
    </Grid>
  );
}