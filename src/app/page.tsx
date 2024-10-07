'use client'

import { useContext, useEffect } from "react";
import { FaPlay, FaPause, FaVolumeOff, FaVolumeUp, FaStepForward, FaStepBackward, FaMusic } from 'react-icons/fa';
import { HomeContext } from "./context/HomeContext";
import { musics } from "./dados/music";

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

  useEffect(() => {
    configAudio();
  }, []);

  const handleMusicSelection = (index: number) => {
    configAudioIndex(index);
  };

  return (
    <main className="flex">
      {/* Barra lateral com músicas */}
      <aside className="w-64 bg-gray-800 bg-opacity-75 h-screen text-white p-4">
        <div className="flex items-center mb-4">
          <FaMusic className="text-xl mr-2" />
          <h2 className="text-xl font-bold">Playlist</h2>
        </div>
        <ul>
          {musics.map((music, index) => (
            <li
              key={index}
              className={`mb-2 cursor-pointer p-2 rounded ${audioIndex === index ? 'bg-gray-600' : ''}`}
              onClick={() => handleMusicSelection(index)}
            >
              {music.name}
            </li>
          ))}
        </ul>
      </aside>

      {/* Área principal */}
      <section className="flex flex-col items-center justify-center p-10 flex-grow bg-black text-white">
        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-bold mb-4">{musics[audioIndex].name}</h1>
          <img src={musics[audioIndex].image} alt={musics[audioIndex].name} className="w-60 h-60 rounded-lg mb-4" />
          <h2 className="text-lg mb-6">{musics[audioIndex].description}</h2>
        </div>

        {/* Controles de reprodução */}
        <div className="flex items-center justify-center gap-6 mb-4">
          <button onClick={() => configAudioIndex(audioIndex - 1)}>
            <FaStepBackward className="text-[30px]" />
          </button>

          <button onClick={() => configPlayPause()}>
            {playing ? <FaPause className="text-[40px]" /> : <FaPlay className="text-[40px]" />}
          </button>

          <button onClick={() => configAudioIndex(audioIndex + 1)}>
            <FaStepForward className="text-[30px]" />
          </button>
        </div>

        {/* Barra de progresso */}
        <input
          type="range"
          min="0"
          max={totalTime}
          value={currentTime}
          onChange={(e) => configCurrentTime(Number(e.target.value))}
          className="w-3/4 mb-4"
        />

        {/* Barras de volume e estéreo */}
        <div className="flex items-center justify-between w-3/4 mb-4">
          {/* Controle de volume */}
          <div className="flex items-center">
            <button onClick={() => configMuted()}>
              {muted ? <FaVolumeOff className="text-[20px]" /> : <FaVolumeUp className="text-[20px]" />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={(e) => configVolume(Number(e.target.value))}
              className="mx-2"
            />
          </div>

          {/* Controle de estéreo*/}
          <div className="flex items-center">
            <span className="text-[20px] mr-2">L</span>
            <input
              type="range"
              min="-1"
              max="1"
              step="0.1"
              value={panner}
              onChange={(e) => configPanner(Number(e.target.value))}
              className="w-24"
            />
            <span className="text-[20px] ml-2">R</span>
          </div>
        </div>
      </section>
    </main>
  );
}
