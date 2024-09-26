import { getWeatherData } from "./weather";
import { displayWeather } from "./display";
import "./styles.css";

const form = document.getElementById("location-form");
const toggleButton = document.getElementById("toggle-temp");
let useCelsius = true;
let weatherData = null;

function displayLoading(isLoading) {
  const weatherInfo = document.getElementById("weather-info");
  weatherInfo.innerHTML = isLoading ? "Loading..." : "";
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const location = document.getElementById("location-input").value;
  displayLoading(true);
  try {
    weatherData = await getWeatherData(location, useCelsius);
    displayLoading(false);
    displayWeather(weatherData, useCelsius);
  } catch (error) {
    displayLoading(false);
    alert("Error fetching weather data. Please try again.");
    console.error(error);
  }
});

function updateDisplayTemperatures() {
  if (weatherData) {
    useCelsius = !useCelsius;
    displayWeather(weatherData, useCelsius);
  }
}

toggleButton.addEventListener("click", updateDisplayTemperatures);
