import './TimerLength.scss';

type TimerLengthProps = {
  label: string;
  labelId: string;
  decButtonId: string;
  incButtonId: string;
  lengthLabelId: string;
  value: number;
  step?: number;
  disabled: boolean;
  onUpdate: (updatedValue: number) => void;
};

const TimerLength = ({
  label,
  labelId,
  decButtonId,
  incButtonId,
  lengthLabelId,
  value,
  step = 1,
  disabled,
  onUpdate,
}: TimerLengthProps) => {
  return (
    <div className='timer-length'>
      <h1 id={labelId}>{label}</h1>
      <div>
        <button
          id={decButtonId}
          className='decrement-button'
          disabled={disabled || value - step <= 0}
          onClick={() => onUpdate(value - step)}
        >
          <i className='fa-solid fa-circle-minus'></i>
        </button>
        <span id={lengthLabelId}>{value}</span>
        <button
          id={incButtonId}
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
