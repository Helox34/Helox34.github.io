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
     * @param {boolean} options.lowerIsBetter - Czy mniejszy wynik = lepiej (domyślnie false)
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
            highlightCurrent = true,
            lowerIsBetter = false
        } = options;

        // Pobierz top wyniki
        const scores = UserManager.getTopScores(scoreKey, limit, lowerIsBetter);
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
            margin-top: 25px;
            background: linear-gradient(135deg, rgba(30, 41, 59, 0.6), rgba(15, 23, 42, 0.8));
            border: 2px solid rgba(255, 255, 255, 0.15);
            border-radius: 20px;
            padding: 25px;
            backdrop-filter: blur(15px);
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
            position: relative;
            overflow: hidden;
        }

        .leaderboard::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, rgba(102, 126, 234, 0.1) 0%, transparent 50%);
            animation: rotateGlow 15s linear infinite;
            pointer-events: none;
        }

        @keyframes rotateGlow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }

        .leaderboard-title {
            font-size: 1.3rem;
            font-weight: 900;
            text-align: center;
            margin-bottom: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            letter-spacing: 1.5px;
            text-transform: uppercase;
            position: relative;
            z-index: 1;
            text-shadow: 0 0 30px rgba(102, 126, 234, 0.3);
        }

        .leaderboard-empty {
            text-align: center;
            color: rgba(255, 255, 255, 0.5);
            padding: 40px 20px;
            font-size: 1rem;
            font-style: italic;
        }

        .leaderboard-table {
            width: 100%;
            position: relative;
            z-index: 1;
        }

        .leaderboard-header {
            display: grid;
            grid-template-columns: 65px 1fr 130px 110px;
            gap: 12px;
            padding: 14px 18px;
            background: linear-gradient(135deg, rgba(102, 126, 234, 0.15), rgba(118, 75, 162, 0.15));
            border-radius: 12px;
            margin-bottom: 10px;
            font-size: 0.75rem;
            font-weight: 800;
            color: rgba(255, 255, 255, 0.7);
            letter-spacing: 1px;
            text-transform: uppercase;
            border: 1px solid rgba(102, 126, 234, 0.2);
        }

        .leaderboard-row {
            display: grid;
            grid-template-columns: 65px 1fr 130px 110px;
            gap: 12px;
            padding: 14px 18px;
            background: linear-gradient(90deg, rgba(30, 41, 59, 0.6), rgba(15, 23, 42, 0.4));
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 12px;
            margin-bottom: 8px;
            transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
            font-size: 0.95rem;
            align-items: center;
            cursor: pointer;
        }

        .leaderboard-row:hover {
            background: linear-gradient(90deg, rgba(102, 126, 234, 0.15), rgba(118, 75, 162, 0.1));
            border-color: rgba(102, 126, 234, 0.3);
            transform: translateX(5px) scale(1.02);
            box-shadow: 0 5px 20px rgba(102, 126, 234, 0.2);
        }

        .leaderboard-row.current-user {
            background: linear-gradient(90deg, rgba(102, 126, 234, 0.3), rgba(118, 75, 162, 0.2));
            border: 2px solid rgba(102, 126, 234, 0.5);
            animation: pulseGlow 2s ease-in-out infinite;
        }

        @keyframes pulseGlow {
            0%, 100% {
                box-shadow: 0 0 20px rgba(102, 126, 234, 0.4);
            }
            50% {
                box-shadow: 0 0 30px rgba(102, 126, 234, 0.6);
            }
        }

        .lbd-pos {
            text-align: center;
            font-weight: 900;
            font-size: 1.3rem;
            background: linear-gradient(135deg, #fbbf24, #f59e0b);
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        .lbd-name {
            font-weight: 700;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            color: rgba(255, 255, 255, 0.95);
        }

        .current-user .lbd-name {
            font-weight: 900;
            color: #ffffff;
        }

        .lbd-date {
            font-size: 0.82rem;
            color: rgba(255, 255, 255, 0.5);
            text-align: center;
            font-weight: 500;
        }

        .lbd-score {
            text-align: right;
            font-weight: 800;
            font-size: 1.2rem;
            background: linear-gradient(135deg, #fbbf24, #f59e0b);
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            text-shadow: 0 0 10px rgba(251, 191, 36, 0.3);
        }

        /* ===== RESPONSYWNOŚĆ MOBILE ===== */
        @media (max-width: 768px) {
            .leaderboard {
                padding: 20px 15px;
                margin-top: 20px;
            }

            .leaderboard-title {
                font-size: 1.1rem;
                margin-bottom: 15px;
            }

            .leaderboard-header {
                grid-template-columns: 55px 1fr 90px 85px;
                font-size: 0.65rem;
                padding: 12px 14px;
                gap: 8px;
            }

            .leaderboard-row {
                grid-template-columns: 55px 1fr 90px 85px;
                padding: 12px 14px;
                font-size: 0.88rem;
                gap: 8px;
            }

            .lbd-pos {
                font-size: 1.15rem;
            }

            .lbd-date {
                font-size: 0.7rem;
            }

            .lbd-score {
                font-size: 1.05rem;
            }
        }

        /* Bardzo małe ekrany - ukryj datę */
        @media (max-width: 480px) {
            .leaderboard {
                padding: 18px 12px;
            }

            .leaderboard-title {
                font-size: 1rem;
                letter-spacing: 1px;
            }

            .leaderboard-header,
            .leaderboard-row {
                grid-template-columns: 50px 1fr 80px;
                gap: 6px;
                padding: 10px 12px;
            }

            .lbd-date {
                display: none;
            }

            .lbd-pos {
                font-size: 1rem;
            }

            .lbd-name {
                font-size: 0.85rem;
            }

            .lbd-score {
                font-size: 0.95rem;
            }

            .leaderboard-row:hover {
                transform: translateX(3px) scale(1.01);
            }
        }

        /* Extra małe ekrany */
        @media (max-width: 360px) {
            .leaderboard-header,
            .leaderboard-row {
                padding: 8px 10px;
                font-size: 0.8rem;
            }

            .lbd-pos {
                font-size: 0.9rem;
            }

            .lbd-score {
                font-size: 0.9rem;
            }
        }
    `;
    document.head.appendChild(style);
}
