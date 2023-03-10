import{ useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import "../App.css";
import Button from '@mui/material/Button';
import PlaygroundReview from './PlaygroundReview';

const Playground = () => {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [status, setStatus] = useState(null);
  const [data, setData] = useState(null);

  const getLocation = () => {
      if (!navigator.geolocation) {
    setStatus('Geolocation is not supported by your browser');
  } else {
          setStatus('Locating...');
          navigator.geolocation.getCurrentPosition((position) => {
              setStatus(null);
              let lat = position.coords.latitude
              let lon = position.coords.longitude
              setLat(lat);
              setLng(lon);
              // lat = 28.579658
              // lon = -81.5544266
              const url = `http://localhost:8000/playground_api/?lat=${lat}&lon=${lon}`
              const fetchPlaygrounds = async() => {
                const response = await axios.get(url)
                console.log('hello',response.data.result.results)
                setData(response.data.result.results)
                
              }
              fetchPlaygrounds()
          }, () => {
              
              setStatus('Unable to retrieve your location');
              
          });
      }
  }
  
  
return (
  <div className="App">
    <button onClick={getLocation}>Fetch Playgrounds</button>
    <hr></hr>
    <h2 style={{fontFamily: "Fantasy"}}>Coordinates</h2>
          <p>{status}</p>
          
    {lat && <p>Latitude: {lat}</p>}
    {lng && <p>Longitude: {lng}</p>}
    <div id='playgrounds'>{data?.map((playground)=> {
      const {name: park_name,rating,place_id} = playground
      return (
        <div className='playground' key={place_id}>
        <h3>Park Name: {park_name}</h3>
        <h4>Rating: {rating}</h4>
        <h4>PlaceId: {place_id}</h4>
        
        <PlaygroundReview playgroundData={{park_name, rating, place_id}}/>
        </div>
      )
    })}</div>
  </div>
);
}

export default Playground;

// import { useEffect, useState } from "react";
// import axios from "axios";

// function App() {
//   const [currLocation, setCurrLocation] = useState({});
 
//   useEffect(() => {
//     getLocation();
//   }, []);

//   const getLocation = async () => {
//     const location = await axios.get("https://ipapi.co/json");
//     setCurrLocation(location.data);
//   };

//   return (
//     <div>
//       <h1>Current Location</h1>
//       <p>Latitude: {currLocation.latitude}</p>
//       <p>Longitude: {currLocation.longitude}</p>
//       <p>City: {currLocation.city}</p>

      
//     </div>
//   );
// }

// export default App;
