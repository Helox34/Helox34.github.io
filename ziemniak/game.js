// Game State
const gameState = {
    players: [],
    hostIndex: -1,
    selectedCategories: [],
    timerDuration: 210, // seconds
    currentPlayerIndex: 0,
    timeRemaining: 0,
    isPaused: false,
    timerInterval: null,
    currentQuestion: null,
    isLoadingQuestion: false
};

// Questions will be loaded from pytania/*.js files
// Each file should export questions in this format:
// const categoryQuestions = [ { category: "...", question: "...", answer: "..." }, ... ];

// Combine all loaded questions
let mockQuestions = [];

// Function to initialize questions from loaded files
function initializeQuestions() {
    mockQuestions = [];

    // Try to load from each category file
    if (typeof wosQuestions !== 'undefined') mockQuestions.push(...wosQuestions);
    if (typeof geografiaQuestions !== 'undefined') mockQuestions.push(...geografiaQuestions);
    if (typeof informatykaQuestions !== 'undefined') mockQuestions.push(...informatykaQuestions);
    if (typeof chemiaQuestions !== 'undefined') mockQuestions.push(...chemiaQuestions);
    if (typeof historiaQuestions !== 'undefined') mockQuestions.push(...historiaQuestions);
    if (typeof sportQuestions !== 'undefined') mockQuestions.push(...sportQuestions);
    if (typeof filmQuestions !== 'undefined') mockQuestions.push(...filmQuestions);
    if (typeof literaturaQuestions !== 'undefined') mockQuestions.push(...literaturaQuestions);
    if (typeof kuchniaQuestions !== 'undefined') mockQuestions.push(...kuchniaQuestions);
    if (typeof mechanikaQuestions !== 'undefined') mockQuestions.push(...mechanikaQuestions);
    if (typeof motoryzacjaQuestions !== 'undefined') mockQuestions.push(...motoryzacjaQuestions);
    if (typeof wiedzaOgolnaQuestions !== 'undefined') mockQuestions.push(...wiedzaOgolnaQuestions);
    if (typeof elektrykaQuestions !== 'undefined') mockQuestions.push(...elektrykaQuestions);
    if (typeof politykaQuestions !== 'undefined') mockQuestions.push(...politykaQuestions);
    if (typeof ekonomiaQuestions !== 'undefined') mockQuestions.push(...ekonomiaQuestions);
    if (typeof biologiaQuestions !== 'undefined') mockQuestions.push(...biologiaQuestions);
    if (typeof muzykaQuestions !== 'undefined') mockQuestions.push(...muzykaQuestions);
    if (typeof sztukaQuestions !== 'undefined') mockQuestions.push(...sztukaQuestions);

    console.log(`=== RAZEM ZAŁADOWANO: ${mockQuestions.length} pytań ===`);

    if (mockQuestions.length === 0) {
        console.error('⚠️ BŁĄD: Nie załadowano żadnych pytań!');
        console.error('Sprawdź czy pliki w folderze pytania/ są poprawnie sformatowane.');
    }
}

// DOM Elements
const screens = {
    lobby: document.getElementById('screenLobby'),
    config: document.getElementById('screenConfig'),
    loading: document.getElementById('screenLoading'),
    game: document.getElementById('screenGame'),
    gameover: document.getElementById('screenGameOver')
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializeQuestions(); // Load questions from files
    initializeLobby();
    initializeConfig();
    initializeGame();
    initializeGameOver();
});

// ========== SCREEN 1: LOBBY ==========
function initializeLobby() {
    const playerInput = document.getElementById('playerNameInput');
    const addBtn = document.getElementById('addPlayerBtn');
    const nextBtn = document.getElementById('nextToCategoriesBtn');

    addBtn.addEventListener('click', () => addPlayer());
    playerInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addPlayer();
    });
    nextBtn.addEventListener('click', () => goToConfig());
}

function addPlayer() {
    const input = document.getElementById('playerNameInput');
    const name = input.value.trim();

    if (!name) return;

    gameState.players.push({ name, isHost: false });
    input.value = '';
    renderPlayerList();
    updateLobbyValidation();
}

function renderPlayerList() {
    const list = document.getElementById('playerList');
    list.innerHTML = '';

    gameState.players.forEach((player, index) => {
        const item = document.createElement('div');
        item.className = `player-item ${player.isHost ? 'host' : ''}`;

        item.innerHTML = `
            <span class="player-mic" data-index="${index}">🎤</span>
            <span class="player-name">${player.name}</span>
            ${player.isHost ? '<span class="player-host-badge">PROWADZĄCY</span>' : ''}
            <button class="player-remove" data-index="${index}">×</button>
        `;

        list.appendChild(item);
    });

    // Add event listeners
    document.querySelectorAll('.player-mic').forEach(mic => {
        mic.addEventListener('click', (e) => {
            const index = parseInt(e.target.dataset.index);
            setHost(index);
        });
    });

    document.querySelectorAll('.player-remove').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(e.target.dataset.index);
            removePlayer(index);
        });
    });
}

function setHost(index) {
    gameState.players.forEach(p => p.isHost = false);
    gameState.players[index].isHost = true;
    gameState.hostIndex = index;
    renderPlayerList();
    updateLobbyValidation();
}

function removePlayer(index) {
    gameState.players.splice(index, 1);
    if (gameState.hostIndex === index) {
        gameState.hostIndex = -1;
    } else if (gameState.hostIndex > index) {
        gameState.hostIndex--;
    }
    renderPlayerList();
    updateLobbyValidation();
}

function updateLobbyValidation() {
    const validation = document.getElementById('lobbyValidation');
    const nextBtn = document.getElementById('nextToCategoriesBtn');

    const hasHost = gameState.players.some(p => p.isHost);
    const hasEnoughPlayers = gameState.players.length >= 2;

    if (!hasEnoughPlayers) {
        validation.textContent = 'Potrzeba min. 2 graczy';
        validation.style.color = '#D32F2F';
        nextBtn.disabled = true;
        nextBtn.style.opacity = '0.5';
    } else if (!hasHost) {
        validation.textContent = 'Dodaj uczestników, aby zacząć!';
        validation.style.color = 'var(--brown-dark)';
        nextBtn.disabled = true;
        nextBtn.style.opacity = '0.5';
    } else {
        validation.textContent = 'Gotowe! Możesz przejść dalej.';
        validation.style.color = 'var(--green-correct)';
        nextBtn.disabled = false;
        nextBtn.style.opacity = '1';
    }
}

function goToConfig() {
    const hasHost = gameState.players.some(p => p.isHost);
    const hasEnoughPlayers = gameState.players.length >= 2;

    if (hasEnoughPlayers && hasHost) {
        switchScreen('config');
    }
}

// ========== SCREEN 2: CONFIG ==========
function initializeConfig() {
    const slider = document.getElementById('timerSlider');
    const display = document.getElementById('timerDisplay');
    const categoryBtns = document.querySelectorAll('.category-btn');
    const clearBtn = document.getElementById('clearCategoriesBtn');
    const startBtn = document.getElementById('startGameBtn');

    slider.addEventListener('input', (e) => {
        const seconds = parseInt(e.target.value);
        gameState.timerDuration = seconds;
        display.textContent = formatTime(seconds);
    });

    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.dataset.category;
            toggleCategory(category, btn);
        });
    });

    clearBtn.addEventListener('click', () => {
        gameState.selectedCategories = [];
        categoryBtns.forEach(btn => btn.classList.remove('selected'));
    });

    startBtn.addEventListener('click', () => startGame());
}

function toggleCategory(category, btn) {
    const index = gameState.selectedCategories.indexOf(category);

    if (index > -1) {
        gameState.selectedCategories.splice(index, 1);
        btn.classList.remove('selected');
    } else {
        gameState.selectedCategories.push(category);
        btn.classList.add('selected');
    }
}

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins} min ${secs} s`;
}

function formatTimerDisplay(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function startGame() {
    if (gameState.selectedCategories.length === 0) {
        alert('Wybierz przynajmniej jedną kategorię!');
        return;
    }

    switchScreen('loading');

    // Simulate loading
    setTimeout(() => {
        initializeGameplay();
        switchScreen('game');
    }, 2000);
}

// ========== SCREEN 3: LOADING ==========
// (Animation handled by CSS)

// ========== SCREEN 4: GAMEPLAY ==========
function initializeGame() {
    const skipBtn = document.getElementById('skipBtn');
    const correctBtn = document.getElementById('correctBtn');
    const pauseBtn = document.getElementById('pauseBtn');

    skipBtn.addEventListener('click', () => skipQuestion());
    correctBtn.addEventListener('click', () => correctAnswer());
    pauseBtn.addEventListener('click', () => togglePause());
}

function initializeGameplay() {
    gameState.timeRemaining = gameState.timerDuration;
    gameState.isPaused = false;
    gameState.currentPlayerIndex = 0;

    // Skip host in player rotation
    const host = gameState.players.find(p => p.isHost);
    if (host) {
        document.getElementById('hostName').textContent = host.name.toUpperCase();
    }

    // Set first non-host player
    setNextPlayer(true);
    loadNewQuestion();
    startTimer();
}

function setNextPlayer(isFirst = false) {
    const nonHostPlayers = gameState.players.filter(p => !p.isHost);

    if (!isFirst) {
        gameState.currentPlayerIndex = (gameState.currentPlayerIndex + 1) % nonHostPlayers.length;
    }

    const currentPlayer = nonHostPlayers[gameState.currentPlayerIndex];
    document.getElementById('currentPlayer').textContent = currentPlayer.name.toLowerCase();
}

function loadNewQuestion() {
    // Pause timer during loading
    gameState.isLoadingQuestion = true;

    console.log(`Ładowanie pytania dla kategorii: ${gameState.selectedCategories.join(', ')}`);

    // Filter questions by selected categories
    const availableQuestions = mockQuestions.filter(q =>
        gameState.selectedCategories.includes(q.category)
    );

    console.log(`Znaleziono ${availableQuestions.length} pytań`);

    if (availableQuestions.length === 0) {
        console.error('⚠️ Brak pytań dla wybranych kategorii!');
        alert('Błąd: Nie znaleziono pytań. Sprawdź konsolę (F12).');
        gameState.isLoadingQuestion = false;
        return;
    }

    // Pick random question
    const randomQuestion = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
    gameState.currentQuestion = randomQuestion;

    // Update UI
    document.getElementById('currentCategory').textContent = randomQuestion.category;
    document.getElementById('questionText').textContent = randomQuestion.question;
    document.getElementById('answerText').textContent = randomQuestion.answer;

    // Resume timer after loading
    setTimeout(() => {
        gameState.isLoadingQuestion = false;
    }, 300);
}

function startTimer() {
    if (gameState.timerInterval) {
        clearInterval(gameState.timerInterval);
    }

    gameState.timerInterval = setInterval(() => {
        if (!gameState.isPaused && !gameState.isLoadingQuestion) {
            gameState.timeRemaining--;
            updateTimerDisplay();

            if (gameState.timeRemaining <= 0) {
                endGame();
            }
        }
    }, 1000);

    updateTimerDisplay();
}

function updateTimerDisplay() {
    const display = document.getElementById('gameTimer');
    display.textContent = formatTimerDisplay(gameState.timeRemaining);

    if (gameState.timeRemaining <= 30) {
        display.classList.add('warning');
    } else {
        display.classList.remove('warning');
    }
}

function togglePause() {
    gameState.isPaused = !gameState.isPaused;
    const pauseBtn = document.getElementById('pauseBtn');
    pauseBtn.textContent = gameState.isPaused ? '▶ Wznów' : '⏸ Pauza';
}

function skipQuestion() {
    loadNewQuestion();
}

function correctAnswer() {
    // Play success animation
    const correctBtn = document.getElementById('correctBtn');
    correctBtn.style.transform = 'scale(0.95)';
    setTimeout(() => {
        correctBtn.style.transform = 'scale(1)';
    }, 100);

    // Move to next player
    setNextPlayer();
    loadNewQuestion();
}

function endGame() {
    clearInterval(gameState.timerInterval);

    const nonHostPlayers = gameState.players.filter(p => !p.isHost);
    const loser = nonHostPlayers[gameState.currentPlayerIndex];

    document.getElementById('loserName').textContent = loser.name.toUpperCase();
    switchScreen('gameover');
}

// ========== SCREEN 5: GAME OVER ==========
function initializeGameOver() {
    const playAgainBtn = document.getElementById('playAgainBtn');
    const menuBtn = document.getElementById('backToMenuBtn');

    playAgainBtn.addEventListener('click', () => {
        switchScreen('lobby');
    });

    menuBtn.addEventListener('click', () => {
        resetGame();
        switchScreen('lobby');
    });
}

function resetGame() {
    gameState.players = [];
    gameState.hostIndex = -1;
    gameState.selectedCategories = [];
    gameState.timerDuration = 210;
    gameState.currentPlayerIndex = 0;
    gameState.timeRemaining = 0;
    gameState.isPaused = false;

    if (gameState.timerInterval) {
        clearInterval(gameState.timerInterval);
    }

    document.getElementById('playerNameInput').value = '';
    renderPlayerList();
    updateLobbyValidation();

    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
}

// ========== SCREEN MANAGEMENT ==========
function switchScreen(screenName) {
    Object.values(screens).forEach(screen => {
        screen.classList.remove('active');
    });

    screens[screenName].classList.add('active');
}
