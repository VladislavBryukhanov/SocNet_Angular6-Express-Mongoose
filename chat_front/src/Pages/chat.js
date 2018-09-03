import React, { Component } from 'react';
import { connect } from 'react-redux';
import InputComponent from '../Components/inputComponent';


class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            onlineCounter: 0,
            roomId: ''
        }
    }

    componentWillUnmount() {
        this.props.socket.off('newConnection');
        this.props.socket.off('messages');
        this.props.socket.off('message');
        this.props.socket.emit("leaveRoom", this.state.roomId);
    }

    componentWillMount() {
        this.setState({roomId: this.props.match.params.roomId}, () => {
            this.props.socket.emit("joinRoom", this.state.roomId);
        });
    }

    componentDidMount() {
        this.props.socket.on("newConnection", (users) => {
            this.setState({onlineCounter: users})
        });
        this.props.socket.on("messages", (messages) => {
            this.props.loadMessages(messages);
        });
        this.props.socket.on("message", (msg) => {
            this.props.addMessage(msg);
        });
    }

    render() {
        return (
            <div>
                <div>Online: {this.state.onlineCounter}</div>
                <div>
                    {this.props.messages.map((item) => {
                        return  <p key={item._id}>
                            {item.username}: {item.content} | {item.time}
                        </p>
                    })}
                </div>
                <hr/>
                <InputComponent roomId={this.state.roomId} />
            </div>

        );
    }
}

const mapStateToProps = (state) => ({
    socket: state.socket,
    messages: state.messages
});

const mapDispatchToProps = (dispatch) => ({
    loadMessages: (messages) => (
        dispatch({type: "loadMessages", messages: messages})
    ),
    addMessage: (message) => (
        dispatch({type: "addMessage", message: message})
    )
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Chat);
