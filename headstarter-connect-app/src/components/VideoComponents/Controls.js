// File: /src/components/VideoComponents/Controls.js

import { useState } from 'react';
import { useClient } from '../../config/agoraConfig';
import { Grid, Button } from '@mui/material';
// Icons:
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

export default function Controls(props) {
    const client = useClient();
    const { tracks, setStart, setInCall } = props;
    const [trackState, setTrackState] = useState({video: true, audio: true});

    const mute = async (type) => {
        if(type === "audio") {
            await tracks[0].setEnabled(!trackState.audio);
            setTrackState((ps) => {
                return {...ps, audio: !ps.audio };
            });
        } // <--- if() statment ends here
        else if(type === "video") {
            await tracks[1].setEnabled(!trackState.video);
            setTrackState((ps) => {
                return {...ps, video: !ps.video };
            });
        } // <--- if() statment ends here
        
    } // <--- mute() function ends here

    const leaveChannel = async () => {
        await client.leave();
        client.removeAllListeners();
        tracks[0].close();
        tracks[1].close();
        setStart(false);
        setInCall(false);
    } // <--- leaveChannel() function ends here

    return (
        <Grid container spacing={2} alignItems="center" style={{marginTop:'10px'}}>
            <Grid item>
            {/* Audio/Mic button */}
                <Button
                    variant="contained" 
                    color={trackState.audio ? "primary" : "secondary"}
                    onClick = {() => mute('audio')}
                    style={{marginLeft:'6px', marginRight:'6px'}}
                >
                    {trackState.audio ? <MicIcon /> : <MicOffIcon/>}
                </Button>
            {/* Video button */}
                <Button
                    variant="contained" 
                    color={trackState.video ? "primary" : "secondary"}
                    onClick = {() => mute('video')}
                >
                    {trackState.video ? <VideocamIcon /> : <VideocamOffIcon/>}
                </Button> 
            </Grid>
            <Grid item>
            {/* Leave Channel button */}
                <Button
                    variant="contained" 
                    color="primary"
                    onClick = {() => leaveChannel()}
                >
                    Leave
                        <ExitToAppIcon />
                </Button>
            </Grid>
       
        </Grid>
        
    ) // <--- return() ends here

} // <--- Controls() function ends here