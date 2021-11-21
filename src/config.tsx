import * as React from 'react';

export const Config: React.FC = () => {
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
          onClick={() => { console.log({ initializeMethod, loopMethod }); }}
        >Play</button>
      </div>
    </div>
  );
};
