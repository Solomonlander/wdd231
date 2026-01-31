const currentTemp = document.querySelector("#current-temp");
const weatherDesc = document.querySelector("#weather-desc");
const forecastDiv = document.querySelector("#forecast");

const apiKey = "18ab172ea7c60591f12e3ba379aa008b";
const lat = 6.5244;
const lon = 3.3792;

const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

async function getWeather() {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Weather API failed");
        }

        const data = await response.json();

        // Current weather
        currentTemp.textContent = `${Math.round(data.list[0].main.temp)}°C`;
        weatherDesc.textContent = data.list[0].weather[0].description;

        // 3-day forecast (12:00 PM)
        forecastDiv.innerHTML = "";

        const forecastDays = data.list.filter(item =>
            item.dt_txt.includes("12:00:00")
        ).slice(0, 3);

        forecastDays.forEach(day => {
            const p = document.createElement("p");
            p.textContent = `${new Date(day.dt_txt).toLocaleDateString("en-US", {
                weekday: "short"
            })}: ${Math.round(day.main.temp)}°C`;
            forecastDiv.appendChild(p);
        });

    } catch (error) {
        console.error(error);
        currentTemp.textContent = "Weather unavailable";
        weatherDesc.textContent = "";
    }
}

getWeather();
