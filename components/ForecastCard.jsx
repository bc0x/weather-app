import {
  getTimeString,
  getDateString,
  formatTemp,
  formatPercentage,
} from '../utils';

export default function ForecastCard(props) {
  const { type, data = {} } = props;

  if (type === 'today') {
    return (
      <div className='column is-one-quarter' key={data.header}>
        <div className='card'>
          <div className='card-content'>
            <div className='content is-small has-text-centered'>
              <h1>{data.header}</h1>
              <h3 className='has-text-primary'>{`${formatTemp(data.temp)}`}</h3>
              <p className='is-size-6'>
                Feels Like: {formatTemp(data.feels_like)}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'hourly') {
    return (
      <div className='column is-one-fifth' key={data.dt}>
        <div className='card'>
          <div className='card-content'>
            <div className='content is-small has-text-centered'>
              <h1>{getTimeString(data.dt)}</h1>
              <h3 className='has-text-primary'>{`${formatTemp(data.temp)}`}</h3>
              <p className='is-size-6'>Rain: {formatPercentage(data.pop)}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='column is-one-fifth' key={data.dt}>
      <div className='card'>
        <div className='card-content'>
          <div className='content is-small has-text-centered'>
            <h1>{getDateString(data.dt)}</h1>
            <h3 className='has-text-primary'>{`${formatTemp(
              data.temp.max
            )}`}</h3>
            <h4 className='has-text-info'>{`${formatTemp(data.temp.min)}`}</h4>
            <p className='is-size-6'>Rain: {formatPercentage(data.pop)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
