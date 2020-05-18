import { FunctionalComponent, h } from 'preact';
import * as style from './style.css';
import { PropRef, useEffect, useRef, useState } from 'preact/hooks';
import Track from '../track';

const BPM_MINUTE = 60000 / 4;
const DEFAULT_BPM = 125;

function useInterval(callback: () => void, delay: number) {
  const savedCallback: PropRef<any> = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick(): void {
      savedCallback.current();
    }

    const id = setInterval(tick, delay);
    return () => clearInterval(id);
  }, [delay]);
}

const Home: FunctionalComponent = () => {
  const [position, setPosition] = useState<number>(0);
  const [bpm, setBpm] = useState<number>(DEFAULT_BPM);
  const [delay, setDelay] = useState<number>(BPM_MINUTE / DEFAULT_BPM);

  useInterval(() => {
    setPosition((position + 1) % 16);
  }, delay);

  // update the current time
  const increment = () => {
    setBpm(bpm + 1);
    setDelay(BPM_MINUTE / bpm);
  };

  const decrement = () => {
    setBpm(bpm - 1);
    setDelay(BPM_MINUTE / bpm);
  };

  return (
    <div class={style.home}>
      <h1>TransistorScript 809</h1>

      <div>Current position: {position}</div>
      <div>Current delay: {delay}</div>

      <p>
        <button onClick={decrement}>-</button>
        <label>{bpm}</label>
        <button onClick={increment}>+</button>
      </p>

      <p>
        <Track url={'some string'} position={position} />
        <Track url={'some string'} position={position} />
        <Track url={'some string'} position={position} />
        <Track url={'some string'} position={position} />
        <Track url={'some string'} position={position} />
      </p>
    </div>
  );
};

export default Home;
