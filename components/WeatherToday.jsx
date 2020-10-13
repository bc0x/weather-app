import { getTimeString, formatTemp, formatPercentage } from '../utils';

export default function WeatherToday(props) {
  const { today } = props;

  return (
    <div className='column is-full'>
      <div class='table-container'>
        <table class='table is-striped is-fullwidth'>
          <tbody>
            <tr>
              <td>{`High / Low: ${formatTemp(today.temp.max)} / ${formatTemp(
                today.temp.min
              )}`}</td>
              <td>Wind: {today.wind_speed}</td>
            </tr>
            <tr>
              <td>{`Humidity: ${today.humidity}%`}</td>
              <td>{`Dew Point: ${formatTemp(today.dew_point)}`}</td>
            </tr>
            <tr>
              <td>Pressue: {today.pressure}</td>
              <td>{`UV Index: ${today.uvi}/10`}</td>
            </tr>
            <tr>
              <td>{`Sunrise / Sunset: ${getTimeString(
                today.sunrise
              )} / ${getTimeString(today.sunset)}`}</td>
              <td>{`Rain: ${formatPercentage(today.pop)}`}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
