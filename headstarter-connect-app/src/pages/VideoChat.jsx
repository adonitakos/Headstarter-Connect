// File: /src/pages/VideoChat.jsx

import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import VideoCall from "../components/VideoComponents/VideoCall";
import { useUser } from '../config/user';


function VideoChat() {

    const [inCall, setInCall] = useState(false);
    const [state, team] = useUser();
    const navigate = useNavigate();

    if (!state.user) {
        navigate('/auth/login'); // Redirect the user to the login page
        return null; // Don't render anything
    }

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
    ); // <--- return() ends here ends here

} // <--- VideoChat() function ends here

export default VideoChat;