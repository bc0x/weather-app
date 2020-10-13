import Head from 'next/head';
import { useEffect, useState } from 'react';
import ForecastCard from '../components/ForecastCard';
import WeatherToday from '../components/WeatherToday';
import TodayHighlight from '../components/TodayHighlight';

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

  useEffect(() => {
    console.log('executed');
    getGeoLocation();
  }, []);

  return (
    <div>
      <Head>
        <title>Better Weather</title>
      </Head>

      <section className='hero is-small is-primary is-bold'>
        <div className='hero-body'>
          <div className='section'>
            <div className='container'>
              <h1 className='title'>Better Weather</h1>
              <h2 className='subtitle'>The weather getter app</h2>
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
        <>
          <div className='section'>
            <div className='container'>
              <div className='box'>
                <TodayHighlight
                  current={weatherData.current}
                  inputValue={inputValue}
                  pop={weatherData.today.pop}
                />
              </div>
            </div>
          </div>
          <div className='section'>
            <div className='container'>
              <div className='box'>
                <p className='title'>Today's Forecast</p>
                <div className='columns is-multiline is-mobile'>
                  {[
                    ['Morning', 'morn'],
                    ['Day', 'day'],
                    ['Evening', 'eve'],
                    ['Night', 'night'],
                  ].map(([display, key]) => {
                    return (
                      <ForecastCard
                        type='today'
                        data={{
                          header: display,
                          temp: weatherData.today.temp[key],
                          feels_like: weatherData.today.feels_like[key],
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className='section'>
            <div className='container'>
              <div className='box'>
                <p className='title'>Weather Today</p>
                <div className='columns is-multiline is-mobile'>
                  <WeatherToday today={weatherData.today} />
                </div>
              </div>
            </div>
          </div>
          <div className='section'>
            <div className='container'>
              <div className='box'>
                <p className='title'>Hourly Forecast</p>
                <div className='columns is-multiline is-mobile'>
                  {weatherData.hourly.slice(0, 10).map((hourlyData) => {
                    return <ForecastCard type='hourly' data={hourlyData} />;
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className='section'>
            <div className='container'>
              <div className='box'>
                <p className='title'>Daily Forecast</p>
                <div className='columns is-multiline is-mobile'>
                  {weatherData.daily.slice(0, 5).map((dailyData) => {
                    return <ForecastCard type='daily' data={dailyData} />;
                  })}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
