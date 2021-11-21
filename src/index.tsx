import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { css } from '@emotion/react';
import * as Game from './game';

const TopPage: React.FC = () => {
  React.useEffect(() => {
    Game.load(800, 600, document.querySelector('.game'));
  }, []);

  return <>
    <div
      className="game"
      css={{
        width: 800,
        height: 600,
      }}
    />
    <div className="config" />
  </>;
};

ReactDOM.render(<TopPage />, document.body);
