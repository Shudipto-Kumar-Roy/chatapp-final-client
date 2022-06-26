import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./Join.css";

let user;
const Join = () => {
    const [name, setName] = useState("");

    const sendUser = () => {
        user = document.getElementById("chatloginID").value;
        document.getElementById("chatloginID").value = "";
    }


    return (
        <>
            <div className="joinpage">
                <div className="joincontainer">
                    <h1 className="chatname">
                       We Chat
                    </h1>
                    <input id='chatloginID' type="text" onChange={(e) => setName(e.target.value)} placeholder='Your Name' className="chatlogininput" />
                    <Link onClick={(e) => name === "" ? e.preventDefault() : null
                    } to="/chat"><button className="chatloginbutton" onClick={sendUser}>Login</button></Link>
                </div>
            </div>
        </>
    )
}

export default Join;
export { user };