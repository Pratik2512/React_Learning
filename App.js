import './App.css';
// import { useState } from "React";

// function App(props) {
//   return (
//     <div className="App">
//       <h1>Hello from {props.name}</h1>
      
//     </div>
//   );
// }

// Destructuring method
function App({name}) {
  return (
    <div className="App">
      <h1>Hello from {name}</h1>
      
    </div>
  );
}

// function App(){
//   const emotion = useState("happy");
//   return (
//     <div className="App">
//         <h1>The emotion is {emotion}</h1>
//     </div>
//   )
// }

export default App;
