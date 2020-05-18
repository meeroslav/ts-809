import { FunctionalComponent, h } from 'preact';
import * as style from './style.css';
import { useEffect, useState } from 'preact/hooks';
import Track from '../track';

const Home: FunctionalComponent = () => {
  const [time, setTime] = useState<number>(Date.now());
  const [bpm, setBpm] = useState<number>(125);

  // gets called when this route is navigated to
  useEffect(() => {
    const timer = window.setInterval(() => setTime(Date.now()), 1000);

    // gets called just before navigating away from the route
    return () => {
      clearInterval(timer);
    };
  }, []);

  // update the current time
  const increment = () => {
    setBpm(bpm + 1);
  };

  const decrement = () => {
    setBpm(bpm + 1);
  };

  return (
    <div class={style.home}>
      <h1>Home</h1>

      <div>Current time: {new Date(time).toLocaleString()}</div>

      <p>
        <button onClick={decrement}>-</button>
        <label>{bpm}</label>
        <button onClick={increment}>+</button>
      </p>

      <p>
        <Track url={'some string'} />
        <Track url={'some string'} />
        <Track url={'some string'} />
        <Track url={'some string'} />
        <Track url={'some string'} />
      </p>
    </div>
  );
};

export default Home;
