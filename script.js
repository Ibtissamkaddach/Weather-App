document.getElementById('weather-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const city = document.getElementById('city').value;
    getCoordinates(city);
  });
  
  function getCoordinates(city) {
    fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`)
      .then(response => response.json())
      .then(data => {
        if (data.results && data.results.length > 0) {
          const { latitude, longitude } = data.results[0];
          getWeather(latitude, longitude);
        } else {
          showError('City not found');
        }
      })
      .catch(error => {
        console.error('Error fetching the coordinates:', error);
        showError('Error fetching the coordinates');
      });
  }
  
  function getWeather(lat, lon) {
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`)
      .then(response => response.json())
      .then(data => {
        if (data.current_weather) {
          displayWeather(data.current_weather);
        } else {
          showError('Weather data not found');
        }
      })
      .catch(error => {
        console.error('Error fetching the weather data:', error);
        showError('Error fetching the weather data');
      });
  }
  
  function displayWeather(data) {
    const weatherResult = document.getElementById('weather-result');
    weatherResult.innerHTML = `
      <h2>Current Weather</h2>
      <p>Temperature: ${data.temperature} °C</p>
      <p>Weather: ${data.weathercode}</p>
      <p>Wind Speed: ${data.windspeed} m/s</p>
    `;
  }
  
  function showError(message) {
    const weatherResult = document.getElementById('weather-result');
    weatherResult.innerHTML = `<p class="error">${message}</p>`;
  }  