import React from 'react';
import ReactDOM from 'react-dom';
import Rtmp2flv from './Rtmp2flv';

function App() {
  return (
    <Rtmp2flv />
  );
}

ReactDOM.render(<App />, document.querySelector('#app'));