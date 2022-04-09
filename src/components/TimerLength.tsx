import { useCallback, useState } from 'react';
import './TimerLength.scss';

type TimerLengthProps = {
  label: string;
  labelId: string;
  decButtonId: string;
  incButtonId: string;
  lengthLabelId: string;
  initialValue: number;
  step?: number;
  disabled: boolean;
  onUpdate: (value: number) => void;
};

const TimerLength = ({
  label,
  labelId,
  decButtonId,
  incButtonId,
  lengthLabelId,
  initialValue,
  step = 1,
  disabled,
  onUpdate,
}: TimerLengthProps) => {
  const [value, setValue] = useState(initialValue);

  const clickHandler = useCallback(
    (length: number) => {
      setValue(length);
      onUpdate(length);
    },
    [onUpdate],
  );

  return (
    <div className='timer-length'>
      <span id={labelId} className='label'>
        {label}
      </span>
      <div>
        <button
          id={decButtonId}
          className='decrement-button'
          disabled={disabled || value - step <= 0}
          onClick={clickHandler.bind(this, value - step)}
        >
          <i className='fa-solid fa-circle-minus'></i>
        </button>
        <span id={lengthLabelId} className='value'>
          {value}
        </span>
        <button
          id={incButtonId}
          className='increment-button'
          disabled={disabled}
          onClick={clickHandler.bind(this, value + step)}
        >
          <i className='fa-solid fa-circle-plus'></i>
        </button>
      </div>
    </div>
  );
};

export default TimerLength;
