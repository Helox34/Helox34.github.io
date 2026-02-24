/* =============================================
   IMPOSTOR — Gra Towarzyska
   ============================================= */

/* --- BAZA HASEŁ (hasło → podpowiedź) --- */
const wordPairs = [
    { word: "Rower", hint: "Transport" },
    { word: "Pizza", hint: "Jedzenie" },
    { word: "Gitara", hint: "Instrument" },
    { word: "Piłka nożna", hint: "Sport" },
    { word: "Słońce", hint: "Niebo" },
    { word: "Samochód", hint: "Pojazd" },
    { word: "Jabłko", hint: "Owoc" },
    { word: "Pies", hint: "Zwierzę" },
    { word: "Telewizor", hint: "Elektronika" },
    { word: "Szkoła", hint: "Edukacja" },
    { word: "Plaża", hint: "Wakacje" },
    { word: "Deszcz", hint: "Pogoda" },
    { word: "Kawa", hint: "Napój" },
    { word: "Góry", hint: "Krajobraz" },
    { word: "Nożyczki", hint: "Narzędzie" },
    { word: "Koszulka", hint: "Ubranie" },
    { word: "Zegar", hint: "Czas" },
    { word: "Tort", hint: "Deser" },
    { word: "Samolot", hint: "Latanie" },
    { word: "Książka", hint: "Czytanie" },
    { word: "Lody", hint: "Słodycze" },
    { word: "Księżyc", hint: "Noc" },
    { word: "Komputer", hint: "Technologia" },
    { word: "Łóżko", hint: "Meble" },
    { word: "Motyl", hint: "Owad" },
    { word: "Parasol", hint: "Ochrona" },
    { word: "Sok", hint: "Napój" },
    { word: "Ryba", hint: "Morze" },
    { word: "Korona", hint: "Król" },
    { word: "Buty", hint: "Obuwie" },
    { word: "Serce", hint: "Organ" },
    { word: "Piramida", hint: "Egipt" },
    { word: "Młotek", hint: "Narzędzie" },
    { word: "Chmura", hint: "Niebo" },
    { word: "Maska", hint: "Karnawał" },
    { word: "Kaktus", hint: "Roślina" },
    { word: "Diament", hint: "Klejnot" },
    { word: "Wulkan", hint: "Geologia" },
    { word: "Skrzypce", hint: "Muzyka" },
    { word: "Pociąg", hint: "Transport" },
    { word: "Balon", hint: "Impreza" },
    { word: "Zebra", hint: "Afryka" },
    { word: "Mikrofon", hint: "Dźwięk" },
    { word: "Herbata", hint: "Napój" },
    { word: "Rakieta", hint: "Kosmos" },
    { word: "Kamera", hint: "Film" },
    { word: "Pingwin", hint: "Ptak" },
    { word: "Szachy", hint: "Gra" },
    { word: "Fontanna", hint: "Woda" },
    { word: "Latarka", hint: "Światło" },
    { word: "Instagram", hint: "Aplikacja" },
    { word: "Minecraft", hint: "Gra" },
    { word: "YouTube", hint: "Platforma" },
    { word: "TikTok", hint: "Social Media" },
    { word: "McDonald's", hint: "Fast Food" },
    { word: "iPhone", hint: "Telefon" },
    { word: "Nike", hint: "Marka" },
    { word: "Netflix", hint: "Streaming" },
    { word: "Spotify", hint: "Muzyka" },
    { word: "Coca-Cola", hint: "Napój" },
];

/* --- UI ELEMENTY --- */
const ui = {
    screens: {
        setup: document.getElementById('screen-setup'),
        reveal: document.getElementById('screen-reveal'),
        game: document.getElementById('screen-game'),
    },
    setup: {
        input: document.getElementById('player-input'),
        btnAdd: document.getElementById('btn-add'),
        list: document.getElementById('player-list'),
        count: document.getElementById('player-count'),
        btnStart: document.getElementById('btn-start'),
        impostorCount: document.getElementById('impostor-count'),
    },
    reveal: {
        waiting: document.getElementById('reveal-waiting'),
        role: document.getElementById('reveal-role'),
        name: document.getElementById('reveal-name'),
        btnShow: document.getElementById('btn-show-role'),
        btnNext: document.getElementById('btn-next-player'),
        roleIcon: document.getElementById('role-icon'),
        roleTitle: document.getElementById('role-title'),
        roleWord: document.getElementById('role-word'),
        roleDesc: document.getElementById('role-description'),
        progress: document.getElementById('reveal-progress'),
        counter: document.getElementById('reveal-counter'),
    },
    game: {
        players: document.getElementById('game-players'),
        btnRevealRoles: document.getElementById('btn-reveal-roles'),
        rolesReveal: document.getElementById('roles-reveal'),
        resultWord: document.getElementById('result-word'),
        resultHint: document.getElementById('result-hint'),
        resultRoles: document.getElementById('result-roles'),
        btnNewGame: document.getElementById('btn-new-game'),
    }
};

/* --- STAN GRY --- */
const game = {
    players: [],
    roles: [],          // 'good' | 'impostor'
    currentWord: null,
    currentHint: null,
    revealIndex: 0,
    impostorCount: 1,
    isRandom: false,

    /* === ZARZĄDZANIE GRACZAMI === */
    addPlayer() {
        const name = ui.setup.input.value.trim();
        if (!name) return;
        if (this.players.length >= 12) return;
        if (this.players.includes(name)) {
            ui.setup.input.value = '';
            return;
        }

        this.players.push(name);
        ui.setup.input.value = '';
        ui.setup.input.focus();
        this.renderPlayerList();
        this.updateStartBtn();
    },

    removePlayer(index) {
        this.players.splice(index, 1);
        this.renderPlayerList();
        this.updateStartBtn();
    },

    renderPlayerList() {
        ui.setup.list.innerHTML = this.players.map((name, i) => `
            <li class="player-item">
                <span class="player-item-name">
                    <span class="player-num">${i + 1}</span>
                    ${this.escapeHtml(name)}
                </span>
                <button class="btn-remove" onclick="game.removePlayer(${i})">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </li>
        `).join('');

        const count = this.players.length;
        if (count < 3) {
            ui.setup.count.textContent = `Dodaj minimum 3 graczy (${count}/12)`;
        } else {
            ui.setup.count.textContent = `${count} graczy gotowych (max 12)`;
        }
    },

    updateStartBtn() {
        const enough = this.players.length >= 3;
        ui.setup.btnStart.disabled = !enough;
        ui.setup.btnStart.classList.toggle('disabled', !enough);
    },

    toggleRandom() {
        this.isRandom = !this.isRandom;
        document.getElementById('random-toggle').classList.toggle('active', this.isRandom);
        document.getElementById('stepper').classList.toggle('dimmed', this.isRandom);
        this.updateHint();
    },

    changeImpostors(delta) {
        if (this.isRandom) return;
        const maxImpostors = Math.max(1, (this.players.length || 3) - 1);
        this.impostorCount = Math.max(1, Math.min(maxImpostors, this.impostorCount + delta));
        ui.setup.impostorCount.textContent = this.impostorCount;
        this.updateHint();
    },

    updateHint() {
        const hint = document.getElementById('impostor-hint');
        if (this.isRandom) {
            hint.textContent = 'Losowa liczba — może być 0 lub nawet wszyscy!';
        } else {
            hint.textContent = `Dokładnie ${this.impostorCount} impostor${this.impostorCount > 1 ? 'ów' : ''}`;
        }
    },

    /* === ROZPOCZĘCIE GRY === */
    startGame() {
        if (this.players.length < 3) return;

        // Losuj hasło i podpowiedź
        const pair = wordPairs[Math.floor(Math.random() * wordPairs.length)];
        this.currentWord = pair.word;
        this.currentHint = pair.hint;

        // Określ liczbę impostorów
        let numImpostors;
        if (this.isRandom) {
            numImpostors = Math.floor(Math.random() * (this.players.length + 1));
        } else {
            numImpostors = Math.min(this.impostorCount, this.players.length);
        }

        // Przypisz role
        const shuffledIndices = this.shuffle([...Array(this.players.length).keys()]);
        this.roles = new Array(this.players.length).fill('good');

        for (let i = 0; i < numImpostors; i++) {
            this.roles[shuffledIndices[i]] = 'impostor';
        }

        // Przejdź do ekranu reveal
        this.revealIndex = 0;
        this.showScreen('reveal');
        this.showRevealWaiting();
    },

    /* === EKRAN REVEAL (SEKWENCYJNY) === */
    showRevealWaiting() {
        ui.reveal.waiting.classList.remove('hidden');
        ui.reveal.role.classList.add('hidden');
        ui.reveal.name.textContent = this.players[this.revealIndex];
        ui.reveal.counter.textContent = `Gracz ${this.revealIndex + 1} z ${this.players.length}`;
        ui.reveal.progress.style.width = `${(this.revealIndex / this.players.length) * 100}%`;
    },

    showRole() {
        ui.reveal.waiting.classList.add('hidden');
        ui.reveal.role.classList.remove('hidden');

        const isImpostor = this.roles[this.revealIndex] === 'impostor';

        // Ikona
        ui.reveal.roleIcon.className = 'role-icon ' + (isImpostor ? 'impostor' : 'good');
        ui.reveal.roleIcon.innerHTML = isImpostor
            ? '<i class="fa-solid fa-user-secret"></i>'
            : '<i class="fa-solid fa-shield-halved"></i>';

        // Tytuł
        ui.reveal.roleTitle.className = 'role-title ' + (isImpostor ? 'impostor' : 'good');
        ui.reveal.roleTitle.textContent = isImpostor ? 'Jesteś Impostorem!' : 'Jesteś Dobry!';

        // Hasło / Podpowiedź
        if (isImpostor) {
            ui.reveal.roleWord.innerHTML = `
                <span class="word-label">Twoja podpowiedź</span>
                <span class="word-value" style="color: var(--impostor-color)">${this.escapeHtml(this.currentHint)}</span>
            `;
            ui.reveal.roleDesc.textContent = 'Nie znasz hasła! Słuchaj uważnie i spróbuj je odgadnąć.';
        } else {
            ui.reveal.roleWord.innerHTML = `
                <span class="word-label">Hasło</span>
                <span class="word-value" style="color: var(--good-color)">${this.escapeHtml(this.currentWord)}</span>
            `;
            ui.reveal.roleDesc.textContent = 'Opisz hasło jednym słowem. Uważaj — Impostor słucha!';
        }

        ui.reveal.progress.style.width = `${((this.revealIndex + 1) / this.players.length) * 100}%`;
    },

    nextPlayer() {
        this.revealIndex++;
        if (this.revealIndex >= this.players.length) {
            // Wszyscy poznali role → przejdź do rozgrywki
            this.showScreen('game');
            this.renderGameScreen();
        } else {
            this.showRevealWaiting();
        }
    },

    /* === EKRAN ROZGRYWKI === */
    renderGameScreen() {
        // Ukryj sekcję ról i pokaż przycisk
        ui.game.rolesReveal.classList.add('hidden');
        ui.game.btnRevealRoles.classList.remove('hidden');
        ui.game.btnNewGame.classList.add('hidden');

        ui.game.players.innerHTML = this.players.map((name, i) => `
            <div class="game-player-card">
                <div class="game-player-avatar">${this.getInitials(name)}</div>
                <span class="game-player-name">${this.escapeHtml(name)}</span>
            </div>
        `).join('');
    },

    /* === POKAŻ ROLE (po dyskusji) === */
    revealRoles() {
        // Pokaż hasło i podpowiedź
        ui.game.resultWord.textContent = this.currentWord;
        ui.game.resultHint.textContent = this.currentHint;

        // Pokaż role wszystkich
        ui.game.resultRoles.innerHTML = this.players.map((name, i) => {
            const role = this.roles[i];
            return `
                <div class="result-role-row">
                    <span class="result-role-name">${this.escapeHtml(name)}</span>
                    <span class="result-role-badge ${role}">
                        ${role === 'impostor' ? '🔴 Impostor' : '🟢 Dobry'}
                    </span>
                </div>
            `;
        }).join('');

        // Ukryj przycisk "Pokaż role", pokaż sekcję ról i przycisk "Nowa gra"
        ui.game.btnRevealRoles.classList.add('hidden');
        ui.game.rolesReveal.classList.remove('hidden');
        ui.game.btnNewGame.classList.remove('hidden');
    },

    /* === RESET === */
    reset() {
        this.roles = [];
        this.currentWord = null;
        this.currentHint = null;
        this.revealIndex = 0;
        this.showScreen('setup');
    },

    /* === HELPERS === */
    showScreen(name) {
        Object.values(ui.screens).forEach(s => s.classList.remove('active'));
        ui.screens[name].classList.add('active');
    },

    shuffle(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    },

    getInitials(name) {
        return name.substring(0, 2).toUpperCase();
    },

    escapeHtml(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }
};

/* === EVENT LISTENERS === */
ui.setup.btnAdd.addEventListener('click', () => game.addPlayer());
ui.setup.input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') game.addPlayer();
});
ui.setup.btnStart.addEventListener('click', () => game.startGame());

ui.reveal.btnShow.addEventListener('click', () => game.showRole());
ui.reveal.btnNext.addEventListener('click', () => game.nextPlayer());

ui.game.btnRevealRoles.addEventListener('click', () => game.revealRoles());

