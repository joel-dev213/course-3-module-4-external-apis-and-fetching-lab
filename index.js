// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="
const BASE_URL = "https://api.weather.gov/alerts/active?area="

// Your code here!
const input = document.getElementById("state-input");
const button = document.getElementById("fetch-alerts");
const alertsContainer = document.getElementById("alerts-display");
const errorDiv = document.getElementById("error-message");

// Fetch function
async function fetchWeatherAlerts(state) {
    try {
        // Validate input
        if (!state || state.length !== 2) {
            throw new Error("Please enter a valid 2-letter state code.");
        }

        const response = await fetch(BASE_URL + state.toUpperCase());

        if (!response.ok) {
            throw new Error("Failed to fetch weather alerts.");
        }

        const data = await response.json();
        console.log(data);

        // Display alerts
        displayAlerts(data);

        // Clear input
        input.value = "";

        // Hide error
        errorDiv.classList.add("hidden");
        errorDiv.textContent = "";

    } catch (error) {
        console.log(error.message);

        // Show error
        errorDiv.classList.remove("hidden");
        errorDiv.textContent = error.message;

        // Clear alerts
        alertsContainer.innerHTML = "";
    }
}

// Display function
function displayAlerts(data) {
    // Clear previous alerts
    alertsContainer.innerHTML = "";

    const alerts = data.features;

    // EXACT text expected by test
    const summary = document.createElement("h3");
    summary.textContent = `Weather Alerts: ${alerts.length}`;
    alertsContainer.appendChild(summary);

    // List of alerts
    const list = document.createElement("ul");

    alerts.forEach(alert => {
        const li = document.createElement("li");
        li.textContent = alert.properties.headline;
        list.appendChild(li);
    });

    alertsContainer.appendChild(list);
}

// Event listener
button.addEventListener("click", () => {
    const state = input.value.trim();
    fetchWeatherAlerts(state);
});