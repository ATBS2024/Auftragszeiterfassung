// index.js
document.addEventListener('DOMContentLoaded', function() {
    const startButton = document.getElementById('start-button');
    const stopButton = document.getElementById('stop-button');
    const timerDisplay = document.getElementById('current-time');
    const feedback = document.getElementById('feedback');
    const formElements = document.querySelectorAll('#time-form input, #time-form select');
    let timer;
    let startTime;

    startButton.addEventListener('click', function() {
        if (!validateForm()) return;

        startTime = new Date();
        timer = setInterval(updateTimer, 1000);
        startButton.disabled = true;
        stopButton.disabled = false;
        feedback.classList.remove('hidden'); // Show feedback

        // Disable form inputs
        formElements.forEach(element => element.disabled = true);
    });

    stopButton.addEventListener('click', function() {
        clearInterval(timer);
        const endTime = new Date();
        const duration = Math.floor((endTime - startTime) / 1000); // in seconds
        const logs = JSON.parse(localStorage.getItem('logs')) || [];
        const formData = new FormData(document.getElementById('time-form'));
        const logEntry = {};
        formData.forEach((value, key) => logEntry[key] = value);
        logEntry.start = startTime.toISOString();
        logEntry.ende = endTime.toISOString();
        logEntry.dauer = duration;

        logs.push(logEntry);
        localStorage.setItem('logs', JSON.stringify(logs));

        startButton.disabled = false;
        stopButton.disabled = true;
        timerDisplay.textContent = '00:00:00';

        // Hide feedback and re-enable form inputs
        feedback.classList.add('hidden');
        formElements.forEach(element => element.disabled = false);
    });

    function updateTimer() {
        const now = new Date();
        const elapsed = new Date(now - startTime);
        const hours = String(elapsed.getUTCHours()).padStart(2, '0');
        const minutes = String(elapsed.getUTCMinutes()).padStart(2, '0');
        const seconds = String(elapsed.getUTCSeconds()).padStart(2, '0');
        timerDisplay.textContent = `${hours}:${minutes}:${seconds}`;
    }

    function validateForm() {
        const fields = ['auftrag', 'kunde', 'artikel', 'arbeitsgang', 'mitarbeiter'];
        let valid = true;
        fields.forEach(field => {
            const element = document.getElementById(field);
            const errorElement = document.getElementById(`error-${field}`);
            if (!element.value.trim() || (element.tagName === 'SELECT' && !element.value)) {
                errorElement.textContent = `Bitte füllen Sie das Feld ${element.previousElementSibling.textContent} aus.`;
                valid = false;
            } else {
                errorElement.textContent = '';
            }
        });
        return valid;
    }

    // Clear error messages when fields are filled
    formElements.forEach(element => {
        element.addEventListener('input', function() {
            const errorElement = document.getElementById(`error-${this.id}`);
            if (this.value.trim() || (this.tagName === 'SELECT' && this.value)) {
                errorElement.textContent = '';
            }
        });
    });
});
