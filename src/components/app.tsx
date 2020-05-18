import { FunctionalComponent, h } from 'preact';

import Home from './home';
import Header from './header';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
if ((module as any).hot) {
  // tslint:disable-next-line:no-var-requires
  require('preact/debug');
}

const App: FunctionalComponent = () => {
  return (
    <div id="app">
      <Header />
      <Home />
    </div>
  );
};

export default App;
