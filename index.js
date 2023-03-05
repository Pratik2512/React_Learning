import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  App,
  Index,
  Name, 
  Destr, 
  Usestate, 
  Usereducer, 
  Useref, 
  Form, 
  Hook, 
  Hookdata, 
  Hookstate,
  Api
} from './App';

import {BrowserRouter, Routes, Route} from "react-router-dom"; 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/render" element={<App/>}/>
      <Route path="/index" element={<Index/>}/>
      <Route path="/" element={<Name name="Pratik"/>}>
        <Route path="destr" element={<Destr name="Planet Earth"/>}/>
      </Route>
      <Route path="/usestate" element={<Usestate/>}/>
      <Route path="/usereducer" element={<Usereducer/>}/>
      <Route path="/useref" element={<Useref/>}>
        <Route path="form" element={<Form/>}/>
      </Route>
      <Route path="/hook" element={<Hook/>}/>
      <Route path="/hookdata" element={<Hookdata/>}/>
      <Route path="/hookstates" element={<Hookstate/>}/>
      <Route path="/graphqlapi" element={<Api/>}/>
    </Routes>
  </BrowserRouter>
);


