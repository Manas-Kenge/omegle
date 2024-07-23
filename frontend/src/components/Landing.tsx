import { useEffect, useRef, useState } from "react"
import { Room } from "./Room";
import { Button, TextField } from '@mui/material';

export const Landing = () => {
    const [name, setName] = useState("");
    const [localAudioTrack, setLocalAudioTrack] = useState<MediaStreamTrack | null>(null);
    const [localVideoTrack, setlocalVideoTrack] = useState<MediaStreamTrack | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    const [joined, setJoined] = useState(false);

    const getCam = async () => {
        const stream = await window.navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
        })
        // MediaStream
        const audioTrack = stream.getAudioTracks()[0]
        const videoTrack = stream.getVideoTracks()[0]
        setLocalAudioTrack(audioTrack);
        setlocalVideoTrack(videoTrack);
        if (!videoRef.current) {
            return;
        }
        videoRef.current.srcObject = new MediaStream([videoTrack])
        videoRef.current.play();
        // MediaStream
    }

    useEffect(() => {
        if (videoRef && videoRef.current) {
            getCam()
        }
    }, [videoRef]);

    if (!joined) {

        return <div>
            <div className="grid grid-cols-2 h-screen place-items-center">
                <div className="">
                    <div className='text-2xl font-semibold'>
                        Video Calls and meetings for everyone
                    </div>
                    <div className='flex py-8'>
                        <div className='px-2'>
                            <Button variant="contained">New meeting</Button>
                        </div>
                        <div className='px-2'>
                            <TextField id="outlined-basic" label="Enter a code" variant="outlined" size="small" onChange={(e) => {
                                setName(e.target.value);
                            }} />
                        </div>
                        <div className='px-2'>
                            <Button variant="outlined" size="large" onClick={() => {
                                setJoined(true);
                            }}>Join</Button>
                        </div>
                    </div>
                </div>
                <div className="">
                    <video autoPlay ref={videoRef} className="rounded-xl border-4 border-black"></video>
                </div>
            </div>
        </div>
    }

    return <Room name={name} localAudioTrack={localAudioTrack} localVideoTrack={localVideoTrack} />
}