const currentTemp = document.querySelector("#current-temp");
const weatherDesc = document.querySelector("#weather-desc");
const forecastDiv = document.querySelector("#forecast");

const apiKey = "YOUR_API_KEY_HERE"; // ← replace with your OpenWeather API key
const lat = 6.5244;  // Lagos latitude
const lon = 3.3792;  // Lagos longitude

const weatherURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

async function getWeather() {
    try {
        const response = await fetch(weatherURL);
        if (!response.ok) {
            throw new Error("Weather API error");
        }

        const data = await response.json();

        // Current weather (first item)
        currentTemp.textContent = `${Math.round(data.list[0].main.temp)}°C`;
        weatherDesc.textContent = data.list[0].weather[0].description;

        // 3-day forecast (every 24 hrs)
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
