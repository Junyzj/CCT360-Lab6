// Coordinates for the Mississauga campus. Times are returned in local time.
const url = "https://api.open-meteo.com/v1/forecast?latitude=43.548&longitude=-79.663&current=temperature_2m&timezone=America%2FToronto";

const button = document.querySelector("#refresh");
const temperature = document.querySelector("#temperature");
const tip = document.querySelector("#tip");
const time = document.querySelector("#time");

async function updateWeather() {
  button.disabled = true;
  tip.textContent = "Checking the weather…";

  try {
    const response = await fetch(url, { cache: "no-store" });

    if (!response.ok) {
      throw new Error("Weather request failed");
    }

    const data = await response.json();
    const degrees = data.current.temperature_2m;

    if (!Number.isFinite(degrees)) {
      throw new Error("Temperature unavailable");
    }

    temperature.textContent = degrees + " °C";
    time.textContent = "Campus local time · " + data.current.time.replace("T", " · ");

    if (degrees < 10) {
      document.body.className = "cool";
      tip.textContent = "Grab a warm jacket for the walk to class.";
    } else if (degrees < 22) {
      document.body.className = "mild";
      tip.textContent = "A light layer should work for the walk to class.";
    } else {
      document.body.className = "warm";
      tip.textContent = "It's warm on campus. Bring your water bottle.";
    }
  } catch (error) {
    document.body.className = "";
    temperature.textContent = "— °C";
    time.textContent = "";
    tip.textContent = "Weather is unavailable. Check your connection and try again.";
  } finally {
    button.disabled = false;
  }
}

button.addEventListener("click", updateWeather);
updateWeather();