/* ========================================
   GAME HUB - SYSTEM ZARZĄDZANIA UŻYTKOWNIKAMI
   ======================================== */

const UserManager = {
    STORAGE_KEY: 'gameHub_users',
    CURRENT_USER_KEY: 'gameHub_currentUser',

    /**
     * Inicjalizacja systemu - sprawdza czy użytkownik jest zalogowany
     * Jeśli nie, pokazuje modal z prośbą o nazwę
     */
    init() {
        const currentUser = this.getCurrentUser();
        if (!currentUser) {
            this.showUsernameModal();
        }
        return currentUser;
    },

    /**
     * Pokazuje modal z prośbą o wprowadzenie nazwy użytkownika
     */
    showUsernameModal() {
        const modal = document.getElementById('username-modal');
        const input = document.getElementById('username-input');
        const submitBtn = document.getElementById('username-submit');
        const errorMsg = document.getElementById('username-error');

        if (!modal) {
            console.error('Username modal not found!');
            return;
        }

        modal.classList.remove('hidden');
        input.focus();

        // Dodaj kontener na info o istniejącym koncie (jeśli jeszcze nie istnieje)
        let existsInfo = document.getElementById('username-exists-info');
        if (!existsInfo) {
            existsInfo = document.createElement('div');
            existsInfo.id = 'username-exists-info';
            existsInfo.style.cssText = `
                display: none;
                margin-top: 12px;
                padding: 14px 16px;
                background: linear-gradient(135deg, rgba(251, 191, 36, 0.15), rgba(245, 158, 11, 0.1));
                border: 1px solid rgba(251, 191, 36, 0.4);
                border-radius: 10px;
                font-size: 0.9rem;
                color: rgba(255, 255, 255, 0.9);
                text-align: center;
                animation: fadeIn 0.3s ease;
            `;
            // Wstaw po input-group, przed submit button
            submitBtn.parentNode.insertBefore(existsInfo, submitBtn);
        }

        // Dodaj przycisk "Kontynuuj" (jeśli jeszcze nie istnieje)
        let continueBtn = document.getElementById('username-continue');
        if (!continueBtn) {
            continueBtn = document.createElement('button');
            continueBtn.id = 'username-continue';
            continueBtn.style.cssText = `
                display: none;
                width: 100%;
                padding: 15px;
                font-size: 1.05rem;
                font-weight: 700;
                font-family: 'Montserrat', sans-serif;
                background: linear-gradient(135deg, #10b981 0%, #059669 100%);
                color: white;
                border: none;
                border-radius: 12px;
                cursor: pointer;
                transition: all 0.3s ease;
                margin-top: 8px;
            `;
            // Wstaw po exists info, przed submit button
            submitBtn.parentNode.insertBefore(continueBtn, submitBtn);
        }

        const resetExistsState = () => {
            existsInfo.style.display = 'none';
            continueBtn.style.display = 'none';
            submitBtn.style.display = 'block';
            submitBtn.textContent = 'ZACZNIJ GRĘ';
        };

        // Reset stanu
        resetExistsState();

        const handleSubmit = async () => {
            const username = input.value.trim();
            const validation = this.validateUsername(username);

            if (!validation.valid) {
                errorMsg.textContent = validation.error;
                errorMsg.classList.remove('hidden');
                input.classList.add('error');
                resetExistsState();
                return;
            }

            // Sprawdź czy nick istnieje w Firebase
            if (typeof FirebaseLeaderboard !== 'undefined' && window.db) {
                try {
                    const safeUsername = FirebaseLeaderboard._sanitizeKey(username);
                    // Szukamy w players (wszystkie gry)
                    const playersRef = window.db.ref('players');
                    const snapshot = await playersRef.once('value');
                    const allPlayers = snapshot.val();

                    let userExists = false;
                    if (allPlayers) {
                        for (const game in allPlayers) {
                            if (allPlayers[game][safeUsername]) {
                                userExists = true;
                                break;
                            }
                        }
                    }

                    if (userExists) {
                        // Nick już istnieje — pokaż opcje
                        errorMsg.classList.add('hidden');
                        input.classList.remove('error');

                        existsInfo.innerHTML = `
                            ⚠️ Konto <strong style="color: #fbbf24;">${username}</strong> już istnieje!
                        `;
                        existsInfo.style.display = 'block';

                        continueBtn.textContent = `KONTYNUUJ JAKO ${username.toUpperCase()}`;
                        continueBtn.style.display = 'block';

                        submitBtn.textContent = 'WPISZ INNY NICK';
                        submitBtn.style.display = 'block';

                        // Przycisk "Kontynuuj jako..."
                        continueBtn.onclick = () => {
                            this.setCurrentUser(username);
                            this.createUserIfNotExists(username);
                            modal.classList.add('hidden');
                            resetExistsState();
                        };

                        // Przycisk "Wpisz inny nick"
                        submitBtn.onclick = () => {
                            input.value = '';
                            input.focus();
                            resetExistsState();
                            submitBtn.onclick = handleSubmit;
                        };

                        return;
                    }
                } catch (err) {
                    console.warn('Firebase check failed, proceeding normally:', err);
                }
            }

            // Nick nie istnieje lub Firebase niedostępne — normalne logowanie
            this.setCurrentUser(username);
            this.createUserIfNotExists(username);
            modal.classList.add('hidden');
            errorMsg.classList.add('hidden');
            input.classList.remove('error');
            resetExistsState();
        };

        submitBtn.onclick = handleSubmit;
        input.onkeypress = (e) => {
            if (e.key === 'Enter') handleSubmit();
        };

        // Reset exists info gdy user zaczyna pisać nowy nick
        input.addEventListener('input', () => {
            if (existsInfo.style.display !== 'none') {
                resetExistsState();
                submitBtn.onclick = handleSubmit;
            }
        });
    },

    /**
     * Walidacja nazwy użytkownika
     * @param {string} username - Nazwa do zawalidowania
     * @returns {{valid: boolean, error?: string}}
     */
    validateUsername(username) {
        if (!username || username.length < 3) {
            return { valid: false, error: 'Nazwa musi mieć minimum 3 znaki' };
        }
        if (username.length > 20) {
            return { valid: false, error: 'Nazwa może mieć maksymalnie 20 znaków' };
        }
        if (!/^[a-zA-Z0-9ąćęłńóśźżĄĆĘŁŃÓŚŹŻ ]+$/.test(username)) {
            return { valid: false, error: 'Nazwa może zawierać tylko litery, cyfry i spacje' };
        }
        return { valid: true };
    },

    /**
     * Pobiera aktualnie zalogowanego użytkownika
     * @returns {string|null}
     */
    getCurrentUser() {
        return localStorage.getItem(this.CURRENT_USER_KEY);
    },

    /**
     * Ustawia aktualnego użytkownika
     * @param {string} username
     */
    setCurrentUser(username) {
        localStorage.setItem(this.CURRENT_USER_KEY, username);
    },

    /**
     * Tworzy użytkownika jeśli jeszcze nie istnieje
     * @param {string} username
     */
    createUserIfNotExists(username) {
        const users = this.getAllUsers();
        if (!users[username]) {
            users[username] = {
                scores: {},
                createdAt: new Date().toISOString()
            };
            this.saveAllUsers(users);
        }
    },

    /**
     * Pobiera wszystkich użytkowników z localStorage
     * @returns {Object}
     */
    getAllUsers() {
        const data = localStorage.getItem(this.STORAGE_KEY);
        return data ? JSON.parse(data) : {};
    },

    /**
     * Zapisuje wszystkich użytkowników do localStorage
     * @param {Object} users
     */
    saveAllUsers(users) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(users));
    },

    /**
     * Zapisuje wynik użytkownika dla danej gry
     * @param {string} scoreKey - Klucz wyniku (np. 'reaction_best', 'bestScore_europa')
     * @param {number} score - Wynik do zapisania
     * @param {boolean} lowerIsBetter - Czy mniejsza wartość = lepszy wynik (domyślnie false)
     */
    saveUserScore(scoreKey, score, lowerIsBetter = false) {
        const username = this.getCurrentUser();
        if (!username) {
            console.warn('No user logged in, cannot save score');
            return;
        }

        const users = this.getAllUsers();
        if (!users[username]) {
            this.createUserIfNotExists(username);
        }

        // Zapisz wynik z datą
        if (!users[username].scores) {
            users[username].scores = {};
        }

        const currentScore = users[username].scores[scoreKey];

        // Zapisz tylko jeśli to nowy rekord lub pierwsza próba
        let isNewRecord = false;

        if (!currentScore) {
            // Pierwsza próba - zawsze zapisz
            isNewRecord = true;
        } else {
            // Sprawdź czy to lepszy wynik
            if (lowerIsBetter) {
                // Dla Reaction Time: mniejsza wartość = lepiej
                isNewRecord = score < currentScore.score;
            } else {
                // Dla innych gier: większa wartość = lepiej
                isNewRecord = score > currentScore.score;
            }
        }

        if (isNewRecord) {
            users[username].scores[scoreKey] = {
                score: score,
                date: new Date().toISOString()
            };
            this.saveAllUsers(users);
            return true; // Zwróć true jeśli zapisano nowy rekord
        }

        return false; // Zwróć false jeśli nie zapisano
    },

    /**
     * Pobiera top wyniki dla danej gry
     * @param {string} scoreKey - Klucz wyniku
     * @param {number} limit - Maksymalna liczba wyników (domyślnie 10)
     * @param {boolean} lowerIsBetter - Czy mniejszy wynik = lepiej (domyślnie false)
     * @returns {Array<{username: string, score: number, date: string}>}
     */
    getTopScores(scoreKey, limit = 10, lowerIsBetter = false) {
        const users = this.getAllUsers();
        const scores = [];

        for (const username in users) {
            const userScore = users[username].scores?.[scoreKey];
            if (userScore && userScore.score) {
                scores.push({
                    username: username,
                    score: userScore.score,
                    date: userScore.date
                });
            }
        }

        // Sortuj według wyniku - rosnąco lub malejąco
        if (lowerIsBetter) {
            // Dla Reaction Time: mniejszy czas = lepiej
            scores.sort((a, b) => a.score - b.score);
        } else {
            // Dla innych gier: większy wynik = lepiej
            scores.sort((a, b) => b.score - a.score);
        }

        return scores.slice(0, limit);
    },

    /**
     * Formatuje datę do czytelnej postaci
     * @param {string} isoDate - Data w formacie ISO
     * @returns {string}
     */
    formatDate(isoDate) {
        const date = new Date(isoDate);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 1) return 'przed chwilą';
        if (diffMins < 60) return `${diffMins} min temu`;
        if (diffHours < 24) return `${diffHours}h temu`;
        if (diffDays < 7) return `${diffDays} dni temu`;

        return date.toLocaleDateString('pl-PL', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    }
};

// Auto-inicjalizacja gdy DOM jest gotowy
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => UserManager.init());
} else {
    UserManager.init();
}
