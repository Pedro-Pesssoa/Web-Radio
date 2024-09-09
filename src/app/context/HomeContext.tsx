'use client'

import React, {createContext, ReactNode, useEffect, useState} from 'react';

type HomeContextData = {
    playing: boolean;
    volume: number;
    panner: number;
    audioIndex: number;
    configPlayPause: () => void;
    configAudio: () => void;
    configAudioIndex: (index:number) => void;
    configVolume: (valeu: number) => void;
    configPanner: (value: number) => void;
}

export const HomeContext = createContext({} as HomeContextData);

type ProviderProps = {
    children: ReactNode;
}

const HomeContextProvider = ({children}:ProviderProps) => {
    const [playing, setPlaying] = useState(false);
    const [volume, setVolume] = useState(1);
    const [panner, setPanner] = useState(0);
    const [audioIndex, setAudioIndex] = useState(0);
    const [audio, setAudio] = useState<HTMLAudioElement>();
    const [gain, setGain] = useState<GainNode>(); 
    const [stereo, setStereo] = useState<StereoPannerNode>();

    useEffect(()=>{
        if (audio) {
            if (playing) {
                play();
            }
        }
    }, [audio]);

    const configAudio = () => {
        configAudioIndex(0);
    }

    const configAudioIndex = (index: number) => {
        const newAudioIndex = index % 3;
        alert(newAudioIndex);
        const updatedAudio = new Audio(`audios/audio${newAudioIndex + 1}.mp3`);
        pause();
        setAudioIndex(newAudioIndex);
        setAudio(updatedAudio);
        const audioConext = new AudioContext();
        const media = audioConext.createMediaElementSource(updatedAudio);
        const updatedGain = audioConext.createGain();
        const updatedStereo = audioConext.createStereoPanner();
        media.connect(updatedGain);
        updatedGain.connect(updatedStereo);
        updatedStereo.connect(audioConext.destination);
        
        updatedAudio.onplay = () => {
            audioConext.resume();
        }

        setGain(updatedGain);
        setStereo(updatedStereo);
    }

    const configVolume = (value:number) => {
        if (!gain) return;
        gain.gain.value = value;
        setVolume(value);
    }

    const configPanner = (value:number) => {
        if (!stereo) return;
        stereo.pan.value = value;
        setPanner(value);
    }

    const configPlayPause = () => {
        if (playing) {
            pause();
        }
        else {
            play();
        }
        setPlaying(!playing);
    }

    const play = ()=> {
        if (!audio) return;
        audio.play();
    }

    const pause = () => {
        if (!audio) return;
        audio.pause();
    }

    return (
        <HomeContext.Provider value={
            {
                playing,
                volume,
                panner,
                audioIndex,
                configPlayPause,
                configAudio,
                configAudioIndex,
                configVolume,
                configPanner
            }
        }>
          {children} 
        </HomeContext.Provider>
    )
}

export default HomeContextProvider;