import { useState, useEffect, useRef } from 'react';

const useTimer = (initialMinutes = 0) => {
  const [minutes, setMinutes] = useState(initialMinutes);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<any>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        if (seconds > 0) {
          setSeconds((prevSeconds) => prevSeconds - 1);
        } else if (minutes > 0) {
          setMinutes((prevMinutes) => prevMinutes - 1);
          setSeconds(59);
        } else {
          clearInterval(intervalRef.current);
          setIsRunning(false);
        }
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning, minutes, seconds]);

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resumeTimer = () => {
    setIsRunning(true);
  };

  const resetTimer = (resetMinutes = initialMinutes) => {
    clearInterval(intervalRef.current);
    setMinutes(resetMinutes);
    setSeconds(0);
    setIsRunning(false);
  };

  const timeIsOver = minutes === 0 && seconds === 0;

  return {
    minutes,
    seconds,
    isRunning,
    timeIsOver,
    pauseTimer,
    resumeTimer,
    resetTimer,
  };
};

export default useTimer;
