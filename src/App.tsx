import { useState } from 'react';
import Timer, { TimerState } from './components/Timer';
import TimerLength from './components/TimerLength';
import './App.scss';

const App = () => {
  const [breakTimerLength, setBreakTimerLength] = useState<number>(5);
  const [breakTimerLengthDisabled, setBreakTimerLengthDisabled] =
    useState(false);
  const [sessionTimerLength, setSessionTimerLength] = useState<number>(25);
  const [sessionTimerLengthDisabled, setSessionTimerLengthDisabled] =
    useState(false);

  const defaultState = () => {
    setBreakTimerLength(5);
    setSessionTimerLength(25);
  };

  return (
    <>
      <div className='background' />
      <span className='title'>25 + 5 Clock</span>
      <Timer
        sessionLength={sessionTimerLength}
        breakLength={breakTimerLength}
        onStateChange={(state: TimerState) => {
          const isRunning =
            state === TimerState.RUNNING_SESSION ||
            state === TimerState.RUNNING_BREAK;
          setBreakTimerLengthDisabled(isRunning);
          setSessionTimerLengthDisabled(isRunning);

          if (state === TimerState.RESET) {
            defaultState();
          }
        }}
      />
      <div className='timer-length-container'>
        <TimerLength
          label={'Break Length'}
          value={breakTimerLength}
          disabled={breakTimerLengthDisabled}
          onUpdate={setBreakTimerLength}
          idPrefix={'break'}
        />
        <span className='divider' />
        <TimerLength
          label={'Session Length'}
          value={sessionTimerLength}
          disabled={sessionTimerLengthDisabled}
          onUpdate={setSessionTimerLength}
          idPrefix={'session'}
        />
      </div>
    </>
  );
};

export default App;
