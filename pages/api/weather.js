// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async (req, res) => {
  const { OPEN_WEATHER_KEY } = process.env;
  const { lat, lon, units } = req.query;
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&appid=${OPEN_WEATHER_KEY}&units=${units}`
  );
  const result = await response.json();
  res.statusCode = response.status;
  res.json(result);
};
