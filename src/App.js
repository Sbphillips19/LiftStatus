import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import 'whatwg-fetch';
import { findByLabelText, render } from '@testing-library/react';

// const esc = encodeURIComponent;
// export const queryFunc = (params) => Object.keys(params)
//   .map(k => esc(k) + '=' + esc(params[k]))
//   .join('&');

function App() {

  const [mountain, setMountain] = useState("");
  const [mountainData, setMountainData] = useState("");
  const [mountainError, setMountainError] = useState("");

  const fetchResort = async () => {

    // const url = `https://evening-inlet-99281.herokuapp.com/https://liftie.info/api/resort/${mountain}`;

    // const response = await fetch(url);
    // if (!response.ok) {
    //   console.log('Could not fetch user', response);
    //   setMountainData("");
    //   return setMountainError(response);
    // }
    // debugger;
    // setMountainData(response.json());
    // setMountainError("");

    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
      response: 'application/json; charset=utf-8'
    };

    fetch(`https://evening-inlet-99281.herokuapp.com/https://liftie.info/api/resort/${mountain}`, requestOptions)
      .then(response => response.text())
      .then(result => setMountainData(JSON.parse(result)))
      .catch(error => {
        console.log(setMountainError(error))
        setMountainError(error)
        alert("please select a valid mountain")
      }
      );
  };


  const handleChange = (event) => {
    setMountain(event.target.value);
  }

  console.log("5", mountainData && mountainData)

  return (
    <div className="App">
      <header className="App-header">
        <h1>Mountain Status</h1>
      </header>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '50px', maxWidth: '500px', margin: '50px', borderStyle: 'solid', borderWidth: '5px' }}>
        <input className="question" name="name" id="nme" required autoComplete="off" type="text" onChange={handleChange} value={mountain} />
        <label htmlFor="nme"><span>Enter mountain name?</span></label>
        <button className="button" onClick={() => { mountain !== "" ? fetchResort() :  alert("please type in a moutain")}} style={{ width: '200px', height: '50px', backgroundColor: '#61dafb', color: 'white', marginTop: '30px' }}>Get Current Info</button>
      </div>
      <br />
      <br />
      <br />
      {mountainData && <h1>Moutain ID: {mountainData.id}</h1>}
      {mountainData &&
        <div style={{ borderStyle: 'solid', borderWidth: '5px', marginLeft: '50px', width: '350px' }}>
          <ul style={{ display: 'flex', flexDirection: 'column', width: '350px', alignItems: 'flex-start' }}>
            <h2>Lift Status:</h2>
            {Object.keys(mountainData.lifts.status).map(key =>
              <li key={key}>{key}: {mountainData.lifts.status[key]}</li>
            )
            }
          </ul>
        </div>
      }
      {mountainData &&
        <div style={{ borderStyle: 'solid', borderWidth: '5px', marginLeft: '50px', width: '350px' }}>
          <h2 style={{ marginLeft: '50px', marginTop: '20px' }}>Weather</h2>
          <div>Date: {mountainData.weather.date}</div>
          <div>Conditions: {mountainData.weather.conditions}</div>
          <div>More Info: {mountainData.weather.text}</div>
          <br />
          <br />
          <div>Max Temp: {mountainData.weather.temperature.max}</div>
        </div>
      }
      {mountainData &&
        <div style={{ borderStyle: 'solid', borderWidth: '5px', marginLeft: '50px', width: '400px' }}>
          <h2 style={{ marginLeft: '50px', marginTop: '20px' }}>Images</h2>
          <img width="300" height="300" src={mountainData.webcams[0].image} />
        </div>
      }
    </div >
  );
}

export default App;
