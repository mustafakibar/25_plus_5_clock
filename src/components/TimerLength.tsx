import './TimerLength.scss';

type TimerLengthProps = {
  label: string;
  idPrefix: string;
  value: number;
  step?: number;
  disabled: boolean;
  onUpdate: (value: number) => void;
};

const TimerLength = ({
  label,
  idPrefix,
  value,
  step = 1,
  disabled,
  onUpdate,
}: TimerLengthProps) => {
  return (
    <div className='timer-length'>
      <span id={`${idPrefix}-label`} className='label'>
        {label}
      </span>
      <div>
        <button
          id={`${idPrefix}-decrement`}
          className='decrement-button'
          disabled={disabled || value - step <= 0}
          onClick={() => onUpdate(value - step)}
        >
          <i className='fa-solid fa-circle-minus'></i>
        </button>
        <span id={`${idPrefix}-length`} className='value'>
          {value}
        </span>
        <button
          id={`${idPrefix}-increment`}
          className='increment-button'
          disabled={disabled}
          onClick={() => onUpdate(value + step)}
        >
          <i className='fa-solid fa-circle-plus'></i>
        </button>
      </div>
    </div>
  );
};

export default TimerLength;
