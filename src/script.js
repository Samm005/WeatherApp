const WeatherForm = document.getElementById("Weather");
const cityName = document.getElementById("cityName");
const displaycard = document.getElementById("displayCard");
const City = document.getElementById("City");
const date = document.getElementById("date");
const Temp = document.getElementById("Temp");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const Description = document.getElementById("Description");
const WeatherIcon = document.getElementById("WeatherIcon");
const Toggle = document.getElementById("Toggle");
const errorMsg = document.getElementById("Errormsg");
const forecast = document.getElementById("forecast");

const apiKey = "eb633ce525f89f1c11e0709bceb0108d";

let isCelsius = true;
let StoredData = null;

WeatherForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const CityN = cityName.value.trim();

  forecast.innerHTML = "";
  errorMsg.classList.add("hidden");
  displaycard.classList.add("hidden");

  if (CityN) {
    try {
      const weatherInfo = await weatherData(CityN);
      displayweather(weatherInfo);
    } catch (error) {
      console.error(error);
      displayError(error);
    }
  } else {
    displayError("Please enter a city");
  }
});

async function weatherData(city) {
  const apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
  const response = await fetch(apiURL);

  console.log(response);

  if (!response.ok) {
    throw new Error("Could not fetch weather data");
  }

  return await response.json();
}

function displayweather(data) {
  StoredData = data;
  forecast.innerHTML = "";
  displaycard.classList.remove("hidden");
  errorMsg.classList.add("hidden");
  City.textContent = data.city.name;

  const today = data.list[0];
  const todayDate = new Date(today.dt * 1000).toDateString();
  const todayTemp = Math.round(today.main.temp - 273.15);
  const todayHumidity = today.main.humidity;
  const todayDesc = today.weather[0].description;
  const todayweatherid = today.weather[0].id;
  const todayWS = today.wind.speed;
  const todayWD = today.wind.deg;

  date.textContent = todayDate;
  Temp.textContent = `${todayTemp}°C`;
  humidity.textContent = `Humidity: ${todayHumidity}%`;
  wind.textContent = `Wind: ${todayWS} m/s, ${todayWD}°`;
  Description.textContent = todayDesc;

  const weatherToday = weatherEmoji(todayweatherid);
  WeatherIcon.textContent = weatherToday.emoji;

  const indexes = [0, 8, 16, 24, 32];

  indexes.forEach((i) => {
    const item = data.list[i];
    const fDate = new Date(item.dt * 1000).toDateString();
    const fTemp = Math.round(item.main.temp - 273.15);
    const fHum = item.main.humidity;
    const fwindspeed = item.wind.speed;
    const fwinddeg = item.wind.deg;
    const fWeather = weatherEmoji(item.weather[0].id);
    const fDesc = item.weather[0].description;

    const card = document.createElement("div");
    card.className = `p-4 rounded-xl shadow-xl text-center w-52 flex flex-col items-center text-white`;
    card.style.background = fWeather.bg;

    card.innerHTML = `
      <h3 class="text-lg font-bold">${fDate}</h3>
      <p class="text-xl tempval">${fTemp}°C</p>
      <p class="text-xl">Humidity: ${fHum}%</p>
      <p class="text-xl">Wind(m/s):${fwindspeed} (deg):${fwinddeg}</p> 
      <p class="text-xl">${fDesc}</p>
      <p class="text-xl">${fWeather.emoji}</p>
    `;

    forecast.appendChild(card);
  });
}

function weatherEmoji(weatherId) {
  switch (true) {
    case weatherId >= 200 && weatherId < 300:
      return {
        emoji: "⛈️",
        bg: "linear-gradient(135deg, #1f2937, #ca8a04, #1e40af)",
      }; //thunderstorm
    case weatherId >= 300 && weatherId < 400:
      return {
        emoji: "🌦️",
        bg: "linear-gradient(135deg, #60a5fa, #3b82f6)",
      }; //drizzle
    case weatherId >= 500 && weatherId < 600:
      return { emoji: "🌧️", bg: "linear-gradient(135deg, #1e3a8a, #475569)" }; //rain
    case weatherId >= 600 && weatherId < 700:
      return { emoji: "🌨️", bg: "linear-gradient(135deg, #e2e8f0, #cbd5e1)" }; //snow
    case weatherId >= 700 && weatherId < 800:
      return { emoji: "🌫️", bg: "linear-gradient(135deg, #64748b, #475569)" }; //fog
    case weatherId == 800:
      return {
        emoji: "☀️",
        bg: "linear-gradient(135deg, #d97706, #f97316, #b91c1c)",
      }; //sunny
    case weatherId >= 801 && weatherId < 810:
      return { emoji: "🌥️", bg: "linear-gradient(135deg, #facc15, #f1f5f9)" }; //cloudy
    default:
      return {
        emoji: "🌈",
        bg: "linear-gradient(135deg, #facc15, #db2777)",
      };
  }
}

function displayError(msg) {
  errorMsg.textContent = msg;
  errorMsg.style.color = "darkred";
  errorMsg.classList.remove("hidden");

  forecast.innerHTML = "";

  displaycard.classList.remove("hidden");
  City.textContent = "";
  date.textContent = "";
  Temp.textContent = "";
  wind.textContent = "";
  humidity.textContent = "";
  Description.textContent = "";
  WeatherIcon.textContent = "";
  Toggle.classList.add("hidden");
}

function ToggleTemp() {
  isCelsius = !isCelsius;
  Toggle.textContent = isCelsius ? "Switch to °F" : "Switch to °C";

  const temp = document.querySelectorAll(".tempval");

  temp.forEach((e) => {
    let val = parseFloat(e.textContent);
    let newval;

    if (isCelsius) {
      newval = Math.round((val * 9) / 5 + 32);
      e.textContent = `${newval}°F`;
    } else {
      newval = Math.round(((val - 32) * 5) / 9);
      e.textContent = `${newval}°C`;
    }
  });
}

function Dropdownmenu() {}

function CurrentLoc() {}
