import "./App.css";
import React, { useState } from "react";
import dotenv from "dotenv/config";

function App() {
  const apiKey = process.env.REACT_APP_API_KEY;
  const baseURL = process.env.REACT_APP_API_URL;

  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState("");

  const search = (evt) => {
    var city = "",
      country = "";

    if (evt.key === "Enter") {
      if (query.includes(",")) {
        [city, country] = query.split(",");
        console.log(
          `${baseURL}q=${city},${country}&units=metric&appid=${apiKey}`
        );
        fetch(`${baseURL}q=${city},${country}&units=metric&appid=${apiKey}`)
          .then((res) => res.json())
          .then((result) => {
            console.log(result);
            setWeather(result);
            setQuery("");
          })
          .catch((err) => {
            console.log(err);
            });
      }
    }
  };

  const createDate = (dateParam) => {
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
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[dateParam.getDay()];
    let date = dateParam.getDate();
    let month = months[dateParam.getMonth()];
    let year = dateParam.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  const tempLevel = [30, 13, 0];

  return (
    <div
      className={
        weather === ""
          ? "app"
          : weather.main.temp >= tempLevel[0]
          ? "app-hot"
          : weather.main.temp >= tempLevel[1]
          ? "app-warm"
          : "app-cold"
      }
    >
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Dubai,UAE"
            onChange={(e) => {
              setQuery(e.target.value);
            }}
            value={query}
            onKeyPress={search}
          ></input>
        </div>
        {typeof weather.main != "undefined" ? (
          <>
            <div className="location-box">
              <div className="location">
                {weather.name},{weather.sys.country}
              </div>
              <div className="date">{createDate(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)}°C</div>
              <div className="weather">
                {weather.weather[0].description.toUpperCase()}
              </div>
            </div>
          </>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}

export default App;
