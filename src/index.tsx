import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { initGame, Game } from './game';
import { Config } from './config';

let game: Game;
const TopPage: React.FC = () => {
  React.useEffect(() => {
    game = initGame(800, 600, document.getElementById('game'));
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
      <Config
        onClickPlay={(initializeMethod: string, loopMethod: string) => {
          console.log({ initializeMethod, loopMethod });
          game.play();
        }}
      />
    </div>
  );
};

ReactDOM.render(<TopPage />, document.body);
