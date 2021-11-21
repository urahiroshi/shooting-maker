import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Game from './game';
import { Config } from './config';

const TopPage: React.FC = () => {
  React.useEffect(() => {
    Game.load(800, 600, document.getElementById('game'));
  }, []);

  return (
    <div
      css={{
        display: 'grid',
        gridTemplateColumns: '800px 400px',
        gridColumnGap: '20px',
        height: 600, 
      }}
    >
      <div id="game" />
      <Config />
    </div>
  );
};

ReactDOM.render(<TopPage />, document.body);
