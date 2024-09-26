const API_KEY = "J33SGBVHSYTTR769NVZDVZKH9";
const BASE_URL =
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";

export async function getWeatherData(location, useCelsius) {
  const unitGroup = useCelsius ? "metric" : "us";
  const url = `${BASE_URL}${location}?unitGroup=${unitGroup}&key=${API_KEY}&contentType=json`;

  const response = await fetch(url, { mode: "cors" });
  if (!response.ok) throw new Error("Failed to fetch weather data.");

  const data = await response.json();
  console.log(data);
  return processWeatherData(data);
}

function processWeatherData(data) {
  return {
    current: {
      temp: data.currentConditions.temp,
      feelsLike: data.currentConditions.feelslike,
      icon: data.currentConditions.icon,
      description: data.currentConditions.conditions,
      windSpeed: data.currentConditions.windspeed,
      humidity: data.currentConditions.humidity,
    },
    forecast: data.days.slice(0, 3).map((day) => ({
      date: day.datetime,
      max: day.tempmax,
      min: day.tempmin,
      precip: day.precip,
      description: day.conditions,
    })),
  };
}
