// File: /src/pages/VideoChat.jsx

import React, { useState } from "react";
import { Button } from '@mui/material';
import VideoCall from "../components/VideoComponents/VideoCall";

function VideoChat() {

    const [inCall, setInCall] = useState(false);

    return (
        <div className='VideoChat' style={{ height:'100%' }}>
            {inCall ?  (
            <VideoCall setInCall={ setInCall } /> 
            ) : (
                <Button 
                    varaint="contained" 
                    color="primary" 
                    onClick={() => {setInCall(true)}}
                    style={{
                        backgroundColor: '#3D56F0',
                        color:'white',
                        margin:'10px'
                    }}
                >   
                    Join Call
                </Button> 
            )}   
        </div>
    );

} // <--- VideoChat() function ends here

export default VideoChat;