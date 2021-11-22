import * as React from 'react';
import { Game } from './game';

interface Props {
  onClickPlay: (userScript: string) => void;
}


const initialUserScript = `
shot.firework({ x: 200, y: 300 });
setTimeout(() => {
  shot.firework({ x: 400, y: 300 });
}, 3000);
`;

export const Config: React.FC<Props> = ({ onClickPlay }) => {
  const [userScript, setUserScript] = React.useState(initialUserScript);

  return (
    <div>
      <textarea
        css={{
          width: '100%',
          height: '400px',
        }}
        value={userScript}
        onChange={(event) => { setUserScript(event.target.value); }}
      />
      <div>
        <button
          onClick={() => {
            onClickPlay(userScript);
          }}
        >Play</button>
      </div>
    </div>
  );
};
