// log.js
document.addEventListener('DOMContentLoaded', function() {
    const logTableBody = document.querySelector('#log-table tbody');
    const backButton = document.getElementById('back-to-home');

    // Funktion zum Laden der Log-Einträge
    function loadLogs() {
        const logs = JSON.parse(localStorage.getItem('logs')) || [];
        logTableBody.innerHTML = ''; // Tabelle leeren

        logs.forEach((log, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${log.auftrag}</td>
                <td>${log.kunde}</td>
                <td>${log.artikel}</td>
                <td>${log.arbeitsgang}</td>
                <td>${log.mitarbeiter}</td>
                <td>${new Date(log.start).toLocaleString()}</td>
                <td>${new Date(log.ende).toLocaleString()}</td>
                <td>${formatDuration(log.dauer)}</td>
                <td><button class="delete-btn" data-index="${index}">Löschen</button></td>
            `;
            logTableBody.appendChild(row);
        });
    }

    // Funktion zum Formatieren der Dauer
    function formatDuration(seconds) {
        const hours = String(Math.floor(seconds / 3600)).padStart(2, '0');
        const minutes = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
        const secs = String(seconds % 60).padStart(2, '0');
        return `${hours}:${minutes}:${secs}`;
    }

    // Event-Listener für das Löschen von Einträgen
    logTableBody.addEventListener('click', function(event) {
        if (event.target.classList.contains('delete-btn')) {
            const index = event.target.getAttribute('data-index');
            let logs = JSON.parse(localStorage.getItem('logs')) || [];
            logs.splice(index, 1); // Löschen des Eintrags
            localStorage.setItem('logs', JSON.stringify(logs));
            loadLogs(); // Tabelle neu laden
        }
    });

    // Event-Listener für den Zurück-Button
    backButton.addEventListener('click', function() {
        window.location.href = 'index.html'; // Zurück zur Hauptseite
    });

    loadLogs(); // Logs beim Laden der Seite anzeigen
});
