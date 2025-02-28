import { useEffect , useState } from "react";


const Chat = ({room}) => {
    const [messages, setMessage] = useState([]);
    const [input, setInput] = useState('');
    let socket = new WebSocket(`ws://localhost:8000/ws/chat/$room/`);


    useEffect(() => {
        socket.onmessage = (e) => {
            const data = JSON.parse(e.data);
            setMessage([...messages, data.message]);
        };
    }, [messages]);



    const sendMessage = () => {
        socket.send(JSON.stringify({message: input }));
        setInput('');
    };


    return (
        <div>
          <h2>Chat Room: {room}</h2>
          <div>
            {messages.map((msg, i) => <p key={i}>{msg}</p>)}
          </div>
          <input value={input} onChange={(e) => setInput(e.target.value)} />
          <button onClick={sendMessage}>Send</button>
        </div>
      );

};



export default Chat;