import { getTimeString, formatTemp, formatPercentage } from '../utils';

export default function TodayHighlight(props) {
  const { current, inputValue, pop } = props;
  return (
    <div className='content'>
      <h1 className='title is-4'>{`${inputValue} Weather`}</h1>
      <h2 className='subtitle is-6'>{`as of ${getTimeString(current.dt)}`}</h2>
      <div className='has-text-primary'>
        <span className='is-size-1'>{formatTemp(current.temp)}</span>
        <span className='is-size-4'>{`(${formatTemp(
          current.feels_like
        )})`}</span>
      </div>
      <div>{`${current.weather_desc}`}</div>
      <div>{`Chance of Rain: ${formatPercentage(pop)}`}</div>
    </div>
  );
}
