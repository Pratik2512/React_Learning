import './App.css';
import { useState, useEffect, useReducer, useRef } from "react";

import {Link, Outlet} from "react-router-dom";

export function Index() {
  return (
    <div className="App">
      <nav>
        <Link to="/"> Home </Link><br/>
        <Link to="/render"> Render Props </Link><br/>
        <Link to="/usestate"> useState </Link><br/>
        <Link to="/usereducer"> useReducer </Link><br/>
        <Link to="/useref"> useRef </Link><br/>
        <Link to="/hook"> Hook </Link><br/>
        <Link to="/hookdata"> Hook Data </Link><br/>
        <Link to="/hookstates"> Hook States </Link><br/>
        <Link to="/graphqlapi"> GraphQL API </Link><br/>
      </nav>
    </div>
  );
}

export function Name(props) {
  return (
    <div className='App'>
      <nav>
      <Link to="/index"> Index </Link>
        <Link to="destr"> Destructuring </Link>
      </nav>
      <h1>Hello from {props.name}</h1>
      <Outlet/>
    </div>
  )
}

// Destructuring method
export function Destr({name}) {
  return (
    <div className="App">
      <nav>
        <Link to="/">Home</Link>
      </nav>
      <h1>Hello from {name}</h1>
      
    </div>
  );
}

// Using useState and useEffect hooks
export function Usestate(){
  const [emotion,setEmotion] = useState("happy");
  const [secondary, setSecondary] = useState("tired");
  useEffect (() => {
    console.log(`It's ${emotion} right now`);
  },[emotion, secondary]);
  useEffect (() => {
    console.log(`It's ${secondary} over here`);
  }, [secondary]);
  return (
    <div className="App">
      <nav>
        <Link to="/">Home</Link>
      </nav>
        <h1>Current emotion {emotion}</h1>
        <button onClick={()=>setEmotion("sad")}>Sad</button>
        <button onClick={()=>setEmotion("excited")}>Excited</button>
        <h2>Secondary emotion is {secondary}</h2>
        <button onClick={()=>setSecondary("upset")}>Upset</button>
    </div>
  )
}

// using useReducer hook
export function Usereducer(){
  const [checked, setChecked] = useReducer(checked => !checked, false);
  return(
    <div className='App'>
        <nav><Link to="/">Home</Link></nav>
      <input type='checkbox'
        value={checked} onChange={setChecked}  //()=> setChecked((checked) => !checked)}
      />
      <label>{checked ? "Checked" : "Unchecked"}</label>
    </div>
  )
}

// using useRef
export function Useref(){
  const txtTitle = useRef();
  const hexCode = useRef();

  console.log(txtTitle);

  const submit = (e) => {
    e.preventDefault();
    const title = txtTitle.current.value;
    const color = hexCode.current.value;
    alert(`${title}, ${color}`);
    txtTitle.current.value = "";
    hexCode.current.value = "";
  };
  return(
  <form onSubmit={submit}>
    <input 
      ref={txtTitle}
      type="text"
      placeholder="Color title..."/>
    <input 
      ref={hexCode}
      type="color"/>
    <button>Add</button>
    <Link to="/useref/form">Form</Link>
    <hr/>
    <Outlet/>
  </form>
  )
}


// using useState in form 
export function Form(){
  const [title, setTitle] = useState("");
  const [color, setColor] = useState("#000000");

  
  const submit = (e) => {
    e.preventDefault();
    alert(`${title}, ${color}`);
    setTitle("");
    setColor("");
  };
  return(
  <form onSubmit={submit}>
    <input 
      value={title}
      onChange = {(event) => setTitle(event.target.value)}
      type="text"
      placeholder="Color title..."/>
    <input 
      value={color}
      onChange = {(event) => setColor(event.target.value)}
      type="color"/>
    <button>Add</button>
  </form>
  )
}

//using custom made hook useInput
// function useInput(initialValue){
//   const [value, setValue] = useState(initialValue);
//   return [
//     {
//       value,
//       onChange: (e) => setValue(e.target.value)
//     },
//     () => setValue(initialValue)
//   ];
// }

// function App(){
//   const [titleProps, resetTitle] = useInput("");
//   const [colorProps, resetColor] = useInput("#000000");

  
//   const submit = (e) => {
//     e.preventDefault();
//     alert(`${titleProps.value}, ${colorProps.value}`);
//     resetTitle();
//     resetColor();
//   };
  // return(
  // <form onSubmit={submit}>
  //   <input 
  //     {...titleProps}
  //     type="text"
  //     placeholder="Color title..."/>
  //   <input 
  //     {...colorProps.value}
  //     type="color"/>
  //   <button>Add</button>
  // </form>
  // )
// }

//fetching data with hooks
export function Hook(){
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`https://api.github.com/users/Pratik2512`)
    .then((response) => response.json())
    .then(setData);
  }, []);
  if(data)
   return (<pre>{JSON.stringify(data, null, 2)}</pre>);
  return (
    <h1>Data</h1>
  )
}

// Displaying data from an api 
function GithubUser({name, location, avatar}){
  return (
    <div>
      <h1>{name}</h1>
      <p>{location}</p>
      <img src={avatar} height={150} alt={name}/>
    </div>
  );
}
export function Hookdata(){
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`https://api.github.com/users/Pratik2512`)
    .then((response) => response.json())
    .then(setData);
  }, []);
  if(data)
   return <GithubUser name={data.name} location={data.location} avatar={data.avatar_url}/>;
  return (
    <h1>Data</h1>
  )
}

//Handling loading states
// function GithubUser({name, location, avatar}){
//   return (
//     <div>
//       <h1>{name}</h1>
//       <p>{location}</p>
//       <img src={avatar} height={150} alt={name}/>
//     </div>
//   );
// }
export function Hookstate(){
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`https://api.github.com/users/Pratik2512`)
    .then((response) => response.json())
    .then(setData)
    .then(() => setLoading(false))
    .catch(setError);
  }, []);

  if(loading) return <h1>Loading...</h1>;
  if(error) return <pre>{JSON.stringify(error)}</pre>
  if(!data) return null;
  
  return <GithubUser name={data.name} location={data.location} avatar={data.avatar_url}/>;
}

// Fetching data with GraphQL
const query= 
`query{
  allLifts{
    name
    elevationGain
    status
  }
}`;

const opts = {
  method: "POST",
  headers: {"Content-Type": "application/json"},
  body: JSON.stringify({query})
};

function Lift({name, elevationGain, status}){
  return (
    <div>
      <h1>{name}</h1>
      <p>{elevationGain} {status}</p>
    </div>
  );
}
export function Api(){
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`https://snowtooth.moonhighway.com`, opts)
    .then((response) => response.json())
    .then(setData)
    .then(() => setLoading(false))
    .catch(setError);
  }, []);

  if(loading) return <h1>Loading...</h1>;
  if(error) return <pre>{JSON.stringify(error)}</pre>
  if(!data) return null;
  
  return (<div>
    {data.data.allLifts.map((lift) => (
    <Lift 
      name={lift.name}
      elevationGain={lift.elevationGain}
      status={lift.status}
    />
    ))}
  </div>
  );
}

//Working with render props
const tahoe_peaks = [
  {name: "Freel", elevation: 10891},
  {name: "Monument", elevation: 10067},
  {name: "Pyramid", elevation: 9983},
  {name: "Tallac", elevation: 9735}
];

function List({data, renderItem, renderEmpty}){
  return !data.length ? (renderEmpty) : (
    <ul>
      {data.map((item) => (
        <li key={item.name}>{renderItem(item)}</li>
      ))}
    </ul>
  );
}

export function App(){
  return (
  <List data={tahoe_peaks}
    renderEmpty = {<p>This list is empty</p>}
    renderItem = {(item) => (<>{item.name} - {item.elevation} ft.</>)} />
  );
}
// export default App;
