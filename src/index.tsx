import * as React from 'react';
import * as ReactDOM from 'react-dom';

const Hello: React.FC = () => (
  <div className="hello">
    <div className="greeting">Hello!</div>
  </div>
);

ReactDOM.render(<Hello />, document.body);
