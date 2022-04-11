import { useEffect, useRef, useState } from 'react';
import './Timer.scss';

export enum TimerMode {
  SESSION = 'Session',
  BREAK = 'Break',
}

export enum TimerState {
  RUNNING_SESSION = 'RUNNING_SESSION',
  RUNNING_BREAK = 'RUNNING_BREAK',
  PAUSE_SESSION = 'PAUSE_SESSION',
  PAUSE_BREAK = 'PAUSE_BREAK',
  RESET = 'RESET',
}

type TimerProps = {
  breakLength: number;
  sessionLength: number;
  onStateChange: (state: TimerState) => void;
};

const Timer = (props: TimerProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [mode, setMode] = useState(TimerMode.SESSION);
  const [breakLength, setBreakLength] = useState(props.breakLength * 60);
  const [sessionLength, setSessionLength] = useState(props.sessionLength * 60);
  const [currentState, setCurrentState] = useState(TimerState.RESET);
  const intervalId = useRef<number | null>(null);

  const defBreakLength = () => setBreakLength(props.breakLength * 60);
  const defSessionLength = () => setSessionLength(props.sessionLength * 60);

  const handleOnPlayPauseClick = () => {
    if (
      currentState == TimerState.PAUSE_SESSION ||
      currentState == TimerState.RESET ||
      currentState == null
    ) {
      setCurrentState(TimerState.RUNNING_SESSION);
    } else if (currentState == TimerState.PAUSE_BREAK) {
      setCurrentState(TimerState.RUNNING_BREAK);
    } else if (currentState == TimerState.RUNNING_SESSION) {
      setCurrentState(TimerState.PAUSE_SESSION);
    } else if (currentState == TimerState.RUNNING_BREAK) {
      setCurrentState(TimerState.PAUSE_BREAK);
    }
  };

  const handleOnResetClick = () => {
    setCurrentState(TimerState.RESET);
    props.onStateChange(TimerState.RESET);
    defBreakLength();
    defSessionLength();
    setMode(TimerMode.SESSION);
    stopInterval();
    stopAudio();
  };

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.pause();
    }
  };

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  const stopInterval = () => {
    if (intervalId.current) {
      clearInterval(intervalId.current);
      intervalId.current = null;
    }
  };

  useEffect(() => defBreakLength(), [props.breakLength]);
  useEffect(() => defSessionLength(), [props.sessionLength]);

  useEffect(() => {
    setMode(
      currentState == TimerState.RUNNING_BREAK ||
        currentState == TimerState.PAUSE_BREAK
        ? TimerMode.BREAK
        : TimerMode.SESSION,
    );
  }, [currentState]);

  useEffect(() => {
    if (
      currentState === TimerState.RUNNING_SESSION ||
      currentState === TimerState.RUNNING_BREAK
    ) {
      if (intervalId.current) {
        return;
      }

      intervalId.current = setInterval(() => {
        if (currentState === TimerState.RUNNING_SESSION) {
          setSessionLength((counter) => {
            const result = counter - 1;
            if (result < 0) {
              stopInterval();
              playAudio();
              setMode(TimerMode.BREAK);
              defSessionLength();
              setCurrentState(TimerState.RUNNING_BREAK);
            }
            return result;
          });
        }

        if (currentState === TimerState.RUNNING_BREAK) {
          setBreakLength((counter) => {
            const result = counter - 1;
            if (result < 0) {
              stopInterval();
              playAudio();
              setMode(TimerMode.SESSION);
              defBreakLength();
              setCurrentState(TimerState.RUNNING_SESSION);
            }
            return result;
          });
        }
      }, 1000);

      props.onStateChange(currentState);
    } else if (
      currentState === TimerState.PAUSE_BREAK ||
      currentState === TimerState.PAUSE_SESSION
    ) {
      stopInterval();
      props.onStateChange(currentState);
    }

    return () => stopInterval();
  }, [currentState, props]);

  const secondsToTime = (sec: number) => {
    let minutes = Math.floor(sec / 60);
    let seconds = sec - minutes * 60;
    if (minutes < 10) {
      minutes = ('0' + minutes) as unknown as number;
    }
    if (seconds < 10) {
      seconds = ('0' + seconds) as unknown as number;
    }
    return minutes + ':' + seconds;
  };

  const resolveBaseClassName = (state: TimerState) => {
    if (state === TimerState.RUNNING_SESSION) {
      return 'timer--session';
    } else if (state === TimerState.RUNNING_BREAK) {
      return 'timer--break';
    } else if (
      state === TimerState.PAUSE_SESSION ||
      state === TimerState.PAUSE_BREAK
    ) {
      return 'timer--pause';
    }
  };

  const isRunning =
    currentState === TimerState.RUNNING_SESSION ||
    currentState === TimerState.RUNNING_BREAK;

  const timeLeft =
    currentState == TimerState.RUNNING_BREAK ||
    currentState == TimerState.PAUSE_BREAK
      ? secondsToTime(breakLength)
      : secondsToTime(sessionLength);

  return (
    <div className={['timer', resolveBaseClassName(currentState)].join(' ')}>
      <span id='timer-label'>{mode}</span>
      <span id='time-left'>{timeLeft}</span>

      <div className='control-wrapper'>
        <button id='start_stop' onClick={handleOnPlayPauseClick}>
          <i
            className={['fa-solid', 'fa-play', isRunning ? 'fa-beat' : ''].join(
              ' ',
            )}
          />
          <i
            className={[
              'fa-solid',
              'fa-pause',
              currentState != TimerState.RESET && !isRunning ? 'fa-beat' : '',
            ].join(' ')}
          />
        </button>

        <button id='reset' onClick={handleOnResetClick}>
          <i className='fa-solid fa-rotate' />
        </button>
      </div>

      <audio
        id='beep'
        ref={audioRef}
        src='https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav'
      />
    </div>
  );
};

export default Timer;
