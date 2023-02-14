// File: /src/config/agoraConfig.js

import { createClient, createMicrophoneAndCameraTracks } from 'agora-rtc-react'

const appId = "80ba2d3f3b2b43ecb2113e786208b3e1";
const token = "007eJxTYLCbMm27RoV6RGrXin4F2VNqOWJRB/rCLjh8nb+SOyuFOVOBwcIgKdEoxTjNOMkoycQ4NTnJyNDQONXcwszIwCLJONXw1uVXyQ2BjAy9j/YxMTJAIIjPwpCbmJnHwAAA2VofCA=="

export const config = {mode: "rtc", codec: "vp8", appId: appId, token: token };
export const useClient = createClient(config);
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
export const channelName = "main";