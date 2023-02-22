import './App.css';
import {useState} from 'react';

function App(){
  const [emotion, setEmotion] = useState("happy");
  return(
    <div className="App">
      <h1>Current emotion {emotion}</h1>
      <button onClick={()=> setEmotion("sad")}>Sad</button>
      <button onClick={()=> setEmotion("excited")}>Excited</button>
    </div>
  )
}
export default App;
