'use client'

import { useContext, useEffect } from "react";
import {FaPlay, FaPause, FaVolumeOff, FaVolumeUp} from 'react-icons/fa';
import { HomeContext } from "./context/HomeContext";
import {musics} from "./dados/music";

export default function Home() {
  const {
     playing,
     volume,
     muted,
     currentTime,
     totalTime,
     panner,
     audioIndex,
     configPlayPause,
     configAudio,
     configAudioIndex,
     configVolume,
     configPanner,
     configCurrentTime,
     configMuted
  } = useContext(HomeContext);

  useEffect(()=>{
    configAudio();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
       <h1>{playing}</h1>
       <h1>{musics[audioIndex].description}</h1>
       <div className="flex flex-row">
       
       <button onClick={()=> configMuted()}>
           {
            (muted) ? 
             (<FaVolumeOff className="text-[50px] text-[tomato]" />) : 
             (<FaVolumeUp />)
           }
       </button>
       
       <button onClick={()=> configPlayPause()}>
           {
            (playing) ? 
             (<FaPause className="text-[50px] text-[tomato]" />) : 
             (<FaPlay />)
           }
       </button>
           <div className="mt-[50px]">
              <input
                type="range"
                min={0}
                max={1}
                step="0.01"
                value={volume}
                onChange={(e) => configVolume(Number(e.target.value))}
              />
            <input 
                type="range" 
                min="-1" 
                max="1" 
                value={panner}
                onChange = {e => configPanner(Number(e.target.value))}
                step="0.01" 
              ></input>

              <input 
                type="range"
                min="0"
                max={totalTime}
                value={currentTime}
                onChange={e => configCurrentTime(Number(e.target.value))}
              />

           </div>
           <div>
              {
                musics.map((music, index) => {
                  return (
                    <div key={index} onClick={(e) => configAudioIndex(index)}>
                      <h1>
                          {music.author}
                      </h1>
                    </div>
                  )
                })
              }
           </div>
       
       </div>
    </main>
  );
}
