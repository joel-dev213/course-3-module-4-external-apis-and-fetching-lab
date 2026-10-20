// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

// Your code here!

const stateInput = document.getElementById("stateInput");
const fetchButton = document.getElementById("fetch-alerts");
const alertsDisplay = document.getElementById("alerts-display");
const errorMessage = document.getElementById("error-message");

// Step1: Get to fetch alerts from the states

 function fetchWeatherAlerts(state) {
    return fetch(`https://api.weather.gov/alerts/active?area=${state}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            displayAlerts(data);
            hideError();
        })
        .catch(errorObject => {
            console.log(errorObject.message);
            displayError("Failed to fetch weather alerts.");
        });
}
fetchWeatherAlerts("MN");

// Step 2 to display the Alerts on the page.

function displayAlerts(data) {
    const alertsDisplay = document.getElementById("alerts-display");
    alertsDisplay.innerHTML = ``;

    const summary = document.createElement(`p`);
    summary.textContent = `${data.title}: ${data.features.length}`;
    alertsDisplay.appendChild(summary);

    const list = document.createElement(`ul`);
    data.features.forEach(alert => {
        const item = document.createElement(`li`);
        item.textContent = alert.properties.headline;
        list.appendChild(item);
    });
    alertsDisplay.appendChild(list);
}

// step 3 get to clear and reset the UI

function handleFetch() {
    const state = stateInput.value.trim().toUpperCase();
    stateInput.value = ``;
    alertsDisplay.innerHTML = ``;

    fetchWeatherAlerts(state);

}

// Step 4: Handle errors and display error messages

function displayError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove(`hidden`);;
}
function hideError() {
    errorMessage.textContent = ``;
    errorMessage.classList.add(`hidden`);
}

fetchButton.addEventListener(`click`, handleFetch);
stateInput.addEventListener(`keydown`, event => {
    if (event.key === `Enter`) handleFetch();
});
