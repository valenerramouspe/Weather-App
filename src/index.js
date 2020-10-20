let todayDateInfo = document.querySelector("#today-date");
let todayTime = document.querySelector("#today-time");
let displayedWeather = document.querySelector("#displayed-weather");
let todayIcon = document.querySelector("#today-icon");
let wind = document.querySelector("#wind");
let humidity = document.querySelector("#humidity");
let city = document.querySelector("#city-name");

let now = new Date();

let weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let weekdayToday = weekdays[now.getDay()];
let monthToday = months[now.getMonth()];
let dateToday = now.getDate();
let hoursToday = now.getHours() < 10 ? `0${now.getHours()}` : now.getHours();
let minutesToday =
  now.getMinutes() < 10 ? `0${now.getMinutes()}` : now.getMinutes();

let apiKey = "e6199950e553c8bb69a0156aea95bccb";

todayDateInfo.innerHTML = `${weekdayToday} ${monthToday} ${dateToday}`;

todayTime.innerHTML = `${hoursToday} : ${minutesToday}`;

let searchBar = document.querySelector("#search-bar");
let insertCity = document.querySelector("#insert-city");
let searchButton = document.querySelector(".searchButton");
let currentButton = document.querySelector(".currentButton");

let d = new Date();
let localTime = d.getTime();
let localOffset = d.getTimezoneOffset() * 60000;
let utc = localTime + localOffset;

function getWeatherInfo(event) {
  event.preventDefault();
  axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?q=${insertCity.value}&appid=${apiKey}&units=metric`
    )
    .then(displayCityInfo);
}

function displayCityInfo(response) {
  console.log(response.data);
  let offset = utc + response.data.timezone * 1000;
  let cityDate = new Date(offset);
  let weekdayCity = weekdays[cityDate.getDay()];
  let monthCity = months[cityDate.getMonth()];
  let dateCity = cityDate.getDate();
  let hoursCity =
    cityDate.getHours() < 10 ? `0${cityDate.getHours()}` : cityDate.getHours();
  let minutesCity =
    cityDate.getMinutes() < 10
      ? `0${cityDate.getMinutes()}`
      : cityDate.getMinutes();
  let icon = response.data.weather[0].icon;
  celsiusTemp = Math.round(response.data.main.temp);
  city.innerHTML = `${response.data.name}`;
  todayDateInfo.innerHTML = `${weekdayCity} ${monthCity} ${dateCity}`;
  todayTime.innerHTML = `${hoursCity} : ${minutesCity}`;
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  wind.innerHTML = `Wind: ${Math.round(response.data.wind.speed * 3.6)} Km/h`;
  displayedWeather.innerHTML = `${response.data.weather[0].description}`;
  temperatureNow.innerHTML = `${celsiusTemp}C°`;
  todayIcon.setAttribute("src", `http://openweathermap.org/img/w/${icon}.png`);
}

function getCoordinates(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
    )
    .then(showCurrentData);
}

function showCurrentData(response) {
  let name = response.data.name;
  let icon = response.data.weather[0].icon;
  celsiusTemp = Math.round(response.data.main.temp);
  console.log(response.data);
  city.innerHTML = `${name}`;
  todayDateInfo.innerHTML = `${weekdayToday} ${monthToday} ${dateToday}`;
  todayTime.innerHTML = `${hoursToday} : ${minutesToday}`;
  temperatureNow.innerHTML = `${celsiusTemp}C°`;
  wind.innerHTML = `Wind: ${Math.round(response.data.wind.speed * 3.6)} Km/h`;
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  displayedWeather.innerHTML = `${response.data.weather[0].description}`;
  todayIcon.setAttribute("src", `http://openweathermap.org/img/w/${icon}.png`);
}

function getCelsius(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  temperatureNow.innerHTML = `${Math.round(celsiusTemp)}C°`;
}
function getFahrenheit(event) {
  event.preventDefault();
  fahrenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");
  temperatureNow.innerHTML = `${Math.round((celsiusTemp * 9) / 5 + 32)}F°`;
}

function getLocation() {
  navigator.geolocation.getCurrentPosition(getCoordinates);
}

searchBar.addEventListener("submit", getWeatherInfo);

currentButton.addEventListener("click", getLocation);

let celsiusLink = document.querySelector("#celsius");

let fahrenheitLink = document.querySelector("#fahrenheit");

celsiusLink.addEventListener("click", getCelsius);
fahrenheitLink.addEventListener("click", getFahrenheit);

let temperatureNow = document.querySelector("#temperature-now");

let celsiusTemp = "29";
