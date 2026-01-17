/* ========================================
   LEADERBOARD COMPONENT - KOMPONENT TABELI RANKINGOWEJ
   Uniwersalny komponent do wyświetlania  top wyników w grach
   ======================================== */

const LeaderboardComponent = {
    /**
     * Tworzy i renderuje tabelę rankingową dla danej gry
     * @param {string} scoreKey - Klucz wyniku (np. 'reaction_best', 'bestScore_europa')
     * @param {string} containerId - ID kontenera HTML gdzie ma być tabela
     * @param {Object} options - Opcje konfiguracyjne
     * @param {number} options.limit - Maksymalna liczba wyników do wyświetlenia (domyślnie 10)
     * @param {string} options.title - Tytuł tabeli (domyślnie 'TOP WYNIKI')
     * @param {boolean} options.highlightCurrent - Czy podświetlić aktualnego użytkownika (domyślnie true)
     */
    render(scoreKey, containerId, options = {}) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.error(`Container #${containerId} not found`);
            return;
        }

        const {
            limit = 10,
            title = 'TOP WYNIKI',
            highlightCurrent = true
        } = options;

        // Pobierz top wyniki
        const scores = UserManager.getTopScores(scoreKey, limit);
        const currentUser = UserManager.getCurrentUser();

        // Jeśli brak wyników
        if (scores.length === 0) {
            container.innerHTML = `
                <div class="leaderboard">
                    <h3 class="leaderboard-title">${title}</h3>
                    <p class="leaderboard-empty">Brak wyników. Bądź pierwszy!</p>
                </div>
            `;
            return;
        }

        // Generuj HTML tabeli
        let html = `
            <div class="leaderboard">
                <h3 class="leaderboard-title">${title}</h3>
                <div class="leaderboard-table">
                    <div class="leaderboard-header">
                        <span class="lbd-pos">#</span>
                        <span class="lbd-name">NICK</span>
                        <span class="lbd-date">DATA</span>
                        <span class="lbd-score">WYNIK</span>
                    </div>
                    <div class="leaderboard-body">
        `;

        scores.forEach((entry, index) => {
            const position = index + 1;
            const isCurrent = highlightCurrent && entry.username === currentUser;
            const positionIcon = this.getPositionIcon(position);
            const formattedDate = UserManager.formatDate(entry.date);

            html += `
                <div class="leaderboard-row ${isCurrent ? 'current-user' : ''}">
                    <span class="lbd-pos">${positionIcon || position}</span>
                    <span class="lbd-name">${this.escapeHtml(entry.username)}</span>
                    <span class="lbd-date">${formattedDate}</span>
                    <span class="lbd-score">${entry.score}</span>
                </div>
            `;
        });

        html += `
                    </div>
                </div>
            </div>
        `;

        container.innerHTML = html;
    },

    /**
     * Zwraca ikonę dla top 3 pozycji
     * @param {number} position - Pozycja w rankingu
     * @returns {string|null}
     */
    getPositionIcon(position) {
        const icons = {
            1: '🥇',
            2: '🥈',
            3: '🥉'
        };
        return icons[position] || null;
    },

    /**
     * Zabezpieczenie przed XSS
     * @param {string} text
     * @returns {string}
     */
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
};

// Dodaj CSS dla komponentu jako <style> tag
if (typeof document !== 'undefined') {
    const style = document.createElement('style');
    style.textContent = `
        /* ===== LEADERBOARD COMPONENT STYLES ===== */
        .leaderboard {
            margin-top: 20px;
            background: rgba(30, 41, 59, 0.4);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 16px;
            padding: 20px;
            backdrop-filter: blur(10px);
        }

        .leaderboard-title {
            font-size: 1.2rem;
            font-weight: 800;
            text-align: center;
            margin-bottom: 15px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            letter-spacing: 1px;
        }

        .leaderboard-empty {
            text-align: center;
            color: rgba(255, 255, 255, 0.5);
            padding: 30px 20px;
            font-size: 0.95rem;
        }

        .leaderboard-table {
            width: 100%;
        }

        .leaderboard-header {
            display: grid;
            grid-template-columns: 60px 1fr 120px 100px;
            gap: 10px;
            padding: 12px 15px;
            background: rgba(255, 255, 255, 0.03);
            border-radius: 10px;
            margin-bottom: 8px;
            font-size: 0.75rem;
            font-weight: 700;
            color: rgba(255, 255, 255, 0.6);
            letter-spacing: 0.5px;
        }

        .leaderboard-row {
            display: grid;
            grid-template-columns: 60px 1fr 120px 100px;
            gap: 10px;
            padding: 12px 15px;
            background: rgba(255, 255, 255, 0.02);
            border-radius: 8px;
            margin-bottom: 5px;
            transition: all 0.3s ease;
            font-size: 0.9rem;
            align-items: center;
        }

        .leaderboard-row:hover {
            background: rgba(255, 255, 255, 0.05);
            transform: translateX(3px);
        }

        .leaderboard-row.current-user {
            background: linear-gradient(90deg, rgba(102, 126, 234, 0.2), rgba(118, 75, 162, 0.1));
            border: 1px solid rgba(102, 126, 234, 0.3);
        }

        .lbd-pos {
            text-align: center;
            font-weight: 800;
            font-size: 1.1rem;
        }

        .lbd-name {
            font-weight: 600;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .lbd-date {
            font-size: 0.8rem;
            color: rgba(255, 255, 255, 0.6);
            text-align: center;
        }

        .lbd-score {
            text-align: right;
            font-weight: 700;
            font-size: 1.1rem;
            color: #fbbf24;
        }

        /* Responsywność - mobile */
        @media (max-width: 768px) {
            .leaderboard-header {
                grid-template-columns: 50px 1fr 80px 80px;
                font-size: 0.7rem;
                padding: 10px 12px;
            }

            .leaderboard-row {
                grid-template-columns: 50px 1fr 80px 80px;
                padding: 10px 12px;
                font-size: 0.85rem;
            }

            .lbd-date {
                font-size: 0.7rem;
            }

            .lbd-score {
                font-size: 1rem;
            }
        }

        @media (max-width: 480px) {
            .leaderboard-header,
            .leaderboard-row {
                grid-template-columns: 40px 1fr 70px;
                gap: 8px;
            }

            /* Ukryj datę na bardzo małych ekranach */
            .lbd-date {
                display: none;
            }

            .leaderboard-title {
                font-size: 1rem;
            }
        }
    `;
    document.head.appendChild(style);
}
