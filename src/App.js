import React, { Component } from 'react';
import MessageBoard from './MessageBoard';

class App extends Component {

  render() {
    return (
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <MessageBoard title="Board 1" room="room-1" />
        <MessageBoard title="Board 2" room="room-2" />
        <MessageBoard title="Board 3" room="room-3" />
      </div>
    );
  }
}

export default App;
