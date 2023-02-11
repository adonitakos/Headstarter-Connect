// File: /src/config/agoraConfig.js

import { createClient, createMicrophoneAndCameraTracks  } from 'agora-rtc-react'

const appId = "80ba2d3f3b2b43ecb2113e786208b3e1";
const token = "007eJxTYLD+ceSkyMRMQba3m1NfGp07NvfS3sVHih1LYwol/mjX/05QYLAwSEo0SjFOM04ySjIxTk1OMjI0NE41tzAzMrBIMk41ZL/9NLkhkJFBP2InKyMDBIL4LAy5iZl5DAwA0tQg5g=="

export const config = {mode: "rtc", codec: "vp8", appId: appId, token: token };
export const useClient = createClient(config);
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
export const channelName = "main";