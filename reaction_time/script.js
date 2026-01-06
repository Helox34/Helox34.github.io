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