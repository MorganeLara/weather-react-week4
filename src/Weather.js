import React, { useState } from "react";
import axios from "axios";

import "./Weather.css";

export default function Weather(props) {
  const [city, setCity] = useState(props.defaultCity);
  let [temperature, setTemperature] = useState("");
  let [description, setDescription] = useState("");
  let [humidity, setHumidity] = useState("");
  let [wind, setWind] = useState("");
  let [iconUrl, setIconUrl] = useState("");

  let form = (
    <form onSubmit={handleSubmit}>
      <div className="col-9">
        <input
          type="search"
          placeholder="Enter city here.."
          onChange={updateCity}
          className="form-control"
          autoFocus="on"
        />
      </div>
      <div className="col-3">
        <input type="submit" value="Search" className="btn btn-primary w-30" />
      </div>
    </form>
  );

  function updateWeather(response) {
    setTemperature(Math.round(response.data.main.temp));
    setDescription(response.data.weather[0].description);
    setHumidity(response.data.main.humidity);
    setWind(response.data.wind.speed);
    setIconUrl(
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  }

  function handleSubmit(event) {
    event.preventDefault();
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=6c5702b8e0bdf208e797742914ea7cea&units=metric`;
    axios.get(apiUrl).then(updateWeather);
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  if (temperature) {
    return (
      <div className="Weather">
        {form}
        <div className="temperature">
          {temperature}
          <span className="celcius">C°</span>
          <img src={iconUrl} alt={description} className="image" />
        </div>
        <hr />
        <div>
          <ul>
            <li className="weather-attributs">☁️ {description}</li>
            <li className="weather-attributs">☔️ {humidity}%</li>
            <li className="weather-attributs">🍃 {wind} mph</li>
          </ul>
        </div>
      </div>
    );
  } else {
    return <div>{form}</div>;
  }
}
