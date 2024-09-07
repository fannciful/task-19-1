const apiKey = 'e9b6c5056199174d06d46286323f793d';
const city = 'Lviv';  

function getWeatherIcon(weather) {
    if (weather.includes('clear')) {
        return 'fas fa-sun'; 
    } else if (weather.includes('cloud')) {
        return 'fas fa-cloud'; 
    } else if (weather.includes('rain')) {
        return 'fas fa-cloud-showers-heavy'; 
    } else if (weather.includes('snow')) {
        return 'fas fa-snowflake'; 
    } else {
        return 'fas fa-cloud-sun'; 
    }
}

async function fetchWeatherData() {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
        const data = await response.json();

        document.getElementById('temperature').textContent = `${Math.round(data.main.temp)}°C`;
        document.getElementById('feels-like').textContent = `Feels Like: ${Math.round(data.main.feels_like)}°C`;
        document.getElementById('description').textContent = data.weather[0].description;
        document.getElementById('details').textContent = `Humidity: ${data.main.humidity}% | Pressure: ${data.main.pressure} hPa | Wind: ${data.wind.speed} km/h`;

        const weatherIconElement = document.getElementById('weather-icon');
        const weatherCondition = data.weather[0].main.toLowerCase();
        const newIconClass = getWeatherIcon(weatherCondition);

        weatherIconElement.className = newIconClass;

        updateTime();
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

function updateTime() {
    const now = new Date();
    document.getElementById('time').textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    document.getElementById('date-time').textContent = now.toDateString();
}

document.getElementById('refresh-button').addEventListener('click', fetchWeatherData);

fetchWeatherData();
