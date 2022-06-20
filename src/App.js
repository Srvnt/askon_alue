import React from 'react';
import './App.css';


const QUERY = `
{
  stop(id: "Lahti:207190") {
    name
    stoptimesWithoutPatterns(numberOfDepartures: 50) {
      stop {
        platformCode
      }
      scheduledArrival
      scheduledDeparture
      trip {
        route {
          shortName
        }
      }
      headsign
    }
  }
}
`

function App() {
    const [arrivals, setArrivals] = React.useState([]);

    React.useEffect(() => {
        fetch('https://api.digitransit.fi/routing/v1/routers/waltti/index/graphql', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query: QUERY })
        }).then(response => response.json())
            .then(data => setArrivals(data.data.stop.stoptimesWithoutPatterns))
    }, []);
  return (
    <div className="App">
      <h1>Arrivals, capped @ 50 </h1>
          <ul className="List">
              
              {arrivals.map((arrival =>
                  <li key={arrival.headsign}>{Math.floor(arrival.scheduledArrival / 3600)} {Math.floor(arrival.scheduledArrival % 3600 / 60 )}</li>
              ))}
          </ul>  
    </div>
  );
}

export default App;
