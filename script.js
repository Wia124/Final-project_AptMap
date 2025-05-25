const daysTogetherElement = document.getElementById('daysTogether');
const startDateInput = document.getElementById('startDate');
const messageElement = document.getElementById('message');

// Function to display messages
function displayMessage(msg, type = 'info') {
    messageElement.textContent = msg;
    messageElement.className = `message-${type}`;
}

// Function to calculate days
function calculateDays(dateString) {
    if (!dateString) {
        daysTogetherElement.textContent = '0';
        return;
    }
    const start = new Date(dateString);
    const today = new Date();
    // Reset time components to avoid issues with timezones and daylight saving
    start.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    const diffTime = Math.abs(today.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    daysTogetherElement.textContent = diffDays;
}

// Load date from Local Storage
function loadDateFromLocalStorage() {
    const savedDate = localStorage.getItem('loveDate');
    if (savedDate) {
        startDateInput.value = savedDate;
        calculateDays(savedDate);
        displayMessage('Date loaded successfully!');
    } else {
        displayMessage('Please select your special date.');
    }
}

// Save date to Local Storage
function saveDateToLocalStorage(newDate) {
    try {
        localStorage.setItem('loveDate', newDate);
        displayMessage('Date saved successfully!');
    } catch (error) {
        console.error("Error saving date to local storage:", error);
        displayMessage("Failed to save date. Please try again.", 'error');
    }
}

// Event listener for date input change
startDateInput.addEventListener('change', (e) => {
    const newDate = e.target.value;
    calculateDays(newDate);
    saveDateToLocalStorage(newDate);
});

// Initialize the app when the window loads
window.onload = loadDateFromLocalStorage;
