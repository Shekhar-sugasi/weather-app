import partlyCloudyDay from "./assets/partly-cloudy-day.svg";
import partlyCloudyNight from "./assets/partly-cloudy-night.svg";
import clearDay from "./assets/clear-day.svg";
import cloudy from "./assets/cloudy.svg";
import rainy from "./assets/rain.avif";

export function displayWeather(data, useCelsius) {
  const weatherInfo = document.getElementById("weather-info");
  weatherInfo.innerHTML = "";

  let iconUrl;
  switch (data.current.icon) {
    case "partly-cloudy-day":
      iconUrl = partlyCloudyDay;
      break;
    case "partly-cloudy-night":
      iconUrl = partlyCloudyNight;
      break;
    case "clear-day":
      iconUrl = clearDay;
      break;
    case "cloudy":
      iconUrl = cloudy;
      break;
    case "rain":
      iconUrl = rainy;
      break;
    default:
      iconUrl = "";
      break;
  }

  const currentCard = document.createElement("div");
  currentCard.classList.add("card");

  const currentTitle = document.createElement("h2");
  currentTitle.textContent = "Current Weather";

  const weatherIcon = document.createElement("img");
  weatherIcon.src = iconUrl;
  weatherIcon.alt = data.current.description;
  weatherIcon.classList.add("weather-icon");

  const descriptionPara = document.createElement("p");
  descriptionPara.textContent = data.current.description;

  const tempPara = document.createElement("p");
  tempPara.textContent = `Temperature: ${convertTemp(
    data.current.temp,
    useCelsius
  )}°${useCelsius ? "C" : "F"}`;

  const feelsLikePara = document.createElement("p");
  feelsLikePara.textContent = `Feels Like: ${convertTemp(
    data.current.feelsLike,
    useCelsius
  )}°${useCelsius ? "C" : "F"}`;

  const windSpeedPara = document.createElement("p");
  windSpeedPara.textContent = `Wind Speed: ${data.current.windSpeed} mph`;

  const humidity = document.createElement("p");
  humidity.textContent = `Humidity: ${data.current.humidity}`;

  currentCard.appendChild(currentTitle);
  currentCard.appendChild(weatherIcon);
  currentCard.appendChild(descriptionPara);
  currentCard.appendChild(tempPara);
  currentCard.appendChild(feelsLikePara);
  currentCard.appendChild(windSpeedPara);
  currentCard.appendChild(humidity);

  weatherInfo.appendChild(currentCard);

  const outlookContainer = document.createElement("div");
  outlookContainer.classList.add("outlook-container");

  data.forecast.forEach((day) => {
    const dayCard = document.createElement("div");
    dayCard.classList.add("day-card");

    const dayTitle = document.createElement("h3");
    dayTitle.textContent = day.date;

    const maxPara = document.createElement("p");
    maxPara.textContent = `Max: ${convertTemp(day.max, useCelsius)}°${
      useCelsius ? "C" : "F"
    }`;

    const minPara = document.createElement("p");
    minPara.textContent = `Min: ${convertTemp(day.min, useCelsius)}°${
      useCelsius ? "C" : "F"
    }`;

    const precipPara = document.createElement("p");
    precipPara.textContent = `Precipitation: ${day.precip} in`;

    const dayDescriptionPara = document.createElement("p");
    dayDescriptionPara.textContent = day.description;

    dayCard.appendChild(dayTitle);
    dayCard.appendChild(maxPara);
    dayCard.appendChild(minPara);
    dayCard.appendChild(precipPara);
    dayCard.appendChild(dayDescriptionPara);

    outlookContainer.appendChild(dayCard);
  });

  weatherInfo.appendChild(outlookContainer);
}

function convertTemp(value, useCelsius) {
  return useCelsius ? value : (value * 9) / 5 + 32;
}
