import { useCallback, useState } from 'react';
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

  const updateBreakTimerLength = useCallback(
    (length: number) => setBreakTimerLength(length),
    [],
  );

  const updateSessionTimerLength = useCallback(
    (length: number) => setSessionTimerLength(length),
    [],
  );

  return (
    <main>
      <span className='title'>25 + 5 Clock</span>
      <div className='timer-length-container'>
        <TimerLength
          label={'Break Length'}
          initialValue={breakTimerLength}
          disabled={breakTimerLengthDisabled}
          onUpdate={updateBreakTimerLength}
          labelId={'break-label'}
          decButtonId={'break-decrement'}
          incButtonId={'break-increment'}
          lengthLabelId={'break-length'}
        />
        <span className='divider' />
        <TimerLength
          label={'Session Length'}
          initialValue={sessionTimerLength}
          disabled={sessionTimerLengthDisabled}
          onUpdate={updateSessionTimerLength}
          labelId={'session-label'}
          decButtonId={'session-decrement'}
          incButtonId={'session-increment'}
          lengthLabelId={'session-length'}
        />
      </div>
      <Timer />
    </main>
  );
};

export default App;
