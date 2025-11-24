const WeatherForm = document.getElementById("Weather");
const cityName = document.getElementById("cityName");
const displaycard = document.getElementById("displayCard");
const City = document.getElementById("City");
const Temp = document.getElementById("Temp");
const humidity = document.getElementById("humidity");
const Description = document.getElementById("Description");
const WeatherIcon = document.getElementById("WeatherIcon");
const Toggle = document.getElementById("Toggle");

const apiKey = "eb633ce525f89f1c11e0709bceb0108d";

WeatherForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const CityN = cityName.value.trim();

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

async function weatherData(city) {}

function displayweather(data) {}

function weatherEmoji(weatherId) {}

function displayError(msg) {
  const errorMsg = document.getElementById("Errormsg");
  errorMsg.textContent = msg;
  errorMsg.style.color = "darkred";
  errorMsg.classList.remove("hidden");

  displaycard.classList.remove("hidden");
  City.textContent = "";
  Temp.textContent = "";
  humidity.textContent = "";
  Description.textContent = "";
  WeatherIcon.textContent = "";
  Toggle.classList.add("hidden");
}

function ToggleTemp() {}

function Dropdownmenu() {}

function CurrentLoc() {}
