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
  forecast.innerHTML = "";
  displaycard.classList.remove("hidden");
  errorMsg.classList.add("hidden");
  City.textContent = data.city.name;

  const today = data.list[0];
  const todayDate = new Date(today.dt * 1000).toDateString();
  const todayTemp = Math.round(today.main.temp - 273.15);
  const todayHumidity = today.main.humidity;
  const todayDesc = today.weather[0].description;
  const todayIcon = today.weather[0].icon;

  date.textContent = todayDate;
  Temp.textContent = `Temperature: ${todayTemp}°C`;
  humidity.textContent = `Humidity: ${todayHumidity}%`;
  Description.textContent = todayDesc;
  WeatherIcon.innerHTML = `<img src="https://openweathermap.org/img/wn/${todayIcon}@2x.png">`;

  const indexes = [0, 8, 16, 24, 32];

  indexes.forEach((i) => {
    const item = data.list[i];
    const fDate = new Date(item.dt * 1000).toDateString();
    const fTemp = Math.round(item.main.temp - 273.15);
    const fHum = item.main.humidity;
    const fDesc = item.weather[0].description;
    const fIcon = item.weather[0].icon;

    const card = document.createElement("div");
    card.className =
      "bg-white p-4 rounded-xl shadow-xl text-center w-52 flex flex-col items-center";

    card.innerHTML = `
      <h3 class="text-lg font-bold">${fDate}</h3>
      <img src="https://openweathermap.org/img/wn/${fIcon}@2x.png">
      <p class="text-xl font-semibold">${fTemp}°C</p>
      <p>Humidity: ${fHum}%</p>
      <p>${fDesc}</p>
    `;

    forecast.appendChild(card);
  });
}

function weatherEmoji(weatherId) {}

function displayError(msg) {
  errorMsg.textContent = msg;
  errorMsg.style.color = "darkred";
  errorMsg.classList.remove("hidden");

  forecast.innerHTML = "";

  displaycard.classList.remove("hidden");
  City.textContent = "";
  date.textContent = "";
  Temp.textContent = "";
  humidity.textContent = "";
  Description.textContent = "";
  WeatherIcon.textContent = "";
  Toggle.classList.add("hidden");
}

function ToggleTemp() {}

function Dropdownmenu() {}

function CurrentLoc() {}
