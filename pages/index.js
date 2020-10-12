import Head from 'next/head';
import { useState } from 'react';
import { formatDate, getTimeString } from '../utils';

export default function Home() {
  const [weatherData, setWeatherData] = useState(null);
  const [units, setUnits] = useState('imperial');
  const [geo, setGeo] = useState({ lat: null, lon: null });
  const [inputValue, setInputValue] = useState('');

  const getWeather = async (e) => {
    const response = await fetch(
      `/api/weather?lat=${geo.lat}&lon=${geo.lon}&units=${units}`,
      {
        method: 'GET',
      }
    );
    const result = await response.json();
    setWeatherData(result);
  };

  const getGeoLocation = () => {
    if (!navigator.geolocation) {
    } else {
      navigator.geolocation.getCurrentPosition(
        (p) => {
          const { latitude, longitude } = p.coords;
          setGeo({ lat: latitude, lon: longitude });
          setInputValue(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
        },
        (e) => {
          console.log(e);
        }
      );
    }
  };

  return (
    <div>
      <Head>
        <title>Better Weather</title>
      </Head>

      <section className='hero is-small is-primary is-bold'>
        <div className='hero-body'>
          <div className='section'>
            <div className='container'>
              <h1 className='title'>Weather Getter</h1>
              <h2 className='subtitle'>The better weather app</h2>
            </div>
          </div>
          <div className='section'>
            <div className='container'>
              <div className='columns is-mobile'>
                <div className='column'>
                  <div className='field is-grouped'>
                    <p className='control'>
                      <span className='select'>
                        <select
                          value={units}
                          onChange={(e) => {
                            setUnits(e.target.value);
                          }}
                        >
                          <option value='imperial'>°F</option>
                          <option value='metric'>°C</option>
                        </select>
                      </span>
                    </p>
                    <p className='control is-expanded'>
                      <input
                        className='input'
                        type='text'
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                      />
                    </p>
                    <p className='control'>
                      <a
                        className='button is-info is-inverted'
                        onClick={getGeoLocation}
                      >
                        Locate
                      </a>
                    </p>
                    <p className='control'>
                      <a
                        className='button is-primary is-inverted'
                        onClick={getWeather}
                      >
                        Search
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {weatherData !== null && (
        <main className='section'>
          <div className='container'>
            <div className='box'>
              <p className='title'>{`Current - ${formatDate(
                weatherData.current.dt
              )}`}</p>
              <p className='subtitle'>{`${weatherData.current.weather[0].main} (${weatherData.current.weather[0].description})`}</p>
              <p className='subtitle is-6'>Temp: {weatherData.current.temp}</p>
              <p className='subtitle is-6'>
                Feels Like: {weatherData.current.feels_like}
              </p>
              <p className='subtitle is-6'>
                Wind Speed: {weatherData.current.wind_speed}
              </p>
              <p className='subtitle is-6'>
                Humidity: {weatherData.current.humidity}
              </p>
              <p className='subtitle is-6'>
                {`Sunrise: ${getTimeString(
                  weatherData.current.sunrise
                )} - Sunset: ${getTimeString(weatherData.current.sunset)}`}
              </p>
            </div>
          </div>
        </main>
      )}
    </div>
  );
}
