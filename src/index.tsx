import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { initGame, Game } from './game';
import { Config } from './config';

let game: Game;
const TopPage: React.FC = () => {
  React.useEffect(() => {
    game = initGame(600, 600, document.getElementById('game'));
  }, []);

  return (
    <div
      css={{
        display: 'grid',
        gridTemplateColumns: '600px 400px',
        gridColumnGap: '20px',
        height: 600, 
      }}
    >
      <div id="game" />
      <Config
        onClickPlay={(userScript: string) => {
          game.play(userScript);
        }}
      />
    </div>
  );
};

ReactDOM.render(<TopPage />, document.body);
