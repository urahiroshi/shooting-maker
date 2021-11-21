import * as React from 'react';
import * as ReactDOM from 'react-dom';

const TopPage: React.FC = () => (
  <>
    <div className="game" />
    <div className="config" />
  </>
);

ReactDOM.render(<TopPage />, document.body);
