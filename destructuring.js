import './App.css';

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

export default App;
