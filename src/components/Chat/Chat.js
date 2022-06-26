import React, { useEffect, useState } from 'react';
import { user } from '../Join/Join';
import socketIO from "socket.io-client";
import "./Chat.css";
import { AiOutlineSend, AiOutlineClose } from "react-icons/ai";
import Message from '../Messages/Message';
import ReactScrollToBottom from "react-scroll-to-bottom";

let socket;
// const ENDPOINT = "http://localhost:4500";
const ENDPOINT = "https://chatapp-final-server.herokuapp.com/";

const Chat = () => {
    const [id, setId] = useState("");
    const [messages, setMessages] = useState([]);



    const send = () => {
        const audio = new Audio("messenger_tone.mp3");
        audio.play();
        const message = document.getElementById("chatinpuID").value;
        message && socket.emit("message", { message, id });
        document.getElementById("chatinpuID").value = "";
    }

    useEffect(() => {
        socket = socketIO(ENDPOINT, { transports: ["websocket"] });
        socket.on("connect", () => {
            console.log("Connected");
            setId(socket.id);
        })

        socket.emit("joined", { user })

        socket.on("welcome", (data) => {
            setMessages((olddata) => {
                return [...olddata, data]
            });
            console.log(data.user);
            console.log(data.message);
        })
        socket.on("userJoined", (data) => {
            setMessages((olddata) => {
                return [...olddata, data]
            });
            console.log(data.user);
            console.log(data.message);
        })
        socket.on("leave", (data) => {
            setMessages((olddata) => {
                return [...olddata, data]
            });
            console.log(data.user);
            console.log(data.message);
        })

        return () => {
            socket.emit("disconnect");
            socket.off();
        }
    }, [])


    useEffect(() => {
        socket.on("sendMessage", (data) => {
            setMessages([...messages, data]);
            console.log(data.user, data.message, data.id);
        })
        return () => {
            // socket.off();
        }
    }, [messages])
    return (
        <>
            <div className="chatpage">
                <div className="chatcontainer">
                    <div className="chatheader">
                        <h2>My Chat</h2>
                        <a href="/"><AiOutlineClose /></a>
                    </div>
                    <ReactScrollToBottom className="chatbox">
                        {
                            messages && messages.map((item, index) => <Message key={index} user={`${item.id === id ? "You" : item.user}`} message={item.message} classname={`${item.id === id ? "right" : "left"}`} />)
                        }
                    </ReactScrollToBottom>
                    <div className="chatinputbox">
                        <input onKeyPress={(event) => event.key === "Enter" ? send() : null} type="text" id='chatinpuID' placeholder='Enter messages' />
                        <button onClick={send}><AiOutlineSend /></button>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Chat;