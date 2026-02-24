const ui = {
    box: document.getElementById('click-area'),
    icon: document.getElementById('status-icon'),
    mainText: document.getElementById('main-text'),
    subText: document.getElementById('sub-text'),
    lastScore: document.getElementById('last-score'),
    bestScore: document.getElementById('best-score')
};

// Stan gry
let gameState = 'idle'; // idle | waiting | go | result
let timer = null;
let startTime = 0;
let endTime = 0;

// Inicjalizacja
function init() {
    const best = localStorage.getItem('reaction_best') || '-';
    ui.bestScore.textContent = best === '-' ? '-' : best + ' ms';

    // Rejestruj gracza w Firebase
    const username = typeof UserManager !== 'undefined' ? UserManager.getCurrentUser() : null;
    if (typeof FirebaseLeaderboard !== 'undefined' && window.db && username) {
        FirebaseLeaderboard.registerPlayer('reaction', username);
    }

    // Renderuj tabelę rankingową z Firebase (real-time)
    renderReactionLeaderboard();
}

function renderReactionLeaderboard() {
    const container = document.getElementById('leaderboard-container');
    if (!container) return;

    const title = '\u{1F3C6} TOP 10 NAJLEPSZYCH CZAS\u00D3W';

    if (typeof FirebaseLeaderboard !== 'undefined' && window.db) {
        // Real-time listener z Firebase
        FirebaseLeaderboard.listenToScores(
            'reaction', 'best',
            (scores) => renderLeaderboardHTML(scores, container, title, true),
            10, true // lowerIsBetter = true
        );
    } else if (typeof LeaderboardComponent !== 'undefined') {
        // Fallback do localStorage
        LeaderboardComponent.render('reaction_best', 'leaderboard-container', {
            title: 'TOP 10 NAJLEPSZYCH CZAS\u00D3W',
            limit: 10,
            lowerIsBetter: true
        });
    }
}

function renderLeaderboardHTML(scores, container, title, showMs = false) {
    const currentUser = typeof UserManager !== 'undefined' ? UserManager.getCurrentUser() : null;

    if (!scores || scores.length === 0) {
        container.innerHTML = `
            <div class="leaderboard">
                <div class="leaderboard-glow"></div>
                <h3 class="leaderboard-title">${title}</h3>
                <p class="leaderboard-empty">Brak wynik\u00F3w \u2014 b\u0105d\u017A pierwszy! \u{1F680}</p>
            </div>`;
        return;
    }

    let rowsHTML = '';
    scores.forEach((entry, index) => {
        const pos = index + 1;
        const isCurrentUser = currentUser && entry.username === currentUser;
        const posIcon = pos === 1 ? '\u{1F947}' : pos === 2 ? '\u{1F948}' : pos === 3 ? '\u{1F949}' : `#${pos}`;
        const scoreText = showMs ? `${entry.score} ms` : entry.score;
        const dateStr = entry.date ? formatLeaderboardDate(entry.date) : '';

        rowsHTML += `
            <div class="leaderboard-row ${isCurrentUser ? 'current-user' : ''}">
                <span class="lbd-pos">${posIcon}</span>
                <span class="lbd-name">${escapeHtml(entry.username)}</span>
                <span class="lbd-score">${scoreText}</span>
                <span class="lbd-date">${dateStr}</span>
            </div>`;
    });

    container.innerHTML = `
        <div class="leaderboard">
            <div class="leaderboard-glow"></div>
            <h3 class="leaderboard-title">${title}</h3>
            <div class="leaderboard-table">
                <div class="leaderboard-header">
                    <span>#</span>
                    <span>Gracz</span>
                    <span>Czas</span>
                    <span>Data</span>
                </div>
                ${rowsHTML}
            </div>
        </div>`;
}

function formatLeaderboardDate(isoDate) {
    const date = new Date(isoDate);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    if (diffMins < 1) return 'teraz';
    if (diffMins < 60) return `${diffMins} min temu`;
    if (diffHours < 24) return `${diffHours}h temu`;
    if (diffDays < 7) return `${diffDays} dni temu`;
    return date.toLocaleDateString('pl-PL', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Główna funkcja obsługi kliknięcia
ui.box.addEventListener('mousedown', handleClick);
// Obsługa dotyku na telefonach (szybsza reakcja niż click)
ui.box.addEventListener('touchstart', (e) => {
    e.preventDefault(); // Zapobiega podwójnemu wywołaniu mousedown
    handleClick();
});

function handleClick() {
    switch (gameState) {
        case 'idle':
        case 'result':
            startTest();
            break;
        case 'waiting':
            tooEarly();
            break;
        case 'go':
            endTest();
            break;
    }
}

function startTest() {
    gameState = 'waiting';

    // Zmiana wyglądu na czerwony
    setVisuals('state-wait', 'fa-hourglass', 'Czekaj na zielony...', 'Nie klikaj jeszcze!');

    // Losowy czas oczekiwania: od 2000ms (2s) do 5000ms (5s)
    const randomDelay = Math.floor(Math.random() * 3000) + 2000;

    timer = setTimeout(() => {
        turnGreen();
    }, randomDelay);
}

function turnGreen() {
    gameState = 'go';
    startTime = Date.now();
    setVisuals('state-go', 'fa-bolt', 'KLIKAJ!', 'Teraz!');
}

function endTest() {
    endTime = Date.now();
    const reactionTime = endTime - startTime;
    gameState = 'result';

    // Aktualizacja wyniku
    ui.lastScore.textContent = reactionTime + ' ms';
    checkBestScore(reactionTime);

    setVisuals('state-idle', 'fa-clock', reactionTime + ' ms', 'Kliknij, aby spróbować ponownie');
}

function tooEarly() {
    gameState = 'result';
    clearTimeout(timer); // Anuluj odliczanie do zielonego
    setVisuals('state-idle', 'fa-circle-exclamation', 'Za szybko!', 'Kliknąłeś zanim kolor się zmienił. Spróbuj jeszcze raz.');
}

function checkBestScore(time) {
    let currentBest = localStorage.getItem('reaction_best');

    if (!currentBest || time < parseInt(currentBest)) {
        localStorage.setItem('reaction_best', time);
        ui.bestScore.textContent = time + ' ms';

        // Zapisz wynik do systemu użytkowników (mniejszy czas = lepszy wynik!)
        if (typeof UserManager !== 'undefined') {
            UserManager.saveUserScore('reaction_best', time, true); // TRUE = lower is better
        }

        // Zapisz do Firebase
        const username = typeof UserManager !== 'undefined' ? UserManager.getCurrentUser() : null;
        if (typeof FirebaseLeaderboard !== 'undefined' && window.db && username) {
            FirebaseLeaderboard.saveScore('reaction', 'best', username, time, true);
        }
    }
}

// Pomocnicza funkcja do zmiany UI
function setVisuals(className, iconClass, title, subtitle) {
    // Reset klas
    ui.box.classList.remove('state-idle', 'state-wait', 'state-go');
    ui.box.classList.add(className);

    // Zmiana ikony
    ui.icon.className = `fa-solid ${iconClass} icon-large`;

    // Zmiana tekstu
    ui.mainText.textContent = title;
    ui.subText.textContent = subtitle;
}

// Start
init();