import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import 'whatwg-fetch';
import { findByLabelText } from '@testing-library/react';

// const esc = encodeURIComponent;
// export const queryFunc = (params) => Object.keys(params)
//   .map(k => esc(k) + '=' + esc(params[k]))
//   .join('&');

function App() {

  const [mountain, setMountain] = useState("");
  const [mountainData, setMountainData] = useState("");
  const [mountainError, setMountainError] = useState("");

  const fetchResort = async () => {

    const url = `https://liftie.info/api/resort/${mountain}`;

    const response = await fetch(url, {mode: 'cors'});
    if (!response.ok) {
      console.log('Could not fetch user', response);
      setMountainError(response);
      setMountainData("");
    }
    setMountainData(response.json());
    setMountainError("");
  };


  const handleChange = (event) => {
    setMountain(event.target.value);
  }


  return (
    <div className="App">
      <header className="App-header">
        <h1>Mountain Status</h1>
      </header>
      <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '50px', maxWidth: '500px', margin: '50px', borderStyle: 'solid', borderWidth: '5px'}}>
      <input className="question" name="name" id="nme" required autoComplete="off" type="text" onChange={handleChange} value={mountain} />
      <label htmlFor="nme"><span>Enter mountain name?</span></label>
      <button className="button" onClick={()=> {fetchResort()}} style={{width: '200px', height: '50px', backgroundColor: 'grey', color: 'white', marginTop: '30px'}}>Get Current Info</button>
      </div>
      <br />
      <br />
      <br />
      {mountainData && <div>{mountainData}</div>}
      {mountainError && <div>{mountainError}</div>}
    </div>
  );
}

export default App;
