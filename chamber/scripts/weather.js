const apiKey = "abcd1234yourkeyhere"; // OpenWeatherMap API key
const lat = 6.5244;
const lon = 3.3792;

const weatherURL =
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

async function loadWeather() {
    try {
        const response = await fetch(weatherURL);
        const data = await response.json();

        document.getElementById("current-temp").textContent =
            Math.round(data.list[0].main.temp);

        document.getElementById("weather-desc").textContent =
            data.list[0].weather[0].description;

        const forecast = document.getElementById("forecast");
        forecast.innerHTML = "";

        const days = data.list.filter(item =>
            item.dt_txt.includes("12:00:00")
        );

        days.slice(0, 3).forEach(day => {
            const date = new Date(day.dt_txt).toLocaleDateString("en-US", {
                weekday: "short"
            });

            const p = document.createElement("p");
            p.textContent = `${date}: ${Math.round(day.main.temp)}°C`;
            forecast.appendChild(p);
        });

    } catch (error) {
        console.error("Weather error:", error);
    }
}

loadWeather();
