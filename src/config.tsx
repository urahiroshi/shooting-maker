import * as React from 'react';
import MonacoEditor from 'react-monaco-editor';

interface Props {
  onClickPlay: (userScript: string, onUserScriptError: (error: Error) => void) => void;
}


const initialUserScript = (
`shot.firework({ x: 200, y: 300 });
setTimeout(() => {
  shot.firework({ x: 400, y: 300 });
}, 3000);
`);

export const Config: React.FC<Props> = ({ onClickPlay }) => {
  const [userScript, setUserScript] = React.useState(initialUserScript);
  const [userScriptError, setUserScriptError] = React.useState('');
  const onUserScriptError = (error: Error) => {
    setUserScriptError(error.message);
  };

  return (
    <div>
      <div
        css={{
          border: '1px solid grey',
        }}
      >
        <MonacoEditor
          height="400"
          language="javascript"
          theme="vs"
          defaultValue={userScript}
          onChange={(value) => { setUserScript(value); }}
          options={{
            minimap: {
              enabled: false,
            },
          }}
        />
      </div>
      <div
        css={{ margin: '8px 0px' }}
      >
        <button
          css={{
            fontSize: '1em',
            padding: '8px 20px',
          }}
          onClick={() => {
            onClickPlay(userScript, onUserScriptError);
          }}
        >Play</button>
      </div>
      <div
        css={{ color: '#ff0000' }}
      >
        {userScriptError}
      </div>
    </div>
  );
};
