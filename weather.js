const apiKey = ENV.API_KEY;
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const inputField = document.getElementById("inp");
const searchBtn = document.getElementById("searchBtn");
const body = document.querySelector("body");
const mainContent = document.getElementById("mainContent");
const errorMsg = document.getElementById("errorMsg");

function formatTime(unixTimestamp, timezoneOffset) {
    const d = new Date((unixTimestamp + timezoneOffset) * 1000);
    let hours = d.getUTCHours();
    let minutes = d.getUTCMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return hours + ':' + minutes + ' ' + ampm;
}

async function checkWeather(place) {
    if (!place.trim()) return;

    try {
        const response = await fetch(apiUrl + place + `&appid=${apiKey}`);

        if (response.status === 404) {
            errorMsg.style.display = "block";
            mainContent.classList.add("hidden");
        } else {
            const info = await response.json();
            
            errorMsg.style.display = "none";
            mainContent.classList.remove("hidden");

            document.getElementById("placeName").textContent = info.name;
            document.getElementById("temperature").textContent = Math.round(info.main.temp) + "°C";
            document.getElementById("condition").textContent = info.weather[0].main;
            document.getElementById("tempMaxMin").textContent = Math.round(info.main.temp_max) + "° / " + Math.round(info.main.temp_min) + "°";
            
            document.getElementById("h1").textContent = info.main.humidity + "%";
            document.getElementById("h2").textContent = Math.round(info.main.feels_like) + "°C";
            document.getElementById("h3").textContent = info.wind.speed + " km/h";
            document.getElementById("h6").textContent = info.main.pressure + " hPa";

            document.getElementById("h4").textContent = formatTime(info.sys.sunrise, info.timezone);
            document.getElementById("h5").textContent = formatTime(info.sys.sunset, info.timezone);

            if (info.weather[0].main === "Clouds") {
                body.className = "theme-clouds";
            } else {
                body.className = "theme-clear";
            }
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(inputField.value);
});

inputField.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        checkWeather(inputField.value);
    }
});
