import React from 'react';
import io from 'socket.io-client';
// import { subscribeToMessages, sendMessage } from './api';

class MessageBoard extends React.Component {

  state = {
    currentMessage: '',
    messages: [],
    socket: io('https://message-board-server.herokuapp.com/')
  }

  componentDidMount = () => {

    const { socket } = this.state;

    socket.emit('subscribe', this.props.room);

    socket.on('new_message', message => {
      console.log(message);
      this.setState({ messages: [...this.state.messages, message] });
    });

    socket.on('load_initial_messages', messages => {
      this.setState({ messages });
    });

    socket.on('message_was_deleted', id => {
      const messages = this.state.messages.filter(msg => {
        return msg._id !== id;
      });
      this.setState({ messages });
    })

  }

  handleSubmit = e => {
    e.preventDefault();
    // sendMessage(this.props.room, this.state.currentMessage);

    const newMessage = {
      room: this.props.room,
      message: this.state.currentMessage
    }

    this.state.socket.emit('send_message', newMessage);

    this.setState({ currentMessage: '' });
  }

  handleDelete = message => {
    this.state.socket.emit('delete_message', message);
  }

  renderList = () => {
    return this.state.messages.map(message => (
      <li key={message._id}>
        {message.message}
        <button onClick={this.handleDelete.bind(this, message)}>Delete</button>
      </li>
    ));
  }

  render(){
    return (
      <div>
        <h1>{this.props.title}</h1>
        <form onSubmit={this.handleSubmit}>
          <input 
            placeholder="Text" 
            value={this.state.currentMessage}
            onChange={e => this.setState({ currentMessage: e.target.value })}
          />
          <button>Submit</button>
        </form>
        <ul>
          { this.renderList() }
        </ul>
      </div>
    )
  }
}

export default MessageBoard;