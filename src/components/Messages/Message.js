import React from 'react';
import "./Message.css";

const Message = ({ user, message, classname }) => {
    if (user) {
        return (
            <div className={`messageBox ${classname}`}>{`${user} : ${message}`}</div>
        )
    }
    else {
        return (
            <div className={`messageBox ${classname}`}>{message}</div>
        )
    }
}

export default Message;