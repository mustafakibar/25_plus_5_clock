import { useState } from 'react';
import Timer from './components/Timer';
import TimerLength from './components/TimerLength';
import './App.scss';

const App = () => {
  const [breakTimerLength, setBreakTimerLength] = useState(10);
  const [breakTimerLengthDisabled, setBreakTimerLengthDisabled] =
    useState(false);
  const [sessionTimerLength, setSessionTimerLength] = useState(25);
  const [sessionTimerLengthDisabled, setSessionTimerLengthDisabled] =
    useState(false);

  return (
    <main>
      <span className='title'>25 + 5 Clock</span>
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
      <Timer />
    </main>
  );
};

export default App;
