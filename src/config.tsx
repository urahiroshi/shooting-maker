import * as React from 'react';
import { Game } from './game';

interface Props {
  onClickPlay: (initializeMethod: string, loopMethod: string) => void;
}

export const Config: React.FC<Props> = ({ onClickPlay }) => {
  const [initializeMethod, setInitializeMethod] = React.useState('');
  const [loopMethod, setLoopMethod] = React.useState('');

  return (
    <div>
      <div>initialize method:</div>
      <textarea
        css={{
          width: '100%',
          height: '200px',
        }}
        value={initializeMethod}
        onChange={(event) => { setInitializeMethod(event.target.value); }}
      />
      <div>loop method:</div>
      <textarea
        css={{
          width: '100%',
          height: '200px',
        }}
        value={loopMethod}
        onChange={(event) => { setLoopMethod(event.target.value); }}
      />
      <div>
        <button
          onClick={() => {
            onClickPlay(initializeMethod, loopMethod);
          }}
        >Play</button>
      </div>
    </div>
  );
};
