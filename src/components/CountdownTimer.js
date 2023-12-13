import React, { useState, useEffect } from 'react';
import { FaPlay } from 'react-icons/fa';

const CountdownTimer = () => {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    let countdown;

    if (!paused && seconds > 0) {
      countdown = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    }

    return () => clearInterval(countdown);
  }, [paused, seconds]);

  const startCountdown = () => {
    if (isNaN(minutes) || minutes <= 0) {
      alert('Please enter a valid positive number of minutes.');
      return;
    }

    setSeconds(minutes * 60);
    setPaused(false);
  };

  const pauseResumeCountdown = () => {
    setPaused((prevPaused) => !prevPaused);
  };

  const formatTime = (time) => (time < 10 ? `0${time}` : time);

  return (
    <div className="flex flex-col items-center justify-center text-white min-h-screen bg-black">
      <div className="mb-6">
      <p className="mb-2 text-skyblue text-lg font-semibold">Enter Minutes</p>
        <input
          type="number"
          id="minutesInput"
          placeholder="Enter minutes"
          className="p-2 mb-4 mt-1 text-skyblue border border-skyblue bg-black rounded w-96" // Adjusted width to 64
          value={minutes}
          onChange={(e) => setMinutes(parseInt(e.target.value, 10))}
        />
      </div>

      <div className="flex items-center mb-6">
        <button
          id="playbutton"
          onClick={startCountdown}
          className="flex items-center px-4 py-4 mx-6 bg-blue-600 text-white border border-blue-500 rounded-full transition duration-300 hover:bg-blue-700 hover:border-white-800"
        >
          <FaPlay  />
        </button>
        <div
          id="timer"
          className="text-3xl font-bold leading-none text-skyblue"
        >{`${formatTime(
          Math.floor(seconds / 3600)
        )}:${formatTime(Math.floor((seconds % 3600) / 60))}:${formatTime(
          seconds % 60
        )}`}</div>
      </div>

      <button
        id="pausebutton"
        onClick={pauseResumeCountdown}
        className="px-4 py-2 mt-4 bg-black-600 text-white border border-gray-700 rounded transition duration-300 hover:bg-gray-700 hover:border-gray-800"
      >
        Pause/Resume
      </button>
    </div>
  );
};

export default CountdownTimer;
