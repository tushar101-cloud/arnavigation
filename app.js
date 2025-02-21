// DOM Elements
const startBtn = document.getElementById('start-navigation');
const stopBtn = document.getElementById('stop-navigation');
const saveLocationBtn = document.getElementById('save-location');
const statusMessages = document.getElementById('status-messages');
const positionDisplay = document.getElementById('current-position');
const locationsList = document.getElementById('locations-list');

// State variables
let isNavigating = false;
let currentPosition = { x: 0, y: 0, z: 0 };

// Event Listeners
startBtn.addEventListener('click', startNavigation);
stopBtn.addEventListener('click', stopNavigation);
saveLocationBtn.addEventListener('click', saveLocation);

// Navigation Functions
function startNavigation() {
    isNavigating = true;
    updateStatus('Navigation started');
    startBtn.disabled = true;
    stopBtn.disabled = false;
    simulatePositionUpdate();
}

function stopNavigation() {
    isNavigating = false;
    updateStatus('Navigation stopped');
    startBtn.disabled = false;
    stopBtn.disabled = true;
}

// Position Simulation
function simulatePositionUpdate() {
    if (isNavigating) {
        currentPosition.x += (Math.random() - 0.5) * 0.1;
        currentPosition.y += (Math.random() - 0.5) * 0.1;
        currentPosition.z += (Math.random() - 0.5) * 0.1;
        
        updatePositionDisplay();
        setTimeout(simulatePositionUpdate, 500);
    }
}

function updatePositionDisplay() {
    positionDisplay.textContent = 
        `X: ${currentPosition.x.toFixed(2)}, 
         Y: ${currentPosition.y.toFixed(2)}, 
         Z: ${currentPosition.z.toFixed(2)}`;
}

// Location Management
async function saveLocation() {
    const location = {
        name: document.getElementById('location-name').value,
        coordinates: {
            x: parseFloat(document.getElementById('location-x').value),
            y: parseFloat(document.getElementById('location-y').value),
            z: parseFloat(document.getElementById('location-z').value)
        },
        description: document.getElementById('location-description').value
    };

    try {
        const response = await fetch('/api/locations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(location)
        });

        if (response.ok) {
            updateStatus('Location saved successfully');
            loadLocations();
        } else {
            throw new Error('Failed to save location');
        }
    } catch (error) {
        updateStatus(`Error: ${error.message}`, true);
    }
}

async function loadLocations() {
    try {
        const response = await fetch('/api/locations');
        const locations = await response.json();
        displayLocations(locations);
    } catch (error) {
        updateStatus(`Error loading locations: ${error.message}`, true);
    }
}

function displayLocations(locations) {
    locationsList.innerHTML = locations.map(location => `
        <div class="location-item">
            <h4>${location.name}</h4>
            <p>Coordinates: X: ${location.coordinates.x}, Y: ${location.coordinates.y}, Z: ${location.coordinates.z}</p>
            <p>${location.description}</p>
        </div>
    `).join('');
}

// Status Updates
function updateStatus(message, isError = false) {
    const statusMessage = document.createElement('div');
    statusMessage.textContent = message;
    statusMessage.className = isError ? 'status-error' : 'status-message';
    statusMessages.appendChild(statusMessage);
    
    // Auto-remove message after 5 seconds
    setTimeout(() => {
        statusMessage.remove();
    }, 5000);
}

// Initial Load
loadLocations();
