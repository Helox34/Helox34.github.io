/* ========================================
   FIREBASE LEADERBOARD MANAGER
   Globalny system rankingowy oparty na Firebase Realtime Database
   ======================================== */

const FirebaseLeaderboard = {

    /**
     * Zapisuje wynik gracza do Firebase.
     * Zapisuje TYLKO jeśli nowy wynik jest lepszy od obecnego.
     * 
     * @param {string} game - Nazwa gry (np. 'flagle')
     * @param {string} mode - Tryb gry (np. 'europa', 'easy')
     * @param {string} username - Nick gracza
     * @param {number} score - Wynik do zapisania
     * @param {boolean} lowerIsBetter - Czy mniejszy wynik = lepiej (domyślnie false)
     * @returns {Promise<boolean>} - true jeśli zapisano nowy rekord
     */
    async saveScore(game, mode, username, score, lowerIsBetter = false) {
        if (!window.db) {
            console.warn('Firebase not initialized, skipping score save');
            return false;
        }

        if (!username || !game || !mode || typeof score !== 'number') {
            console.warn('Invalid data for score save:', { game, mode, username, score });
            return false;
        }

        // Sanitize username for Firebase path (no . # $ [ ] /)
        const safeUsername = this._sanitizeKey(username);

        try {
            const ref = window.db.ref(`leaderboards/${game}/${mode}/${safeUsername}`);
            const snapshot = await ref.once('value');
            const existing = snapshot.val();

            let shouldSave = false;

            if (!existing) {
                // Pierwszy wynik — zawsze zapisz
                shouldSave = true;
            } else if (lowerIsBetter) {
                shouldSave = score < existing.score;
            } else {
                shouldSave = score > existing.score;
            }

            if (shouldSave) {
                await ref.set({
                    username: username,
                    score: score,
                    date: new Date().toISOString()
                });
                console.log(`🏆 New record saved: ${username} = ${score} in ${game}/${mode}`);
                return true;
            }

            return false;
        } catch (error) {
            console.error('Error saving score to Firebase:', error);
            return false;
        }
    },

    /**
     * Pobiera top N wyników z Firebase (jednorazowo).
     * 
     * @param {string} game - Nazwa gry
     * @param {string} mode - Tryb gry
     * @param {number} limit - Maksymalna liczba wyników (domyślnie 10)
     * @param {boolean} lowerIsBetter - Czy mniejszy wynik = lepiej
     * @returns {Promise<Array<{username, score, date}>>}
     */
    async getTopScores(game, mode, limit = 10, lowerIsBetter = false) {
        if (!window.db) {
            console.warn('Firebase not initialized');
            return [];
        }

        try {
            const ref = window.db.ref(`leaderboards/${game}/${mode}`);
            const snapshot = await ref.once('value');
            const data = snapshot.val();

            if (!data) return [];

            const scores = Object.values(data)
                .filter(entry => entry && typeof entry.score === 'number')
                .map(entry => ({
                    username: entry.username || 'Anonymous',
                    score: entry.score,
                    date: entry.date || ''
                }));

            // Sortuj (przy remisie: kto pierwszy osiągnął wynik = wyżej)
            if (lowerIsBetter) {
                scores.sort((a, b) => a.score - b.score || new Date(a.date) - new Date(b.date));
            } else {
                scores.sort((a, b) => b.score - a.score || new Date(a.date) - new Date(b.date));
            }

            return scores.slice(0, limit);
        } catch (error) {
            console.error('Error fetching scores from Firebase:', error);
            return [];
        }
    },

    /**
     * Nasłuchuje na zmiany w rankingu w czasie rzeczywistym.
     * 
     * @param {string} game - Nazwa gry
     * @param {string} mode - Tryb gry
     * @param {Function} callback - Funkcja wywoływana przy każdej zmianie, 
     *                              otrzymuje posortowaną tablicę wyników
     * @param {number} limit - Maksymalna liczba wyników
     * @param {boolean} lowerIsBetter - Czy mniejszy wynik = lepiej
     * @returns {Function} - Funkcja do anulowania nasłuchiwania
     */
    listenToScores(game, mode, callback, limit = 10, lowerIsBetter = false) {
        if (!window.db) {
            console.warn('Firebase not initialized');
            return () => { };
        }

        const ref = window.db.ref(`leaderboards/${game}/${mode}`);

        const handler = (snapshot) => {
            const data = snapshot.val();
            if (!data) {
                callback([]);
                return;
            }

            const scores = Object.values(data)
                .filter(entry => entry && typeof entry.score === 'number')
                .map(entry => ({
                    username: entry.username || 'Anonymous',
                    score: entry.score,
                    date: entry.date || ''
                }));

            // Sortuj (przy remisie: kto pierwszy osiągnął wynik = wyżej)
            if (lowerIsBetter) {
                scores.sort((a, b) => a.score - b.score || new Date(a.date) - new Date(b.date));
            } else {
                scores.sort((a, b) => b.score - a.score || new Date(a.date) - new Date(b.date));
            }

            callback(scores.slice(0, limit));
        };

        ref.on('value', handler);

        // Zwróć funkcję do odłączenia listenera
        return () => ref.off('value', handler);
    },

    /**
     * Zapisuje info o graczu (że dołączył do gry).
     * 
     * @param {string} game - Nazwa gry
     * @param {string} username - Nick gracza
     */
    async registerPlayer(game, username) {
        if (!window.db || !username) return;

        const safeUsername = this._sanitizeKey(username);

        try {
            const ref = window.db.ref(`players/${game}/${safeUsername}`);
            const snapshot = await ref.once('value');

            if (!snapshot.exists()) {
                await ref.set({
                    username: username,
                    joinedAt: new Date().toISOString(),
                    lastSeen: new Date().toISOString()
                });
            } else {
                await ref.update({
                    lastSeen: new Date().toISOString()
                });
            }
        } catch (error) {
            console.error('Error registering player:', error);
        }
    },

    /**
     * Sanitize key for Firebase path — zamienia niedozwolone znaki.
     * Firebase nie pozwala na: . # $ [ ] /
     * @param {string} key
     * @returns {string}
     */
    _sanitizeKey(key) {
        return key
            .replace(/\./g, '_dot_')
            .replace(/#/g, '_hash_')
            .replace(/\$/g, '_dollar_')
            .replace(/\[/g, '_lb_')
            .replace(/\]/g, '_rb_')
            .replace(/\//g, '_slash_');
    }
};
