import { useCallback, useState } from 'react';
import './App.scss';
import Timer from './components/Timer';
import TimerLength from './components/TimerLength';

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
    <div>
      <div>
        <TimerLength
          label={'Break Length'}
          value={breakTimerLength}
          disabled={breakTimerLengthDisabled}
          onUpdate={updateBreakTimerLength}
          labelId={'break-label'}
          decButtonId={'break-decrement'}
          incButtonId={'break-increment'}
          lengthLabelId={'break-length'}
        />
        <TimerLength
          label={'Session Length'}
          value={sessionTimerLength}
          disabled={sessionTimerLengthDisabled}
          onUpdate={updateSessionTimerLength}
          labelId={'session-label'}
          decButtonId={'session-decrement'}
          incButtonId={'session-increment'}
          lengthLabelId={'session-length'}
        />
      </div>
      <Timer />
    </div>
  );
};

export default App;
