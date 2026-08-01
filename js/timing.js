// Karachi Club GYM — Timing Page Logic
// Calculates current status (Men / Ladies Only / Closed) and positions
// the "Now" marker along the day-bar based on the real current time.

(function () {
    const dayBar = document.getElementById('dayBar');
    const nowMarker = document.getElementById('nowMarker');
    const statusText = document.getElementById('liveStatusText');
    const liveStatus = document.getElementById('liveStatus');

    if (!dayBar || !nowMarker || !statusText) return;

    function getStatus(hours, minutes) {
        const m = hours * 60 + minutes;

        // Men Evening wraps past midnight: 17:00–24:00 or 00:00–01:00
        if (m >= 1020 || m < 60) {
            return { label: 'Open Now — Men\'s Hours', color: '#01b1f3' };
        }
        // Closed overnight: 01:00–06:30
        if (m >= 60 && m < 390) {
            return { label: 'Closed Now', color: '#7a7a7a' };
        }
        // Men Morning: 06:30–10:30
        if (m >= 390 && m < 630) {
            return { label: 'Open Now — Men\'s Hours', color: '#01b1f3' };
        }
        // Closed midday: 10:30–11:00
        if (m >= 630 && m < 660) {
            return { label: 'Closed Now', color: '#7a7a7a' };
        }
        // Ladies Only: 11:00–17:00
        if (m >= 660 && m < 1020) {
            return { label: 'Open Now — Ladies Only', color: '#ff5da2' };
        }
        return { label: 'Closed Now', color: '#7a7a7a' };
    }

    function positionMarker(hours, minutes) {
        const totalMinutes = hours * 60 + minutes;
        // Bar starts at 1:00 AM (60 min mark), spans a full 1440-minute cycle
        let shifted = totalMinutes - 60;
        if (shifted < 0) shifted += 1440;
        const percent = (shifted / 1440) * 100;
        nowMarker.style.left = percent + '%';
    }

    function update() {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();

        const status = getStatus(hours, minutes);
        statusText.textContent = status.label;
        statusText.style.color = status.color;

        positionMarker(hours, minutes);
    }

    update();
    setInterval(update, 30000); // refresh every 30 seconds
})();