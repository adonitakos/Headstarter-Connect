// File: /src/components/VideoComponents/VideoCall.js

import { useState, useEffect} from 'react';
import { config, useClient, useMicrophoneAndCameraTracks, channelName } from '../../config/agoraConfig';
import { Grid } from '@mui/material';
import Video from './Video';
import Controls from './Controls';

export default function VideoCall(props) {
    const { setInCall } = props;
    const [users, setUsers] = useState([]);
    const [start, setStart] = useState(false);
    const client = useClient();
    const { ready, tracks} = useMicrophoneAndCameraTracks();

    useEffect(() => { 
        let init = async (name) => {
            client.on("user-published", async (user, mediaType) => {
                await client.subscribe(user, mediaType);
                if (mediaType === "video") {
                    setUsers((prevUsers) => {
                      return [...prevUsers, user];
                    });
                }
                if (mediaType === "audio") {
                      user.audioTrack.play();
                }
                  
            }); // <--- user-published ends here

            client.on("user-unpublished", (user, mediaType) => {
                if(mediaType === "audio") {
                    if(user.audioTrack) user.audioTrack.stop();
                }
                if(mediaType === "video") {
                    setUsers((prevUsers) => {
                        return prevUsers.filter((User) => User.uid !== user.uid);
                    });
                } // <--- if() statement ends here
            });  // <--- user-unpublished ends here

            client.on("user-left", (user) => {
                setUsers((prevUsers) => {
                    return prevUsers.filter((User) => User.uid !== user.uid);
                });
            }); // <--- user-left ends here

            try {
                await client.join(config.appId, name, config.token, null)
            } catch(error) {
                console.log(error)
            }

            if(tracks) await client.publish([tracks[0], tracks[1]]);
            setStart(true);
        }; // <--- init ends here

        if (ready && tracks) { 
            try {
                init(channelName);
            } catch(error) {
                console.log(error);
            }
        } // <--- if() statement ends here

    }, [channelName, client, ready, tracks])  // <--- useEffect() ends here

    return (
        <Grid container direction="column" style={{height: "100%"}}>
            <Grid item style={{height:"5%"}}>
                { ready && tracks && (
                    <Controls tracks={tracks} setStart={setStart} setInCall={setInCall} />
                )}
            </Grid>
            <Grid item style={{height:"95%", border: "2px solid #3D56F"}}>
                { start && tracks && (
                    <Video tracks={tracks} users={users} />
                )}
            </Grid>

        </Grid>
    );

} // <--- VideoCall() function ends here

// export default function VideoCall(props) {
//     const { setInCall } = props;
//     const [users, setUsers] = useState([]);
//     const [start, setStart] = useState(false);
//     const client = useClient();
//     const { ready, tracks } = useMicrophoneAndCameraTracks();
  
//     useEffect(() => {
//       let init = async (name) => {
//         // ...
  
//         client.on("user-unpublished", (user, mediaType) => {
//           // ...
//         });
  
//         await client.join(config.appId, channelName, null, null);
//         await client.publish([tracks[0], tracks[1]]);
  
//         setStart(true);
//       };
  
//       if (ready) {
//         init();
//       }
  
//       return () => {
//         client.leave();
//       };
//     }, [client, ready, tracks]);
  
//     return (
//       <div>
//         {start ? (
//           <>
//             <Video users={users} tracks={tracks} />
//             <Controls tracks={tracks} setStart={setStart} setInCall={setInCall} />
//           </>
//         ) : (
//           <p>Waiting for tracks...</p>
//         )}
//       </div>
//     );
//   }
  